import { useEffect } from "react";

function NotFound(){
    useEffect(() => {
       document.title = "Not Found!";
    }, [])
 return(
    <div className="bg-gray-background mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
    </div>
 )
};

export default NotFound;