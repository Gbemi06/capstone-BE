import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role: {
      type: String,
      enum: ["Student", "Teacher", "Admin"],
      default: "Student",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const currentUser = this;
  const plainPW = currentUser.password;

  if (currentUser.isModified("password")) {
    // only if the user is modifying the password field I am going to use some CPU cycles to hash that, otherwise they are just wasted
    const hash = await bcrypt.hash(plainPW, 11);
    currentUser.password = hash;
  }
  next();
});

UserSchema.pre("save", async function (next) {
  const plainUsername = this;
  const currentUsername = plainUsername.username;

  // console.log(currentUsername);

  if (currentUsername.is("username")) {
    next("username already exists");
  } else {
    console.log("username is unique");
    next();
  }
  next();
});

UserSchema.methods.toJSON = function () {
  // this toJSON method is called EVERY TIME express does a res.send(user/s)

  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

UserSchema.static("checkCredentials", async function (username, plainPW) {
  const user = await this.findOne({ username }); // "this" here refers to the UsersModel

  //console.log(user);

  if (user) {
    const checkMatch = await bcrypt.compare(plainPW, user.password);

    if (checkMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});

export default model("User", UserSchema);
