const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  //Check for all input fields
  if (!firstName || !lastName || !password || !email) {
    throw new Error("All fields are required");
  }
  //create the user
  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  return user;
};
