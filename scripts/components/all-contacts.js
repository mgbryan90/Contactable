import DOMHandler from "../dom-handler.js";
import LoginPage from "../pages/login-page.js";
import ShowContactDetail from "../pages/show-contact.js";
import {
  getContacs,
  toggleFavoriteContact,
} from "../services/contacs-services.js";
import { STORE } from "../store.js";

function renderContact(contact) {
  return `
  <li class="contact__item">
    <div class="contact__item--text" data-contact-id="${contact.id}">
      <img class="contact__item--img" src="../../assets/images/avatar.svg">
      <p>${contact.name}</p>
    </div>
    <div><i class='bx bxs-star star-default ${
      contact.favorite ? "star-favorite" : ""
    }' data-id="${contact.id}"></i></div>
  </li>
  `;
}

function render() {
  const contacts = STORE.contacts;
  return `
  <div class="subtitle">CONTACTS (${contacts.length})</div>
  <ul class="all-contacts">
    ${contacts.map(renderContact).join("")}
  <ul>
  `;
}

export function setFavoriteContact() {
  const allContacts = document.querySelector(".all-contacts");
  allContacts.addEventListener("click", async (event) => {
    try {
      if (!event.target.dataset.id) return;

      if (event.target.classList.contains("star-favorite")) {
        await toggleFavoriteContact(event.target.dataset.id, false);
      } else {
        await toggleFavoriteContact(event.target.dataset.id, true);
      }
      event.target.classList.toggle("star-favorite");
      STORE.contacts = await getContacs();
      STORE.setFavoriteContacts();
      DOMHandler.reload();
    } catch (error) {
      STORE.accessDenied = error.message;
      DOMHandler.load(LoginPage);
    }
  });
}

function showDetailContactListener() {
  const showContacts = document.querySelector(".all-contacts");
  showContacts.addEventListener("click", (event) => {
    const contact = event.target.closest("[data-contact-id]");
    if (!event.target.closest("[data-contact-id]")) return;

    const showContact = STORE.contacts.find(
      (element) => element.id == contact.dataset.contactId
    );
    STORE.showContact = showContact;
    DOMHandler.load(ShowContactDetail);
  });
}

const AllContacts = {
  toString() {
    return render();
  },
  addListeners() {
    setFavoriteContact();
    showDetailContactListener();
  },
};

export default AllContacts;
