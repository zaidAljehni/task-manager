const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email must be provided"],
        trim: true,
        unique: true,
        validate: {
            validator: function(email) {
                return validator.default.isEmail(email);
            },
            message: function({email}) {
                return `${email} is not a valid Email!`
            }
        },
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
        trim: true,
        minlength: [6, "Password's length must be 6 characters at minimum."]
    }
});

module.exports = mongoose.model("User", userSchema);