import { User } from "./Models/user.js";
import { DBConnect } from "./db.js";
//connect to database
DBConnect();
//Create and Save a Record of a Model:
async function saveUser() {
  try {
    const user = new User({
      name: "Marry",
      age: 30,
      favoriteFoods: ["Pizza", "Burger"],
    });

    const savedUser = await user.save();
    console.log("Person saved:", savedUser);
  } catch (err) {
    console.error("Error saving person:", err);
  }
}

saveUser();
// Create Many Records with model.create()
async function createUsers() {
  try {
    const arrayOfPeople = [
      { name: "Alice", age: 25, favoriteFoods: ["Pasta", "Salad"] },
      { name: "Bob", age: 22, favoriteFoods: ["Tacos", "Burritos"] },
      { name: "Charlie", age: 29, favoriteFoods: ["Sushi", "Ramen"] },
    ];

    const createdUsers = await User.create(arrayOfPeople);

    console.log("People created:", createdUsers);
  } catch (err) {
    console.error("Error creating people:", err);
  }
}

createUsers();
// Use model.find() to Search Your Database
async function findUsers() {
  try {
    const findUsers = await User.find();

    console.log("People finded:", findUsers);
  } catch (err) {
    console.error("Error finding people:", err);
  }
}

findUsers();
// Use model.findOne() to Return a Single Matching Document from Your Database
async function findUser() {
  try {
    const userFinded = {
      name: "John Doe",
      age: 30,
      favoriteFoods: ["Pizza", "Burger"],
    };
    const findUser = await User.findOne(userFinded);

    console.log("user finded:", findUser);
  } catch (err) {
    console.error("Error finding people:", err);
  }
}

findUser();
// Use model.findById() to Search Your Database By _id
async function findUserById() {
  try {
    const userId = "66baa3e985c806a16ec5032f";
    const user = await User.findById(userId);

    if (user) {
      console.log("User found:", user);
    } else {
      console.log("No user found with that ID");
    }
  } catch (err) {
    console.error("Error finding user:", err);
  }
}
findUserById();
// Perform Classic Updates by Running Find, Edit, then Save
async function updateFavoriteFoods(personId) {
  try {
    const user = await User.findById(personId);

    if (!user) {
      console.log("No user found with that ID");
      return;
    }

    user.favoriteFoods.push("hamburger");

    await user.save();
    console.log("User updated:", user);
  } catch (err) {
    console.error("Error updating user:", err);
  }
}
updateFavoriteFoods("66baa3e985c806a16ec5032f");
// Perform New Updates on a Document Using model.findOneAndUpdate()
async function updateUserAgeByName(personName) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { name: "John Doe" },
      { age: 20 },
      { new: true }
    );

    if (updatedUser) {
      console.log("Updated user:", updatedUser);
    } else {
      console.log("No user found with that name");
    }
  } catch (err) {
    console.error("Error updating user:", err);
  }
}
updateUserAgeByName("John Doe");

// Delete One Document Using model.findByIdAndRemove
async function deleteUserById(personId) {
  try {
    const removedUser = await User.findByIdAndRemove(personId);

    if (removedUser) {
      console.log("User removed:", removedUser);
    } else {
      console.log("No user found with that ID");
    }
  } catch (err) {
    console.error("Error removing user:", err);
  }
}
deleteUserById("66baa3e985c806a16ec5032f");
// MongoDB and Mongoose - Delete Many Documents with model.remove()
async function deleteUsersByName(name) {
  try {
    const usersDelete = await User.deleteMany({ name: name });
    if (usersDelete) {
      console.log("User removed:", usersDelete);
    } else {
      console.log("No user found with that ID");
    }
  } catch (err) {
    console.error("Error removing user:", err);
  }
}
deleteUsersByName("Marry");
// Chain Search Query Helpers to Narrow Search Results
async function findAndProcessUsers() {
  try {
    const chain = await User.find({ favoriteFoods: "hamburger" }) // Trouver les personnes qui aiment les burritos
      .sort({ name: 1 }) // Trier les résultats par nom (ordre croissant)
      .limit(2) // Limiter les résultats à deux documents
      .select({ name: 1, _id: 1 }) // Sélectionner les champs à afficher (masquer l'âge)
      .exec();
    if (chain) {
      console.log("User :", chain);
    } else {
      console.log("No user found with that ID");
    }
  } catch (err) {
    console.error("Error removing user:", err);
  }
}

findAndProcessUsers();
