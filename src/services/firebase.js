import { firebaseApp } from "../lib/firebase";

// Check if username exists in the firebase users collection
export async function doesUsernameExist(username) {
    const result = await firebaseApp
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

    return result.docs.length > 0;
}