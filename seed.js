var faker = require("faker");
// import sample from "lodash.sample";
const { User } = require("./models/user");

const seedUsers = async () => {
  try {
    /** check if already populated */

    const usersCollection = await User.find();

    // let usersCollection = await User.findOne({
    //   email: "msqbmehmood@gmail.com",
    // });
    // console.log("usersCollection", usersCollection);
    // if (usersCollection.length > 1) {
    //   return;
    // }
    /** quantity to be generated */
    const quantity = 10;
    /** empty array to store new data */
    let users = [];
    for (let i = 0; i < quantity; i++) {
      users.push(
        new User({
          email: faker.internet.email(),
          password: faker.internet.password(),
          name: faker.internet.userName(),
          // url: faker.internet.url(),
          // photoURL: faker.internet.avatar(),
          // bio: faker.lorem.sentence()
        })
      );
    }
    /** little housekeeping before adding new users */
    // await User.remove();
    /** create new database entry for every user in the array */
    // console.log("Seeder.js", users);
    users.forEach((user) => {
      User.create(user);
      console.log("Yesss", user);
    });
    console.log("Users Collection has been Populated!");
  } catch (error) {
    console.log("gsfgsdfg", error);
  }
};

// export seedUsers=seedUsers
// module.exports = seedUsers;
exports.seedUsers = seedUsers;
