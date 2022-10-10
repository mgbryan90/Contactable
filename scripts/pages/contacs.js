import { STORE } from "../store.js";
import AllContacts from "../components/all-contacts.js";
import FavoriteContacts from "../components/favorite-contacts.js";
import { logout } from "../services/sessions-service.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import NewContact from "./new-contact.js";

function render() {
  return `
  <div>
    <div class="contacts__header">
      <h1 class="title">Contactable</h1>
      <a href="#" class="js-logout">Logout</a>
    </div>
    <div>
    ${STORE.favoriteContacts.length === 0 ? " " : FavoriteContacts}
    </div>
    <div class="contacs">
      ${AllContacts}
    </div>
    <div class="add-icon js-add-contact">
      <img class="circle-icon" src="../../assets/images/circle.svg">
      <img class="union-icon" src="../../assets/images/union.svg">
    </div>
  </div>
    
  `;
}

function newContactListener() {
  const newContact = document.querySelector(".js-add-contact");
  newContact.addEventListener("click", (event) => {
    DOMHandler.load(NewContact);
  });
}

export function logoutListener() {
  NewContact.numberError = false;
  const logoutSession = document.querySelector(".js-logout");
  logoutSession.addEventListener("click", async (event) => {
    event.preventDefault();
    await logout();
    DOMHandler.load(LoginPage);
  });
}

const Contacts = {
  toString() {
    return render();
  },
  addListeners() {
    AllContacts.addListeners();
    logoutListener();
    newContactListener();
    FavoriteContacts.addListeners();
  },
};

export default Contacts;
