const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { comparePasswords } = require("../auth/helpers");
const usersQueries = require("../db/queries/users");

//middleware that authenticates the user by comparing password in database
//to the password the user enters to log in
passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      //checking if the user exists within database
      //if user doesn't exist finish operation
      const user = await usersQueries.getUserByEmail(email);
      if (!user) {
        return done(null, false);
      }

      //checking if the passwords match together
      const passMatch = await comparePasswords(password, user.password_digest);
      if (!passMatch) {
        return done(null, false);
      }

      //removes password so that it is not stored
      delete user.password_digest;
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    let retrievedUser = await usersQueries.getUserByEmail(user.email);
    delete retrievedUser.password_digest;
    done(null, retrievedUser);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
