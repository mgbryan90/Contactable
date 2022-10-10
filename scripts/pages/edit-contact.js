import { input, select } from "../components/inputs.js";
import DOMHandler from "../dom-handler.js";
import { editContact } from "../services/contacs-services.js";
import { STORE } from "../store.js";
import { logoutListener } from "./contacs.js";
import LoginPage from "./login-page.js";
import ShowContactDetail from "./show-contact.js";

function render() {
  return `
  <div class="header">
    <h2 class="title">Edit Contact</h2>
    <a href="#" class="js-logout">Logout</a>
  </div>
  <form class="container-new-contact__form js-edit-contact">
    <div class="container-new-contact">
      ${input({
        id: "name",
        name: "name",
        placeholder: "Name",
        type: "text",
        required: true,
        value: `${STORE.showContact.name}`,
      })}
      ${input({
        id: "number",
        name: "number",
        placeholder: "Number",
        type: "number",
        required: true,
        value: `${STORE.showContact.number}`,
      })}
      ${
        EditContact.numberErrorEdit
          ? `<p class="text-error content-xs">${EditContact.numberErrorEdit}<p>`
          : ""
      }
      ${input({
        id: "email",
        name: "email",
        placeholder: "email",
        type: "email",
        required: true,
        value: `${STORE.showContact.email}`,
      })}
      ${select(STORE.showContact.relation)}
    </div>
    <div class="footer">
      <a href="#" class="cancel">Cancel</a>
      <button class="save-button">Save</button>
    </div>
  </form>
  `;
}

function cancelEditContactListener() {
  const cancel = document.querySelector(".cancel");
  cancel.addEventListener("click", (event) => {
    event.preventDefault();
    EditContact.numberErrorEdit = false;
    DOMHandler.load(ShowContactDetail);
  });
}

function saveEditContactListener() {
  const form = document.querySelector(".js-edit-contact");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { name, number, email, relation } = event.target;
      const saveEditContact = {
        name: name.value,
        number: number.value,
        email: email.value,
        relation: relation.value,
      };
      if (number.value.length > 9)
        throw new Error("Phone should have 9 digits");
      const contactEdited = await editContact(
        STORE.showContact.id,
        saveEditContact
      );
      STORE.updateContact(contactEdited);
      DOMHandler.load(ShowContactDetail);
    } catch (error) {
      if (error.message === "Access denied") {
        STORE.accessDenied = error.message;
        return DOMHandler.load(LoginPage);
      }
      console.log(error.message);
      EditContact.numberErrorEdit = error.message;
      DOMHandler.reload();
    }
  });
}

const EditContact = {
  toString() {
    return render();
  },
  addListeners() {
    logoutListener();
    cancelEditContactListener();
    saveEditContactListener();
  },
  numberErrorEdit: false,
};

export default EditContact;
