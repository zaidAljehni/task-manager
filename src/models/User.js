const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { HASH_SALT_ROUNDS } = require("../constants");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email must be provided"],
        trim: true,
        lowercase: true,
        unique: [true, "This Email is already used, please use another one."],
        validate: {
            validator: function (email) {
                return validator.default.isEmail(email);
            },
            message: function ({ value }) {
                return `${value} is not a valid Email!`
            }
        },
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
        trim: true,
        minlength: [6, "Password's length must be 6 characters at minimum."]
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, HASH_SALT_ROUNDS);
    next();
});


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Wrong credintials");
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
        throw Error("Wrong credintials");
    }

    return user._id;
}

userSchema.statics.signup = async function (email, password) {
    const user = await new this({ email, password });
    await user.save();
    return user._id;
}

module.exports = mongoose.model("User", userSchema);;