const db = require("./models");

const generateAdmin = async () => {
  try {
    const hashedPassword = await bcryptjs.hash("000000", 12);

    db.user.create({
      email: "admin@gmail.com",
      password: hashedPassword,
      cpf: "11111111111",
      matriculation: "2222",
      firstName: "Admin",
      secondName: "",
      creator: 1
    });
  } catch (error) {
    console.log(error);
  }
};

generateScopes()