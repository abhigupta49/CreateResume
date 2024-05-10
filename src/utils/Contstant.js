import {FaGoogle,FaGithub} from "react-icons/fa6"

export const AuthButton = {
    Google: {
        Icon: FaGoogle,
        label: "Signin with Google",
        provider: "GoogleAuthProvider"
    },
    Github:
    {
        Icon: FaGithub,
        label: "Signin with Github",
        provider: "GitHubAuthProvider"
    }
}