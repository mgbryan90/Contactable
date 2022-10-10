import apiFetch from "./api-fetch.js";

async function getContacs() {
  const contacts = await apiFetch("contacts");
  return contacts;
}

async function toggleFavoriteContact(id, favorite) {
  const toogleFavoriteContact = await apiFetch(`contacts/${id}`, {
    method: "PATCH",
    body: { favorite: favorite },
  });
  console.log(favorite);
  console.log(toogleFavoriteContact);
}

async function createNewContact(newContact) {
  await apiFetch("contacts", {
    body: newContact,
  });
}

async function editContact(id, contact) {
  const contactEdited = await apiFetch(`contacts/${id}`, {
    method: "PATCH",
    body: contact,
  });
  return contactEdited;
}

async function deleteContact(id) {
  await apiFetch(`contacts/${id}`, { method: "DELETE" });
}

export {
  getContacs,
  toggleFavoriteContact,
  createNewContact,
  deleteContact,
  editContact,
};
