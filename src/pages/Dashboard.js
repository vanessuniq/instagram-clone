import { useEffect } from "react"

function Dashboard() {
    useEffect(() => {
        document.title = "Instagram";
    }, [])
    return(
        <div className="bg-gray-background">
            <div className="grid">
            </div>
        </div>
    )
};

export default Dashboard