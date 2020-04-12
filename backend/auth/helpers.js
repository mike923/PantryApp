const bcrypt = require("bcrypt");

//encrypting the user password by creating a one way
//hash of the entered password
const hashPassword = async (password) => {
  try {
    //adding salt to the hash to increase it's randomness
    const salt = await bcrypt.genSalt(12);
    const password_digest = await bcrypt.hash(password, salt);

    return password_digest;
  } catch (err) {
    console.log(err);
  }
};

//comparing the entered password hash against the already hashed password stored in the database
const comparePasswords = async (candidatePassword, passwordDigest) => {
  try {
    return await bcrypt.compare(candidatePassword, passwordDigest);
  } catch (err) {
    console.log("eros", err);
  }
};

//middleware that requires the user to be logged in to access the private back-end rouutes
const loginRequired = (req, res, next) => {
  if (req.user) return next();

  res.status(401).json({
    payload: null,
    msg: "You need to be logged in to access this route",
    err: true,
  });
};

//exporting functions to be accessed by other files
module.exports = {
  hashPassword,
  comparePasswords,
  loginRequired,
};
