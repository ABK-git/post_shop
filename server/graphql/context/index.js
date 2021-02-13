const passport = require("passport");

// options == {email, password}
const authenticateUser = (req, options) => {
  return new Promise((resolve, reject) => { //ここ
    console.log("Calling authenticateUser");

    const done = (error, user) => {

      if (error) {
        req.helloWorld();
        return reject(new Error(error));
      }

      if (user) {
        req.login(user, (error) => {
          return resolve(user);
        })
      }else{
        return reject(new Error("emailかpasswordが違います"))
      }
    };

    const authFn = passport.authenticate("graphql", options, done);
    authFn();//ここ
  });
};

exports.buildAuthContext = (req) => {
  const auth = {
    authenticate: (options) => authenticateUser(req, options), //ここ
    logout: () => req.logout(),
    isAuthenticated: () => req.isAuthenticated(),
    getUser: () => req.user
  }
  return auth;
};
