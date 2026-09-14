import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <SignIn />
        </div>
    );
}

export default SignInPage;