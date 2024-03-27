"use client"

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { GatorLogo } from "@/components/home/gator_logo.jsx";
import { Login, SignUp } from "@/components/auth/auth_modal.jsx";

const test = false

export default function GatorideNavbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <GatorLogo />
        <p className="font-bold text-inherit">GatoRide</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
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
      { test ? 
      <NavbarContent justify="end">
        <NavbarItem>
            <Login/>
        </NavbarItem>
        <NavbarItem>
            <SignUp/>
        </NavbarItem>
      </NavbarContent>
      :
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">New file</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      }
      
      
    </Navbar>
  );
}
