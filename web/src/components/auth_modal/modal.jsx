"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import React, { useState, useContext, createContext } from "react";
import { logInRequest, singUpRequest } from "../../hooks/auth";

export const TokenContext = createContext();

const handleJson = ( data, set, key ) => {
    return (
        ( value ) => {
            set( { ...data, [key]: value } );
        }
    )
};

export const AuthModal = ({ login }) => {
    const [ userData, setUserData ] = useState({ email : "", password : "", username : "" })
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const setToken = useContext( TokenContext )["setToken"]
    const setData = useContext( TokenContext )["setData"]
    const [ error, setError ] = useState( null )
    const text = login ? "Log In" : "Sign Up"

    const reset_data = () => {
        setUserData({ email : "", password : "", username : "" })
    }

    return (
      <>
        <Button onPress={onOpen} color="primary" variant="flat">{ text }</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            { ( onClose ) => ( 
                <>
                    <ModalHeader className="flex flex-col gap-1"> 
                    { text }
                    </ModalHeader>
                    <ModalBody>
                        { !login && 
                        <Input
                        autoFocus
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        value={userData["email"]}
                        onValueChange={handleJson(userData, setUserData, "email")}
                        />
                        }
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
                    </ModalBody>
                    <ModalFooter>
                        <h1> {error} </h1>
                        <Button color="danger" variant="flat" onPress={ () => {
                            setError( null )
                            reset_data()
                            onClose()
                        } }> Close </Button>
                        { login ? 
                        <Button color="primary" onPress={ () => {
                            logInRequest( userData )
                            .then( ( data ) => {
                                console.log( data.user )
                                sessionStorage.setItem( "token", data.token )
                                setToken( data.token )
                                setData( data.user )
                                setError( null )
                                reset_data()
                                onClose()
                            } )
                            .catch( ( error ) => { setError( error )})
                        } }> Sign In </Button>
                        : 
                        <Button color="primary" onPress={ () => {
                            singUpRequest( userData )
                            .then( ( data ) => {
                                setError( null )
                                reset_data()
                                onClose()
                            } )
                            .catch( ( error ) => { setError( error )})
                        } }> Sign Up </Button>
                        }
                    </ModalFooter>
                </>
            ) }
          </ModalContent>
        </Modal>
      </>
    );
}
