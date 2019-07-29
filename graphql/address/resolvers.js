const db = require("../../models");

const {
  checkError,
  checkAuthentication,
  queryHelper,
  objectFilter
} = require("../utils");

const { transformAddress } = require("./utils");

const addressScopes = require("./scopes");

const createAddress = async (args, req) => {
  try {
    checkAuthentication(req, addressScopes.createAddress.name);
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
    const address = {
      street: args.params.street,
      number: args.params.number,
      complement: args.params.complement,
      city: args.params.city,
      state: args.params.state,
      zipCode: args.params.zipCode,
      userId: args.params.userId
    };

    let addressCreated = await db.address.create(address);

    return objectFilter(
      addressCreated.dataValues,
      transformAddress(addressCreated.dataValues)
    );
  } catch (error) {
    checkError(error);
  }
};

const updateAddress = async (args, req) => {
  try {
    checkAuthentication(req, addressScopes.updateAddress.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const address = await queryHelper(
      "address",
      { where: { id: args.params.id } },
      true
    );

    if (!address) throw "not found";

    const addressUpdated = await address.update({ ...args.params });

    if (Object.keys(addressUpdated._changed).length)
      return objectFilter(
        addressUpdated.dataValues,
        transformAddress(addressUpdated.dataValues)
      );

    throw "no content";
  } catch (error) {
    checkError(error);
  }
};

const removeAddress = async (args, req) => {
  try {
    checkAuthentication(req, addressScopes.removeAddress.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const addressRemoved = await db.address.destroy({
      where: { id: args.id },
      limit: 1
    });

    if (!addressRemoved) throw "not found";

    return "address removed";
  } catch (error) {
    checkError(error);
  }
};

const listAddresses = async (args, req) => {
  try {
    checkAuthentication(req, addressScopes.listAddresses.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const addresses = await db.address.findAll({
      where: { userId: args.userId }
    });

    if (!addresses.length) throw "not found";

    return addresses.map(address => {
      return objectFilter(
        address.dataValues,
        transformAddress(address.dataValues)
      );
    });
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  createAddress,
  updateAddress,
  removeAddress,
  listAddresses
};
