const db = require("../../models");

const {
  checkError,
  checkAuthentication,
  queryHelper,
  objectFilter
} = require("../utils");

const { transformContact } = require("./utils");

const contactScopes = require("./scopes");

const createContact = async (args, req) => {
  try {
    checkAuthentication(req, contactScopes.createContact.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const user = await queryHelper("user", {
      where: { id: args.params.userId }
    });

    if (!user) throw "not found";
  } catch (error) {
    checkError(error);
  }

  try {
    const contact = {
      userId: args.params.userId,
      email: args.params.email,
      phone: args.params.phone
    };

    let contactCreated = await db.contact.create(contact);

    return objectFilter(
      contactCreated.dataValues,
      transformContact(contactCreated.dataValues)
    );
  } catch (error) {
    checkError(error);
  }
};

const updateContact = async (args, req) => {
  try {
    checkAuthentication(req, contactScopes.updateContact.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const contact = await queryHelper(
      "contact",
      { where: { id: args.params.id } },
      true
    );

    if (!contact) throw "not found";

    const contactUpdated = await contact.update({ ...args.params });

    if (Object.keys(contactUpdated._changed).length)
      return objectFilter(
        contactUpdated.dataValues,
        transformContact(contactUpdated.dataValues)
      );

    throw "no content";
  } catch (error) {
    checkError(error);
  }
};

const removeContact = async (args, req) => {
  try {
    checkAuthentication(req, contactScopes.removeContact.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const contactRemoved = await db.contact.destroy({
      where: { id: args.id },
      limit: 1
    });

    if (!contactRemoved) throw "not found";

    return "contact removed";
  } catch (error) {
    checkError(error);
  }
};

const listContacts = async (args, req) => {
  try {
    checkAuthentication(req, contactScopes.listContacts.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const contacts = await db.contact.findAll({
      where: { userId: args.userId }
    });

    if (!contacts.length) throw "not found";

    return contacts.map(contact => {
      return objectFilter(
        contact.dataValues,
        transformContact(contact.dataValues)
      );
    });
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  createContact,
  updateContact,
  removeContact,
  listContacts
};
