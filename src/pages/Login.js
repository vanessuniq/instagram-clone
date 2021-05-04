import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { DASHBOARD, SIGN_UP } from "../constants/routes";
import FirebaseContext from "../context/FirebaseContext";

function Login(){
    const history = useHistory();
    const { firebaseApp } = useContext(FirebaseContext);
    const [credentials, setCredentials] = useState({
        emailAddress: "",
        password: ""
    });
    const [error, setError] = useState("");
    const isInvalid = credentials.email === "" || credentials.password === "";

    const handleInputChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    };
    const handleLogin = async (event) => {
        event.preventDefault();
        const { emailAddress, password } = credentials;
        try {
            await firebaseApp.auth().signInWithEmailAndPassword(emailAddress, password);
            setCredentials({...credentials, emailAddress: "", password: ""});
            setError("");
            history.push(DASHBOARD);
        } catch (error) {
            setError(error.message);
        }
    };
    useEffect(() => {
        document.title = "Login - Instagram";
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

                <form onSubmit={handleLogin}>
                    <input type="text" name="emailAddress"
                        aria-label="Enter your email address"
                        placeholder="Email address"
                        className="text-sm text-gray-base w-full mr-3 mb-2 py-5 
                        px-4 h-2 border border-gray-primary rounded"
                        value={credentials.emailAddress}
                        onChange={handleInputChange}
                    />
                    <input type="password" name="password"
                        aria-label="Enter your password"
                        placeholder="Password"
                        className="text-sm text-gray-base w-full mr-3 mb-2 
                        py-5 px-4 h-2 border border-gray-primary rounded"
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                    <button disabled={isInvalid} type="submit"
                        className={`text-white bg-blue-medium w-full rounded h-8 
                        font-bold ${isInvalid && "opacity-50"}`}
                    >
                        Log in
                    </button>
                </form>
           </div>
           <div className="flex flex-col justify-center items-center
            w-full bg-white p-4 border border-gray-primary rounded"
           >
            <p className="text-sm">Dont have an account?{` `}
                <Link to={SIGN_UP} className="font-bold text-blue-medium">
                    Sign up
                </Link>
            </p>
           </div>
         </div>
        </div>
    )
}

export default Login;