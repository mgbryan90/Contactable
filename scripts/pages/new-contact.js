import { input, select } from "../components/inputs.js";
import DOMHandler from "../dom-handler.js";
import { createNewContact, getContacs } from "../services/contacs-services.js";
import { STORE } from "../store.js";
import Contacts, { logoutListener } from "./contacs.js";
import LoginPage from "./login-page.js";

function render() {
  return `
    <div>
      
      <div class="header">
        <h2 class="title">Create new contact</h2>
        <a href="#" class="js-logout">Logout</a>
      </div>
      <form class="container-new-contact__form js-new-contact">
        <div class="container-new-contact">
          ${input({
            id: "name",
            name: "name",
            placeholder: "Name",
            type: "text",
            required: true,
          })}
          ${input({
            id: "number",
            name: "number",
            placeholder: "Number",
            type: "number",
            required: true,
          })}
          ${
            NewContact.numberError
              ? `<p class="text-error content-xs">${NewContact.numberError}<p>`
              : ""
          }
          ${input({
            id: "email",
            name: "email",
            placeholder: "Email",
            type: "email",
            required: true,
          })}
          ${select()}
        </div>
        <div class="footer">
          <a href="#" class="cancel">Cancel</a>
          <button class="save-button">Save</button>
        </div>
      </form>
    </div>
    
    `;
}

function saveContactListener() {
  const form = document.querySelector(".js-new-contact");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { name, number, email, relation } = event.target;
      const saveNewContact = {
        name: name.value,
        number: number.value,
        email: email.value,
        relation: relation.value,
      };
      if (number.value.length > 9)
        throw new Error("Phone should have 9 digits");
      await createNewContact(saveNewContact);
      NewContact.numberError = false;
      STORE.contacts = await getContacs();
      STORE.setFavoriteContacts();
      DOMHandler.load(Contacts);
    } catch (error) {
      if (error.message === "Access denied") {
        STORE.accessDenied = error.message;
        return DOMHandler.load(LoginPage);
      }
      console.log(error.message);
      NewContact.numberError = error.message;
      DOMHandler.reload();
    }
  });
}

export function cancelNewContactListener() {
  NewContact.numberError = false;
  const cancel = document.querySelector(".cancel");
  cancel.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(Contacts);
  });
}

const NewContact = {
  toString() {
    return render();
  },
  addListeners() {
    saveContactListener();
    cancelNewContactListener();
    logoutListener();
  },
  numberError: false,
};

export default NewContact;
