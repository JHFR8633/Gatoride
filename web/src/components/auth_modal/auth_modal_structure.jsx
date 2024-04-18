"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React, { createContext, useContext, useState } from "react";


export const ResponseContext = createContext();
export const UserDataContext = createContext();
export const ModalContext = createContext();
export const TokenContext = createContext();

export const Auth = ({ buttonText, Content = AuthModalLogin }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    return (
      <>
        <Button onPress={onOpen} color="primary" variant="flat">{ buttonText }</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => ( <Content onClose = { onClose } /> )}
          </ModalContent>
        </Modal>
      </>
    );
}


export const AuthModalContent = () => {
    const [ userData, setUserData ] = useState({ email : "", password : "", username : "" })

    const Footer = useContext(ModalContext)["footer"]
    const Body = useContext(ModalContext)["body"]
    
    return(
        <UserDataContext.Provider value={{ userData : userData, setUserData : setUserData }}>
            <ModalHeader className="flex flex-col gap-1"> 
                {useContext(ModalContext)["title"]}
            </ModalHeader>
            <ModalBody>
                <Body/>
            </ModalBody>
            <ModalFooter>
                <Footer/>
            </ModalFooter>
        </UserDataContext.Provider> 
    )
}

