import Firebase from "firebase"
// Required for side-effects
require("firebase/firestore")
import LRU from "lru-cache"

export async function createAPI({ config }) {
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    const fbapp = Firebase.initializeApp(config)
    const db = fbapp.firestore()
    api = process.__API__ = db

    api.onServer = true

    // fetched item cache
    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {}
    ;["top", "music", "code", "art"].forEach(collectionType => {
      let emptyArr = []
      api
        .collection("doc_types")
        .doc(collectionType)
        .collection("ids")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            emptyArr.push(doc.id)
          })
          api.cachedIds[collectionType] = emptyArr
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
  return api
}
