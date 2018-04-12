require("dotenv").config()
const admin = require("firebase-admin")
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH)
const cookieParser = require("cookie-parser")()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

module.exports = function(req, res, next) {
  getIdToken(req, res).then(token => {
    if (token) {
      decodedTokenToBack(req, token).then(() => {
        next()
      })
    } else {
      next()
    }
  })
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
function getIdToken(req, res) {
  return new Promise(resolve => {
    cookieParser(req, res, () => {
      req.cookies && req.cookies.__session
        ? resolve(req.cookies.__session)
        : resolve()
    })
  })
}

/**
 *
 * @param {*} token
 * @param {*} req
 */
function decodedTokenToBack(req, token) {
  // @TODO: already authed user
  // https://github.com/davidroyer/nuxt-ssr-firebase-auth/blob/master/serverMiddleware/validateFirebaseIdToken.js
  return admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      console.log("success get token")
      req.user = decodedToken
    })
    .catch(error => {
      console.error("something wrong verifyng firebase token: ", error)
    })
}
