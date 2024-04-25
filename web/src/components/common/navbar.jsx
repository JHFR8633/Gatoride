"use client"

import {Navbar, Input, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Button, Dropdown, DropdownMenu, User, Spinner,  Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, useDisclosure } from "@nextui-org/react";
import { GatorLogo } from "@/components/home/gator_logo.jsx";
import React, { useContext, useState } from "react";
import { AuthModal, TokenContext } from "../auth_modal/modal";
import { editUser, createUser, editSelf } from "../../hooks/auth";
import { createCar, deleteCar, editCar } from "../../hooks/cars";
import { createReservation } from "../../hooks/reservations";


// The nav bar shown in all pages


export default function GatorideNavbar() {
  const tokenLoaded = useContext(TokenContext).tokenLoaded
  
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <GatorLogo />
        <Link className="font-bold text-inherit" href="/" aria-current="page">
            Gatoride
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/cars" aria-current="page">
            Cars
          </Link>
        </NavbarItem>
      </NavbarContent>
      { tokenLoaded ? <UserModal/> : <NavbarContent justify="end"><Spinner size="md" /></NavbarContent> }
    </Navbar>
  );
}

const AuthModals = () => {
  return (
    <NavbarContent justify="end">
      <NavbarItem>
          <AuthModal login={true}/>
      </NavbarItem>
      <NavbarItem>
          <AuthModal login={false}/>
      </NavbarItem>
    </NavbarContent>
  )
}

const UserModal = () => {
  const token = useContext(TokenContext).token

  if( token )
    return <LoggedModal/>
  else  
    return <AuthModals/>
}


const DropData = ({ data, token, handleAction }) => {

  if ( data == null ) return (
    <></>
  )

  if ( data.role == "admin" ) return (
    <DropdownMenu aria-label="Static Actions" onAction={( key ) => { handleAction( key ) }}>
      <DropdownItem key="quit" className="text-danger" color="danger"> Log Out </DropdownItem>
      <DropdownItem key="reservations" href="/rental"> My Reservations </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <SelfModal token={token} data={data} /> </DropdownItem>
    
      <DropdownItem key="reservations" href="/reservations"> View All Reservations </DropdownItem>
      <DropdownItem key="users" href="/users"> View All Users </DropdownItem>
      <DropdownItem key="employee" href="/employee"> View Local Cars </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <EditModal token={token} data={data} /> </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <CreateModal token={token} data={data} /> </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <ReservationModal token={token} data={data} /> </DropdownItem>

      <DropdownItem key="admin" href="/admin"> View All Cars </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <CarModal token={token} data={data} /> </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <DeleteModal token={token} data={data} /> </DropdownItem>
    </DropdownMenu>
  )

  if ( data.role == "employee" ) return (
    <DropdownMenu aria-label="Static Actions" onAction={( key ) => { handleAction( key ) }}>
      <DropdownItem key="quit" className="text-danger" color="danger"> Log Out </DropdownItem>
      <DropdownItem key="reservations" href="/rental"> My Reservations </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <SelfModal token={token} data={data} /> </DropdownItem>
    
      <DropdownItem key="reservations" href="/reservations"> View All Reservations </DropdownItem>
      <DropdownItem key="users" href="/users"> View All Users </DropdownItem>
      <DropdownItem key="employee" href="/employee"> View Local Cars </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <EditModal token={token} data={data} /> </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <CreateModal token={token} data={data} /> </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <ReservationModal token={token} data={data} /> </DropdownItem>
    </DropdownMenu>
  )

  if ( data.role == "client" ) return (
    <DropdownMenu aria-label="Static Actions" onAction={( key ) => { handleAction( key ) }}>
      <DropdownItem key="quit" className="text-danger" color="danger"> Log Out </DropdownItem>
      <DropdownItem key="reservations" href="/rental"> My Reservations </DropdownItem>
      <DropdownItem key="edit" className="justify-content-center"> <SelfModal token={token} data={data} /> </DropdownItem>
    </DropdownMenu>
  )
}

