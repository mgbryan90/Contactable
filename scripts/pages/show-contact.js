import DOMHandler from "../dom-handler.js";
import { deleteContact } from "../services/contacs-services.js";
import { STORE } from "../store.js";
import Contacts, { logoutListener } from "./contacs.js";
import EditContact from "./edit-contact.js";
import LoginPage from "./login-page.js";
import { cancelNewContactListener } from "./new-contact.js";

function render() {
  const contactDetail = STORE.showContact;
  return `
  <div>
    <div class="header">
      <h2 class="title">Contact Detail</h2>
      <a href="#" class="js-logout">Logout</a>
    </div>
    <div>
      <div class="detail__avatar__name--container">
        <img class="detail__avatar" src="../../assets/images/avatar.svg">
        <h3 class="detail__name">${contactDetail.name}</h3>
        <p class="detail__relation">${contactDetail.relation}</p>
      </div>
      <div class="detail__num__email--container">
        <div class="detail__number--container">
          <p class="detail__label">Number: </p>
          <p class="detail__number">${contactDetail.number}</p>
        </div>
        <div class="detail__email--container">
          <p class="detail__label">Email: </p>
          <p class="detail__email">${contactDetail.email}</p>
        </div>        
      </div>
    </div>
  </div>
  <div class="footer">
    <a href="#" class="cancel">Back</a>
    <a href="#" class="delete" data-delete-contact-id="${contactDetail.id}">Delete</a>
    <a href="#" class="edit">Edit</a>
  </div>
  `;
}

function deleteContactListener() {
  const removeContact = document.querySelector(".delete");
  removeContact.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      await deleteContact(event.target.dataset.deleteContactId);
      STORE.destroyContact(event.target.dataset.deleteContactId);
      DOMHandler.load(Contacts);
    } catch (error) {
      STORE.accessDenied = error.message;
      DOMHandler.load(LoginPage);
    }
  });
}

function editContactListener() {
  const edit = document.querySelector(".edit");
  edit.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(EditContact);
  });
}

const ShowContactDetail = {
  toString() {
    return render();
  },
  addListeners() {
    logoutListener();
    cancelNewContactListener();
    deleteContactListener();
    editContactListener();
  },
};

export default ShowContactDetail;
