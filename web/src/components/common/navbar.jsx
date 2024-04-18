"use client"


import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, User, Spinner } from "@nextui-org/react";
import { LogInModal, SignUpModal } from "@/components/auth_modal/auth_modal";
import { TokenContext } from "@/components/auth_modal/auth_modal_structure";
import { GatorLogo } from "@/components/home/gator_logo.jsx";
import React, { useContext, useState } from "react";
import { useGetAuthorized } from "../../hooks/auth";



const test = true

export default function GatorideNavbar() {
  const tokenLoaded = useContext(TokenContext).tokenLoaded
  
  
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <GatorLogo />
        <p className="font-bold text-inherit">GatoRide</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/cars" aria-current="page">
            Cars
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      { tokenLoaded ? <UserModal/> : <NavbarContent justify="end"><Spinner size="md" /></NavbarContent> }
    </Navbar>
  );
}

const AuthModal = () => {
  return (
    <NavbarContent justify="end">
      <NavbarItem>
          <LogInModal/>
      </NavbarItem>
      <NavbarItem>
          <SignUpModal/>
      </NavbarItem>
    </NavbarContent>
  )
}

const UserModal = () => {
  const token = useContext(TokenContext).token

  if( token == null )
    return <AuthModal/>
  else  
    return <LoggedModal/>
}

const LoggedModal = () => {
  const setToken = useContext(TokenContext).setToken
  const username = useContext(TokenContext).username
  const email = useContext(TokenContext).email

  const logOut = () => {
    sessionStorage.setItem("token", null)
    setToken(null)
  }

  return (
    <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-middle">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: false,
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              description={username}
              name={email}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" onAction={logOut}>
              <DropdownItem key="username" className="text-danger" color="danger"> Log Out </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
  )
}
