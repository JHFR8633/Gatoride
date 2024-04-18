"use client"

import { AuthModalSubmit, LogInButton, SignUpButton } from "./auth_modal_buttons";
import { ModalContext, Auth, AuthModalContent } from "./auth_modal_structure";
import { UserDataInput, UserDataInputEmail } from "./auth_modal_input";

const AuthModalLogIn = ({ onClose }) => {

    const ModalParameters = { 
        footer : AuthModalSubmit, 
        body : UserDataInput, 
        title : "Log In", 
        onClose : onClose,
        authButton : LogInButton
    }

    return(
        <ModalContext.Provider value={ModalParameters}>
            <AuthModalContent/>
        </ModalContext.Provider>
    )
}

const AuthModalSignUp= ({ onClose }) => {

    const ModalParameters = { 
        footer : AuthModalSubmit, 
        body : UserDataInputEmail, 
        title : "Sign Up", 
        onClose : onClose,
        authButton : SignUpButton
    }

    return(
        <ModalContext.Provider value={ModalParameters}>
            <AuthModalContent/>
        </ModalContext.Provider>
    )
}

export const LogInModal = () => { return ( <Auth buttonText="Log In" Content={AuthModalLogIn}/> ) }
export const SignUpModal = () => { return ( <Auth buttonText="Sign Up" Content={AuthModalSignUp}/> ) }


















