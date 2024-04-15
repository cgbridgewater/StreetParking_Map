const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "A user name is required"]
    },
    addressLine1: { // street 
        type: String,
        required: [true, "An address is required"]
    },
    addressLine2: { // city, state, country
        type: String,
        required: [true, "An address is required"]
    },
    coordinates: { // coordinate set generated from geocode
        type: [Number],
        required: [true, "An address is required"]
    },
    JVM: {
        type: String,
    },
    instagram: {
        type: String,
    },
    facebook: {
        type: String,
    },
    spotify: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }

}, {timestamps: true})

// Virtual (Does not go to DB)
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );
    UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match!');
    }
    next();
});

// Encryption of password
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => 
        {this.password = hash;
        next();
    });
});

module.exports = mongoose.model("User", UserSchema)