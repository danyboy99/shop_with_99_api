//const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const localStrategy = require("passport-local").Strategy;
const User = require("./model/user.js");
const Admin = require("./model/admin.js");
const { jwt_secret } = require("./config/keys.js");
//jsonwebtoken strategy

const passportConfig = (passport) => {
  // users passport strategy
  passport.use(
    "userSign",
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt_secret,
      },
      async (payload, done) => {
        try {
          //find user specified in token
          const user = await User.findById(payload.sub);

          //if user doesn't exist, handle it
          if (!user) {
            return done(null, false);
          }
          //otherwise, return the user

          done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );

  // user login strategy
  passport.use(
    "userLogin",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          //find user by given email
          const user = await User.findOne({ email: email });

          //if user not found
          if (!user) {
            return done(null, false);
          }
          //check if password is correct
          const passwordMatch = await user.isPasswordValid(password);
          console.log("passresult", passwordMatch);
          //if password is incorrect
          if (!passwordMatch) {
            return done(null, false);
          }
          //otherwise return user
          done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );

  //admin passport strategy
  passport.use(
    "adminSign",
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt_secret,
      },
      async (payload, done) => {
        try {
          //find user specified in token
          const admin = await Admin.findById(payload.sub);

          //if user doesn't exist, handle it
          if (!admin) {
            return done(null, false);
          }
          //otherwise, return the user

          done(null, admin);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );

  // admin login strategy
  passport.use(
    "adminLogin",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          //find user by given email
          const user = await Admin.findOne({ email: email });

          //if user not found
          if (!user) {
            return done(null, false);
          }
          //check if password is correct
          const passwordMatch = await user.isPasswordValid(password);
          console.log("passresult", passwordMatch);
          //if password is incorrect
          if (!passwordMatch) {
            return done(null, false);
          }
          //otherwise return user
          done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );
};

module.exports = passportConfig;
