import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { DASHBOARD, LOGIN } from "../constants/routes";
import FirebaseContext from "../context/FirebaseContext";
import { doesUsernameExist } from "../services/firebase";

function Signup(){
    const history = useHistory();
    const { firebaseApp } = useContext(FirebaseContext);
    const initialUserInfoState = {
        username: "",
        fullName: "",
        emailAddress: "",
        password: ""
    }
    const [userInfo, setUserInfo] = useState(initialUserInfoState);
    const [error, setError] = useState("");
    const isInvalid = userInfo.emailAddress === "" || userInfo.password === "";

    const handleInputChange = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    };
    const handleSignup = async (event) => {
        event.preventDefault();
        const { username, fullName, emailAddress, password } = userInfo;
        const usernameExist = await doesUsernameExist(username.toLowerCase());

        if (usernameExist){
         setError("The username entered is already taken, please try another one.")
        } else {
         try {
            const createdUser = await firebaseApp
                .auth()
                .createUserWithEmailAndPassword(emailAddress, password);

            // Update the user profile to add the username
            await createdUser.user.updateProfile({displayName: username});

            // Create a document in the firebase user collection
            await firebaseApp.firestore().collection("users").add({
                userId: createdUser.user.uid,
                username: username.toLowerCase(),
                fullName,
                emailAddress: emailAddress.toLowerCase(),
                following: [],
                followers: [],
                dateCreated: Date.now()
            });

            // Reset the signup form and redirect to dashboard page
            setUserInfo({
                ...userInfo,
                ...initialUserInfoState
            });
            setError("");

            history.push(DASHBOARD);

         } catch (error) {
             setError(error.message);
         }
        };
    };
    useEffect(() => {
        document.title = "Sign Up - Instagram";
    }, [])
    return(
        <div className="container flex mx-auto max-w-screen-md items-center 
            h-screen"
        >
           <div className="flex w-3/5">
            <img src="/images/iphone-with-profile.jpg" 
                alt="Iphone with instagram"
            />
           </div>

           <div className="flex flex-col w-2/5">
            <div className="flex flex-col bg-white justify-center
                items-center mb-4 p-4 border border-gray-primary rounded"
            >
                <h1 className="flex justify-center w-full">
                    <img src="/images/logo.png" alt="Instagram" 
                        className="mt-2 w-6/12"
                    />
                </h1>

                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                <form onSubmit={handleSignup}>
                    <input type="text" name="username"
                        aria-label="Enter your username"
                        placeholder="Username"
                        className="text-sm text-gray-base w-full mr-3 mb-2 py-5 
                        px-4 h-2 border border-gray-primary rounded"
                        value={userInfo.username}
                        onChange={handleInputChange}
                    />
                    <input type="text" name="fullName"
                        aria-label="Enter your full name"
                        placeholder="Full name"
                        className="text-sm text-gray-base w-full mr-3 mb-2 py-5 
                        px-4 h-2 border border-gray-primary rounded"
                        value={userInfo.fullName}
                        onChange={handleInputChange}
                    />
                    <input type="text" name="emailAddress"
                        aria-label="Enter your email address"
                        placeholder="Email address"
                        className="text-sm text-gray-base w-full mr-3 mb-2 py-5 
                        px-4 h-2 border border-gray-primary rounded"
                        value={userInfo.emailAddress}
                        onChange={handleInputChange}
                    />
                    <input type="password" name="password"
                        aria-label="Enter your password"
                        placeholder="Password"
                        className="text-sm text-gray-base w-full mr-3 mb-2 
                        py-5 px-4 h-2 border border-gray-primary rounded"
                        value={userInfo.password}
                        onChange={handleInputChange}
                    />
                    <button disabled={isInvalid} type="submit"
                        className={`text-white bg-blue-medium w-full rounded h-8 
                        font-bold ${isInvalid && "opacity-50"}`}
                    >
                        Sign up
                    </button>
                </form>
           </div>
           <div className="flex flex-col justify-center items-center
            w-full bg-white p-4 border border-gray-primary rounded"
           >
            <p className="text-sm">Already have an account?{` `}
                <Link to={LOGIN} className="font-bold text-blue-medium">
                    Log in
                </Link>
            </p>
           </div>
         </div>
        </div>
    )
}

export default Signup;