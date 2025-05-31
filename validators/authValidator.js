const validator = require("validator");

const validateRegisterData = (data) => {
    const errors = [];
    const { firstName, lastName, username, email, password } = data;

    const requiredFields = ["firstName", "lastName", "username", "email", "password"];
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
        errors.push(`Missing fields: ${missingFields.join(", ")}`);
    }

    if (firstName && !/^[A-Za-z]+$/.test(firstName)) {
        errors.push("First name can only contain letters");
    }

    if (lastName && !/^[A-Za-z]+(-[A-Za-z]+)?$/.test(lastName)) {
        errors.push("Last name can only contain letters and a hyphen between two names");
    }

    if (firstName && (firstName.length < 2 || firstName.length > 50)) {
        errors.push("First name must be between 2 and 50 characters");
    }

    if (lastName && (lastName.length < 2 || lastName.length > 50)) {
        errors.push("Last name must be between 2 and 50 characters");
    }

    if (username && (username.length < 3 || username.length > 30)) {
        errors.push("Username must be between 3 and 30 characters");
    }

    if (username && !/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("Username can only contain letters, numbers, and underscores");
    }

    if (email && !validator.isEmail(email)) {
        errors.push("Invalid email format");
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (password && !passwordRegex.test(password)) {
        errors.push("Password must be at least 8 characters long and contain at least one special character");
    }

    return errors;
};

const validateLoginInput = (body) => {
    const { email, username, password } = body;
  
    if ((!email && !username) || !password) {
        return { valid: false, message: "Email or username and password are required" };
    }
  
    return { valid: true };
};
  

module.exports = { validateRegisterData, validateLoginInput };