import { input } from "../components/inputs.js";
import DOMHandler from "../dom-handler.js";
import { getContacs } from "../services/contacs-services.js";
import { login } from "../services/sessions-service.js";
import { createUser } from "../services/user-service.js";
import { STORE } from "../store.js";
import Contacs from "./contacs.js";
import LoginPage from "./login-page.js";
function render() {
  return `
  <div>
    <div class="header">
      <h2 class="title">Sign up</h2>
    </div>
    <form class="container-form js-login-form">
      ${input({
        id: "email",
        name: "email",
        placeholder: "email",
        type: "email",
        required: true,
      })}
      ${input({
        id: "password",
        name: "password",
        placeholder: "password",
        type: "password",
        required: true,
      })}
      ${
        SignUpPage.statusSignUp
          ? `<p class="text-error content-xs">${SignUpPage.statusSignUp}<p>`
          : ""
      }
      <button class="button-27" role="button">Sign Up</button>
    </form>
  </div>
  <div class="footer js-footer-login">
    <a href="#" data-option="Signup">Signup</a>
    <a href="#" data-option="Login">Login</a>
  </div>`;
}

function createUserListener() {
  const form = document.querySelector(".js-login-form");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { email, password } = event.target;
      const credentials = {
        email: email.value,
        password: password.value,
      };
      await createUser(credentials);
      STORE.contacts = await getContacs();
      STORE.setFavoriteContacts();
      DOMHandler.load(Contacs);
    } catch (error) {
      SignUpPage.statusSignUp = error.message;
      DOMHandler.reload();
    }
  });
}

function footerLogin() {
  const footer = document.querySelector(".js-footer-login");
  footer.addEventListener("click", (event) => {
    event.preventDefault();
    const optionSelected = event.target.closest("[data-option]");
    if (!optionSelected) return;
    switch (optionSelected.dataset.option) {
      case "Login":
        DOMHandler.load(LoginPage);
      default:
        SignUpPage.statusSignUp = false;
        DOMHandler.reload();
    }
  });
}

const SignUpPage = {
  toString() {
    return render();
  },
  addListeners() {
    footerLogin();
    createUserListener();
  },
  statusSignUp: false,
};

export default SignUpPage;
