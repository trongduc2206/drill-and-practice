import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );

  const errorData = {
    errors: [],
    email: '',
    password: ''
  }
  if (userFromDatabase.length != 1) {
    errorData.errors.push("Not found user with provided email!");
    errorData.email = params.get("email");
    errorData.password = params.get("password");
    render("login.eta", errorData);
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    errorData.errors.push("Password is not correct!")
    errorData.email = params.get("email");
    errorData.password = params.get("password");
    render("login.eta", errorData);
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
    const errorData = {
        errors: null,
        email: '',
        password: ''
      }
    render("login.eta", errorData);
};

const logout = async ( context ) => {
    const user = await context.state.session.get("user");
  
    if (
      user 
    ) {
        await context.state.session.deleteSession();
        context.response.redirect('/');
    } else {
        context.response.redirect('/');
    }
};

export {showLoginForm, processLogin, logout};