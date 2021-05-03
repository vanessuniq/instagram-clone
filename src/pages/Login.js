import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import FirebaseContext from "../context/FirebaseContext";

function Login(){
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [credentials, setCredentials] = useState({
        emailAdress: "",
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
    const handleLogin = (event) => {
        event.preventDefault();
        if (isInvalid){
         setError("Email or password should not be empty.");
        } else {
         // do something else
        };
    };
    useEffect(() => {
        document.title = "Login - Instagram";
    }, [])
    return(
        <div>
            Login Page
        </div>
    )
}

export default Login;