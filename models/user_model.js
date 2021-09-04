const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const user_schema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      validate: /^[A-Za-z0-9_-]*$/im,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    tel: {
      type: Number,
      required: true,
      validate: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 1000,
      minlength: 8,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    likes: {
      type: [String],
    },
    role: {
      type: String,
    },
    isValidate: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

user_schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

user_schema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", user_schema);

module.exports = UserModel;
