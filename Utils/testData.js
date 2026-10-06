const testData = {
  // Guaranteed pre-seeded demo user built into ParaBank
  validUser: {
    username: "john",
    password: "demo",
  },

  // User-created profile credentials
  customUser: {
    username: "amankori",
    password: "Bhull@kd12",
  },

  // Parameterized test data for login scenarios
  loginTestCases: [
    {
      title: "Login with valid credentials",
      username: "john",
      password: "demo",
      expectedSuccess: true,
      expectedUrlPattern: /overview\.htm/,
    },
    {
      title: "Login with invalid username",
      username: "non_existing_user_9999",
      password: "demo",
      expectedSuccess: false,
      expectedErrorMessage: /The username and password could not be verified|An internal error has occurred/i,
    },
    {
      title: "Login with invalid password",
      username: "john",
      password: "IncorrectPassword123!",
      expectedSuccess: false,
      expectedErrorMessage: /The username and password could not be verified|An internal error has occurred/i,
    },
    {
      title: "Login with empty username",
      username: "",
      password: "demo",
      expectedSuccess: false,
      expectedErrorMessage: /Please enter a username and password/i,
    },
    {
      title: "Login with empty password",
      username: "john",
      password: "",
      expectedSuccess: false,
      expectedErrorMessage: /Please enter a username and password/i,
    },
    {
      title: "Login with both username and password empty",
      username: "",
      password: "",
      expectedSuccess: false,
      expectedErrorMessage: /Please enter a username and password/i,
    },
  ],
};

module.exports = testData;
