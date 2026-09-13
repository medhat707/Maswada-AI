import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";


type Props = {
    children: React.ReactNode
}

export function ProtectedRoute(    {children} : Props){

    const {isSignedIn, isLoaded} = useAuth();
    

    if(!isLoaded){
        return  (
            <div className="flex items-center justify-center h-screen">
                <Loader/>
            </div>
        )
    }

    if(!isSignedIn) {
        return <Navigate to="/sign-in" replace/>
    }

    return (
        <>
        {children}
        </>
    )

}