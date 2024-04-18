"use client"

import { ResponseContext, UserDataContext, ModalContext, TokenContext } from "./auth_modal_structure";
import React, { useContext, useState } from "react";
import { Button } from "@nextui-org/react";
import { usePost } from "@/hooks/auth.jsx";

const CloseButton = () => {

    const setResponse = useContext(ResponseContext)["setResponse"]
    const response = useContext(ResponseContext)["response"]
    const close = useContext(ModalContext)["onClose"]

    const clear_response = () => { setResponse({ error : "", data : "" }); close() }

    return (
        <>
            <h1>{response.error}</h1>
            <Button color="danger" variant="flat" onPress={ () => { clear_response() } }> Close </Button>
        </>
    )
}


export const LogInButton = () => {
    const setResponse = useContext(ResponseContext)["setResponse"]
    const response = useContext(ResponseContext)["response"]
    const userData = useContext(UserDataContext)["userData"]
    const setToken = useContext(TokenContext)["setToken"]
    const close = useContext(ModalContext)["onClose"]

    const handleLogin = () => {
        usePost(setResponse, userData, 'http://localhost:3000/login')
        if (response.valid) {
            sessionStorage.setItem("token", response.data.token)
            setToken(response.data.token)
            close()
        }
    }

    return (
        <Button color="primary" onPress={ handleLogin }> Sign In </Button>
    )

}


export const SignUpButton = () => {
    const setResponse = useContext(ResponseContext)["setResponse"]
    const response = useContext(ResponseContext)["response"]
    const userData = useContext(UserDataContext)["userData"]
    const close = useContext(ModalContext)["onClose"]

    const handleLogin = () => {
        usePost(setResponse, userData, 'http://localhost:3000/addUser')
        if (response.valid) {
            close()
        }
    }

    return (
        <Button color="primary" onPress={ handleLogin }> Sign Up </Button>
    )

}

export const AuthModalSubmit = () => {
    const [ response, setResponse ] = useState({ error : "", data : "" })
    const AuthButton = useContext(ModalContext)["authButton"]

    return (
        <ResponseContext.Provider value = {{ response : response, setResponse : setResponse }}>
            <CloseButton/>
            <AuthButton/>
        </ResponseContext.Provider>
    )
}
