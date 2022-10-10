import { tokenKey } from "./scripts/config.js";
import DOMHandler from "./scripts/dom-handler.js";
import Contacs from "./scripts/pages/contacs.js";
import LoginPage from "./scripts/pages/login-page.js";
import { getContacs } from "./scripts/services/contacs-services.js";
import { STORE } from "./scripts/store.js";

const credentials = { email: "team3@mail.com", password: "123456" };

// async function test() {
//   try {
//     const user = await login(credentials);
//     console.log(user);
//     const data = await logout();
//     console.log(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// test();

async function init() {
  try {
    STORE.accessDenied = false;
    const token = sessionStorage.getItem(tokenKey);

    if (!token) return DOMHandler.load(LoginPage);

    STORE.contacts = await getContacs();
    STORE.setFavoriteContacts();
    STORE.showContact = {};
    DOMHandler.load(Contacs);
  } catch (error) {
    console.log(error);
    DOMHandler.load(LoginPage);
    sessionStorage.removeItem(tokenKey);
  }
}

init();
