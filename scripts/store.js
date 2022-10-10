function destroyContact(id) {
  this.contacts = this.contacts.filter((contact) => contact.id != id);
  this.setFavoriteContacts();
  this.showContact = {};
}
function setFavoriteContacts() {
  this.favoriteContacts = this.contacts.filter(
    (contact) => contact.favorite === true
  );
}

function updateContact(contactEdited) {
  const index = this.contacts.findIndex(
    (contact) => contact === this.showContact
  );
  this.contacts.splice(index, 1, contactEdited);
  this.showContact = contactEdited;
  this.setFavoriteContacts();
}
const STORE = {
  accessDenied: false,
  contacts: [],
  favoriteContacts: [],
  showContact: {},
  setFavoriteContacts,
  destroyContact,
  updateContact,
};

export { STORE };
