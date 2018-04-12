require("dotenv").config()
// This is aliased in webpack config based on server/client build
import { createAPI } from "create-api"

const logRequests = !!process.env.DEBUG_API
let api = {}

let _api = createAPI({
  config: {
    apiKey: "AIzaSyDtysIh7RhKbrI7jgDK3YFqhCsDIcWbTcU",
    authDomain: "todo-b0997.firebaseapp.com",
    projectId: "todo-b0997"
  }
}).then(_api => {
  api = _api
  // warm the front page cache every 15 min
  // make sure to do this only once across all requests
  if (api.onServer) {
    warmCache()
  }
})

function warmCache() {
  if (!api.cachedIds) {
    return
  }
  fetchItems((api.cachedIds.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}

async function fetch({ doc }) {
  logRequests && console.log(`fetching ${doc}...`)
  await _api
  const cache = api.cachedItems
  if (cache && cache.has(doc)) {
    logRequests && console.log(`cache hit for ${doc}.`)
    return cache.get(doc)
  } else {
    return new Promise(resolve => {
      var docRef = api.collection("docs").doc(doc)
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            const val = doc.data()
            // mark the timestamp when this item is cached
            if (val) val.__lastUpdated = Date.now()
            cache && cache.set(doc.id, val)

            logRequests && console.log(`fetched ${doc.id}.`)
            resolve(val)
          } else {
            console.log("No such document!")
          }
        })
        .catch(err => {
          console.log("Error getting document", err)
        })
    })
  }
}

// @FIXME: make simple
async function fetchTypes({ collectionType }) {
  await _api

  return new Promise(resolve => {
    var docRef = api
      .collection("doc_types")
      .doc(collectionType)
      .collection("ids")
    var idArr = []
    docRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          idArr.push(doc.id)
        })
        resolve(idArr)
      })
      .catch(err => {
        console.log("Error getting document", err)
      })
  })
}

export function fetchIdsByType(type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetchTypes({ collectionType: type })
}

export function fetchItem(id) {
  return fetch({ doc: id })
}

export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
  return fetch(`user/${id}`)
}
// @TODO
// export async function watchList(type, cb) {
//   let first = true
//   await _api
//   const ref = api.collection("types").doc(`${type}stories`)
//   const handler = doc => {
//     if (first) {
//       first = false
//     } else {
//       cb(doc.data().ids)
//     }
//   }
//   ref.on("value", handler)
//   return () => {
//     ref.off("value", handler)
//   }
// }

export function batchNewSet({ collectionName, data }) {
  return new Promise(resolve => {
    // Set the value of item
    api
      .collection(collectionName)
      .add(data)
      .then(function(docRef) {
        console.log(docRef.id)
        var docId = docRef.id

        // Get a new write batch
        var batch = api.batch()

        // set tags
        const typeKeys = Object.keys(data.types)
        typeKeys.forEach(type => {
          var typeRef = api
            .collection("doc_types")
            .doc(type)
            .collection("ids")
            .doc(docRef.id)
          batch.set(typeRef, { [docRef.id]: true })
        })

        // set user's doc
        var userRef = api
          .collection("user_docs")
          .doc(data.uid)
          .collection("ids")
          .doc(docRef.id)
        batch.set(userRef, { [docId]: true })

        // update docID
        var addedDocRef = api.collection("docs").doc(docRef.id)
        batch.set(addedDocRef, { id: docRef.id }, { merge: true })

        batch.commit().then(() => {
          resolve()
        })
      })
  })
}

export function publishByType(obj) {
  return batchNewSet({
    collectionName: "docs",
    data: obj
  })
}
