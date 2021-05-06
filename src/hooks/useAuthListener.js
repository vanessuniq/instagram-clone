import { useContext, useEffect, useState } from "react"
import FirebaseContext from "../context/FirebaseContext";

function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
    const { firebaseApp } = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebaseApp.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                // If a user is signed in, save user in localstorage and update the state
                localStorage.setItem("authUser", JSON.stringify(authUser));
                setUser(authUser);
            } else {
                // There's no user signed in, clear the localestorage and set the state to null
                localStorage.removeItem("authUser");
                setUser(null);
            }
        })
        return () => listener();
    }, [firebaseApp])

    return { user }
}

export default useAuthListener