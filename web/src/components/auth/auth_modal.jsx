"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import React, { createContext, useContext, useState, useRef } from "react";

import { handleLogin, handleSignUp } from "./handle_auth";

const UserContext = createContext();

const authDebug = (json) => {
    json["post"](json["get"])
}

const handleJson = (data, set, key) => {
    return (
        (value) => {
            set({ ...data, [key]: value });
        }
    )
};

export const Login = () => {
    return (
        <Auth button="Login" title="Log in" authButton="Sign In" onAuth={handleLogin}>
            <AuthInfo/>
            <RememberMe/>
        </Auth>
    )
}

export const SignUp = () => {
    return (
        <Auth button="Sign Up" title="Sign up" authButton="Sign Up" onAuth={handleSignUp}>
            <EmailInput/>
            <AuthInfo/>
        </Auth>
    )
}

export const Auth = ({ button, title, authButton, onAuth, children, url}) => {
  const [ user, setUser ] = useState({ email : "", password : "", username : "" });
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [response, setResponse] = useState(null);
  const remember = useRef(false)

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat">{button}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <UserContext.Provider value={{ close : onClose, setUser : setUser, user : user, remember : remember, response : response, setResponse : setResponse }}>
                <ModalHeader className="flex flex-col gap-1">
                    {title}
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <AuthSubmit 
                        type={authButton} 
                        onPress={onAuth}
                    />
                </ModalFooter>
            </UserContext.Provider>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const AuthInfo = () => {
    const setUser = useContext(UserContext)["setUser"]
    const user = useContext(UserContext)["user"]

    return (
        <>
            <Input
            autoFocus
            label="Username"
            placeholder="Enter your username"
            variant="bordered"
            value={user["username"]}
            onValueChange={handleJson(user, setUser, "username")}
            />
            <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                value={user["password"]}
                onValueChange={handleJson(user, setUser, "password")}
                
            />
        </>
    )
}

const RememberMe = () => {
    const remember = useContext(UserContext)["remember"]

    return (
        <div className="flex py-2 px-1 justify-between">
            <Checkbox classNames={{ label: "text-small" }} onValueChange={(value) => {remember.current = value}}>
                Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
                Forgot password?
            </Link>
        </div>
    )
}

const AuthSubmit = ({ type="Sign In", onPress={authDebug}}) => {
    const setResponse = useContext(UserContext)["setResponse"]
    const close = useContext(UserContext)["close"] 
    const data = useContext(UserContext)["user"]

    return (
        <>
            <Button color="danger" variant="flat" onPress={ close }>
                Close
            </Button>
            <Button color="primary" onPress={() => { onPress(setResponse, data) }}>
                {type}
            </Button>
        </>
    )
}

const EmailInput = () => {
    const setUser = useContext(UserContext)["setUser"]
    const user = useContext(UserContext)["user"]

    return (
        <Input
            autoFocus
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            value={user["email"]}
            onValueChange={handleJson(user, setUser, "email")}
        />
    )
}