# Code Log

## 12-02-26 - Starting the code log

- Started the project in vite, the goal is create simple components such as login form, dashboard, etc. Components that we can re use in the future.

- Install tailwindcss and @tailwindcss/vite via npm.
  - [x] Create the vite project.
  - [x] Install tailwindcss and @tailwindcss/vite via npm.
  - [x] Add the @tailwindcss/vite plugin to your Vite configuration.
  - [x] Add an @import to your CSS file that imports Tailwind CSS.

- [x] Merge the /setup branch to /main, and delete the /setup branch.

- [x] Create a /dev branch to work on the development of the components, and a /main branch to merge the final code.

- Copy the necessary DACS templates.
  - [x] Create a new DACS template for the scaffold of the components.
  - [x] Create the MVC pattern DACS template, which will be used as a base for the components.
  - [x] TODO: Create the JS functions DACS template, which will be used to create the necessary JS functions for the components.

---

## 13-02-26 - Coding the login form component.

- [x] Create the login form component, starting with the HTML structure, then the CSS styles, and finally the JS functions.
  - [x] Create the HTML structure of the login form component.
  - [x] Create the CSS styles for the login form component.

---

## 14-02-26 - Coding the login business logic.

- [x] Create the Factory pattern for the login form component.
  - [x] Code view logic for the login form component.
  - [x] Show the login form component in the browser, and test that it works as expected.
  - [x] Create the Controller logic for the login form component, which will handle the user interactions and the business logic of the component.

---

## 15-02-26 - Coding the toogle password component.

- [x] Code the toogle password logic.
  - [x] When the user clicks on the toogle password button, the password input field should change its type from "password" to "text", and vice versa.
  - [x] The toogle password button should also change its icon from an eye to an eye with a slash, and vice versa.
  - [x] Test the toogle password functionality in the browser, and make sure it works as expected.
- [x] Code recovery password logic.
  - [x] When the user clicks on the recovery password link, the user should redirect to a new page with a form to recover the password.
  - [x] The recovery link must be a env variable, so we can change it in the future without having to change the code.
  - [x] Test the recovery password functionality in the browser, and make sure it works as expected.

---

## 16-02-26 - Coding the validators rules for the login form component.

- [x] Code the validators rules for the login form component.
  - [x] The user input field should be required, and should have a valid format.
  - [x] The password input field should be required, and should have a minimum length of 8 characters.
  - [x] Test the validators rules in the browser, and make sure they work as expected.

---

## 17-02-26 - Starting Backend.

- [x] Start the backend development for the login form component, which will handle the authentication logic and the communication with the database.
  - [] Create the necessary endpoints for the login form component, such as the login endpoint, middleware for authentication, etc.
  - [] Test the backend endpoints using a tool like Postman, and make sure they work as expected.
