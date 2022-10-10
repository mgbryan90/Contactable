import { input } from "../components/inputs.js";
import DOMHandler from "../dom-handler.js";
import { getContacs } from "../services/contacs-services.js";
import { login, logout } from "../services/sessions-service.js";
import { STORE } from "../store.js";
import Contacs from "./contacs.js";
import SignUpPage from "./signup-page.js";

function render() {
  return `
  <div>
    <div class="header">
      <h1 class="title">Login</h1>
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
        LoginPage.statusLogin
          ? `<p class="text-error content-xs">${LoginPage.statusLogin}</p>`
          : ""
      }
      ${
        STORE.accessDenied
          ? `<p class="text-error content-xs">${STORE.accessDenied}</p>`
          : ""
      }
      <button class="button-27" role="button">Sign in</button>
    </form>
  </div>
  <div class="footer js-footer-login">
    <a href="#" data-option="Signup">Signup</a>
    <a href="#" data-option="Login">Login</a>
  </div>
  `;
}

function listenSubmitForm() {
  const form = document.querySelector(".js-login-form");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { email, password } = event.target;
      const credentials = {
        email: email.value,
        password: password.value,
      };
      await login(credentials);
      STORE.contacts = await getContacs();
      STORE.setFavoriteContacts();
      DOMHandler.load(Contacs);
    } catch (error) {
      console.log(error.message);
      LoginPage.statusLogin = error.message;
      DOMHandler.reload();
    }
  });
}

function footerLogin() {
  const footer = document.querySelector(".js-footer-login");
  footer.addEventListener("click", (event) => {
    event.preventDefault();
    STORE.accessDenied = false;
    const optionSelected = event.target.closest("[data-option]");
    if (!optionSelected) return;
    switch (optionSelected.dataset.option) {
      case "Signup":
        DOMHandler.load(SignUpPage);
      default:
        LoginPage.statusLogin = false;
        DOMHandler.reload();
    }
  });
}

const LoginPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenSubmitForm();
    footerLogin();
  },
  statusLogin: false,
};

export default LoginPage;