// for logged users
const LoggedModal = () => {
  const token = useContext(TokenContext).token
  const setToken = useContext( TokenContext ).setToken
  const data = useContext( TokenContext ).data

  const logOut = () => {
    sessionStorage.setItem("token", null)
    setToken(null)
  }

  const handleAction = ( key_ ) => {
    if ( key_ == "quit") logOut()
  }

  return (
    <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-middle" closeOnSelect={false}>
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: false,
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              description={data.email}
              name={data.username}
            />
          </DropdownTrigger>
          <DropData data = { data } token = { token } handleAction = { handleAction }/>
        </Dropdown>           
      </NavbarContent>
      
  )
}

const handleJson = ( data, set, key ) => {
  return (
      ( value ) => {
          set( { ...data, [key]: value } );
      }
  )
};


// for editing entries
const EditModal = ({ token, data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ message, setMessage ] = useState(null)
  const [ value, setValue ] = useState(null)
  const [ fields, setFields ] = useState([])
  const [ field, setField ] = useState([])
  const [ type, setType ] = useState(null)
  const [ ID, setID ] = useState(null)


  const handleType = ( key ) => {
    setType( key )

    console.log( key )

    if( key == "user") {
      setFields([
        "email", "username", "password", "location", "role"
      ])
    }
    else {
      setFields([
        "location", "make", "model", "type", "mileage", "day", "mile", "status"
      ])
    }

    setField( null )
  }

  const handle = ( token, field, value, ID ) => {
    if( type == "user") {
      editUser( token, field, value, ID )
      .then( ( data ) => { setMessage( data ) })
      .catch( ( error ) => { setMessage( error ) })
    }
    else {
      editCar( token, field, value, ID )
      .then( ( data ) => { setMessage( data ) })
      .catch( ( error ) => { setMessage( error ) })
    }
  }

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat"> Edit Entry </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Edit Data</ModalHeader>
          <ModalBody className="grid grid-col-2">
              <b>Type</b>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                    className="capitalize"
                  >
                    {type}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Single selection example"
                  variant="flat"
                  placeholder="Enter the ID of the object to be changed"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={type}
                  onSelectionChange={( key ) => { handleType(key.currentKey) } }
                >
                  { data.role == 'admin' && <DropdownItem key="user">user</DropdownItem> }
                  <DropdownItem key="car">car</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Input
                  autoFocus
                  placeholder="Enter the ID of the object to be changed"
                  variant="bordered"
                  value={ID}
                  onValueChange={setID}
              />
              <b>Field</b>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                    className="capitalize"
                  >
                    { field }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={ field }
                  onSelectionChange={ (key) => { setField( key.currentKey ) } }
                >
                  { fields.map( ( key ) => (
                    <DropdownItem key={key} >{key}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Input
                  autoFocus
                  placeholder="Enter the new value"
                  variant="bordered"
                  value={value}
                  onValueChange={setValue}
              />
          </ModalBody>
          <ModalFooter>
            <h1> { message } </h1>
            <Button color="primary" onPress={ () => { handle( token, field, value, ID )  }} > 
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

// for creating cars
const CarModal = ({ token, data }) => {
  const [ carData, setCarData ] = useState({ location : '', make : '', model : '', type : '', mileage : '', day : ''})
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ message, setMessage ] = useState(null)


  const hanldeCar = ( carData ) => {
    createCar( token, carData )
      .then( ( data ) => { setMessage( data ) })
      .catch( ( error ) => { setMessage( error ) })
  }

  const inputs = [
    "location", "make", "model", "type", "mileage", "day", "mile"
  ]

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat"> Create Car </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Create Car</ModalHeader>
          <ModalBody className="grid grid-col-2">

            { inputs.map( ( key ) => (
                    <Input
                    autoFocus
                    label={key}
                    placeholder={`Enter ${key}`}
                    variant="bordered"
                    value={carData[key]}
                    onValueChange={handleJson(carData, setCarData, key)}
                    />
            ) ) }
          </ModalBody>
          <ModalFooter>
            <h1> { message } </h1>
            <Button color="primary" onPress={ () => { hanldeCar( carData ) }} > 
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </>
  )
}

// for creating accounts
const CreateModal = ({ token, data }) => {
  const [ userData, setUserData ] = useState({ email : "", password : "", username : "" })
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ message, setMessage ] = useState(null)


  const hanldeUser = ( userData ) => {
    createUser( token, userData )
    .then( ( data ) => { setMessage( data ) })
    .catch( ( error ) => { setMessage( error ) })
  }

  const inputs = data.role == "admin" ? 
  [ "email", "password", "username", "role", "location" ]
  :
  [ "email", "password", "username" ]

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat"> Create User </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader> Create User </ModalHeader>
          <ModalBody className="grid grid-col-2">

            { inputs.map( ( key ) => (
                    <Input
                    autoFocus
                    label={key}
                    placeholder={`Enter ${key}`}
                    variant="bordered"
                    value={userData[key]}
                    onValueChange={handleJson(userData, setUserData, key)}
                    />
            ) ) }
          </ModalBody>
          <ModalFooter>
            <h1> { message } </h1>
            <Button color="primary" onPress={ () => { hanldeUser( userData ) }} > 
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </>
  )
}

