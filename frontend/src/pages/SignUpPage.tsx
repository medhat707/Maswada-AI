import { SignUp } from "@clerk/clerk-react"

function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <SignUp />
        </div>
    );
}

export default SignUpPage;