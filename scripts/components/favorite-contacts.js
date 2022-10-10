import DOMHandler from "../dom-handler.js";
import LoginPage from "../pages/login-page.js";
import ShowContactDetail from "../pages/show-contact.js";
import {
  getContacs,
  toggleFavoriteContact,
} from "../services/contacs-services.js";
import { STORE } from "../store.js";

function renderFavoriteContact(contact) {
  return `
  <li class="favorites__item">
    <div class="contact__item--text" data-contact-id="${contact.id}">
      <img class="contact__item--img" src="../../assets/images/avatar.svg">
      <p>${contact.name}</p>
    </div>
    <div data-id="${contact.id}"><i class='bx bxs-star star-default ${
    contact.favorite ? "star-favorite" : ""
  }' data-id="${contact.id}"></i></div>
  </li>
  `;
}

function render() {
  const favoriteContacts = STORE.favoriteContacts;
  return `
  <div class="subtitle">FAVORITES</div>
  <ul class="all-favorites">
    ${favoriteContacts.map(renderFavoriteContact).join("")}
  <ul>
  `;
}

function showDetailFavoriteContactListener() {
  const showContacts = document.querySelector(".all-favorites");
  if (!showContacts) return;
  showContacts.addEventListener("click", (event) => {
    try {
      const contact = event.target.closest("[data-contact-id]");
      if (!event.target.closest("[data-contact-id]")) return;

      const showContact = STORE.contacts.find(
        (element) => element.id == contact.dataset.contactId
      );
      STORE.showContact = showContact;
      DOMHandler.load(ShowContactDetail);
    } catch (error) {
      STORE.accessDenied = error.message;
      DOMHandler.load(LoginPage);
    }
  });
}

function changeFavoriteContact() {
  const allFavorites = document.querySelector(".all-favorites");
  if (!allFavorites) return;
  allFavorites.addEventListener("click", async (event) => {
    try {
      if (!event.target.dataset.id) return;

      await toggleFavoriteContact(event.target.dataset.id, false);

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

const FavoriteContacts = {
  toString() {
    return render();
  },
  addListeners() {
    changeFavoriteContact();
    showDetailFavoriteContactListener();
  },
};

export default FavoriteContacts;