// for deleting cars
const DeleteModal = ({ token }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ userData, setUserData ] = useState({ id : "" })
  const [ message, setMessage ] = useState(null)


  const handleDelete = ( userData ) => {
    deleteCar( token, userData )
    .then( ( data ) => { setMessage( data ) })
    .catch( ( error ) => { setMessage( error ) })
  }


  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat"> Delete Car </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader> Delete Car </ModalHeader>
          <ModalBody className="grid grid-col-2">
            <Input
            autoFocus
            label={"Car ID"}
            placeholder={`Enter Car ID`}
            variant="bordered"
            value={userData["id"]}
            onValueChange={handleJson(userData, setUserData, "id")}
            />
          </ModalBody>
          <ModalFooter>
            <h1> { message } </h1>
            <Button color="primary" onPress={ () => { handleDelete( userData ) }} > 
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </>
  )
}

// for creating reservations
const ReservationModal = ({ token, data }) => {
  const [ userData, setUserData ] = useState({ car_id : "", user_id : "", start : "", end : "" })
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ message, setMessage ] = useState(null)

  const handleDate = ( range ) => {
    return (
        (e) => {
            setUserData({ ...userData, [range]: e.target.value });
        }
    )
};

  const handleReservation = ( userData ) => {
    createReservation( token, userData )
    .then( ( data ) => { setMessage( data ) })
    .catch( ( error ) => { setMessage( error ) })
  }


  const inputs = [ "car_id", "user_id", "start", "end" ]


  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat"> Create Reservation </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Create Reservation</ModalHeader>
          <ModalBody className="grid grid-col-2">
            <Input
              autoFocus
              label={"Car ID"}
              placeholder={`Enter Car ID`}
              variant="bordered"
              value={userData["car_id"]}
              onValueChange={handleJson(userData, setUserData, "car_id")}
            />
            <Input
              autoFocus
              label={"User ID"}
              placeholder={`Enter User ID`}
              variant="bordered"
              value={userData["user_id"]}
              onValueChange={handleJson(userData, setUserData, "user_id")}
            />
            <Input
                type="date"
                label="Start Date"
                value={userData["start"]}
                className="max-w-xs flex"
                onChange={handleDate("start")}
            />
            <Input
                type="date"
                label="End Date"
                value={userData["end"]}
                className="max-w-xs flex"
                onChange={handleDate("end")}
            />
          </ModalBody>
          <ModalFooter>
            <h1> { message } </h1>
            <Button color="primary" onPress={ () => { handleReservation( userData ) }} > 
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </>
  )
}

// for editing own info
const SelfModal = ({ token }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ message, setMessage ] = useState(null)
  const [ value, setValue ] = useState(null)
  const [ field, setField ] = useState([])

  const fields = ["email", "username", "password"]

  const handle = ( token, field, value ) => {
    editSelf( token, field, value )
    .then( ( data ) => { setMessage( data ) })
    .catch( ( error ) => { setMessage( error ) })
  }

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat"> Edit My Info </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Edit Data</ModalHeader>
          <ModalBody className="grid grid-col-2">
              <b>Field</b>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                    className="capitalize"
                  >
                    { field }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={ field }
                  onSelectionChange={ (key) => { setField( key.currentKey ) } }
                >
                  { fields.map( ( key ) => (
                    <DropdownItem key={key} >{key}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Input
                  autoFocus
                  placeholder="Enter the new value"
                  variant="bordered"
                  value={value}
                  onValueChange={setValue}
              />
          </ModalBody>
          <ModalFooter>
            <h1> { message } </h1>
            <Button color="primary" onPress={ () => { handle( token, field, value )  }} > 
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}