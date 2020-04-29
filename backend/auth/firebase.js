const admin = require("firebase-admin")
const serviceAccount = require("./fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-pantry.firebaseio.com"
});

const checkAuth = (req, res, next) => {
  console.log(Array(50).fill('@').join())
  console.log(req)
  console.log(Array(50).fill('@').join())
  console.log(req.headers)
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then((eto) => {
        console.log(eto)
        res.locals.user_id = eto.uid
        next()
      }).catch(() => {
        res.status(200).send('Unauthorized')
      });
  } else {
    res.status(200).send('Unauthorized!')
    return
  }
}

module.exports = {
  checkAuth
}