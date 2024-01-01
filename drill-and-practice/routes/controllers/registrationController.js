import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import {
    isEmail,
    minLength,
    required,
    validate,
  } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const registerUser = async ({ render, request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password")

  const registerData = {
    email: email,
    password: password
  }

  const data = {
    errors: null,
    email: '',
    password: ''
  }
  const validationRules = {
    email: [required, isEmail],
    password: [required, minLength(4)]
  };

  const [passes, errors] = await validate(registerData, validationRules);
  if(!passes) {
    data.errors = errors;
    data.email = email;
    data.password = password;
    render("registration.eta", data)
  } else {
    await userService.addUser(
        email,
        await bcrypt.hash(password),
      );
    
    response.redirect("/auth/login");
  }


};

const showRegistrationForm = ({ render }) => {
    const data = {
        errors: null,
        email: '',
        password: ''
    }
    render("registration.eta", data);
};

export { registerUser, showRegistrationForm };