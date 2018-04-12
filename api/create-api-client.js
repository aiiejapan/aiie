import { initializeApp, firestore } from "firebase/app"
require("firebase/firestore")

export async function createAPI({ config }) {
  await import(/* webpackChunkName: "firebase" */ "firebase/firestore")
  initializeApp(config)
  return firestore()
}
