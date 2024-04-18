"use client"

import { UserDataContext } from "./auth_modal_structure";
import React, { useContext } from "react";
import { Input } from "@nextui-org/react";

const handleJson = (data, set, key) => {
    return (
        (value) => {
            set({ ...data, [key]: value });
        }
    )
};


export const UserDataInput = () => {
    const setUserData = useContext(UserDataContext)["setUserData"]
    const userData = useContext(UserDataContext)["userData"]

    return (
        <>
            <Input
                autoFocus
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
                value={userData["username"]}
                onValueChange={handleJson(userData, setUserData, "username")}
            />
            <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                value={userData["password"]}
                onValueChange={handleJson(userData, setUserData, "password")}  
            />
        </>
    )
}

export const UserDataInputEmail = () => {
    const setUserData = useContext(UserDataContext)["setUserData"]
    const userData = useContext(UserDataContext)["userData"]

    return (
        <>
            <Input
                autoFocus
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                value={userData["email"]}
                onValueChange={handleJson(userData, setUserData, "email")}
            />
            <UserDataInput/>  
        </>
    )
}

