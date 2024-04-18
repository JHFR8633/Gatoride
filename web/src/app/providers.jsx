// app/providers.tsx
'use client'


import { TokenContext } from '@/components/auth_modal/auth_modal_structure';
import React, { useState, useEffect } from "react";
import {NextUIProvider} from '@nextui-org/react';
import { useGetAuthorized } from "@/hooks/auth";
import "@/tailwind/output.css"


export function Providers({children}) {
  const [ tokenLoaded, setTokenLoaded ] = useState(false)
  const [ username, setUsername ] = useState(null)
  const [ email, setEmail ] = useState(null)
  const [ token, setToken ] = useState(null)

  useEffect(() => {
    const fetchTokenFromSessionStorage = () => {
      const storedToken = sessionStorage.getItem('token');

      if (storedToken) {
        useGetAuthorized( setToken, setTokenLoaded, setUsername, setEmail, "http://localhost:3000/login/protected", storedToken )
      }
      else {
        setToken(null)
        setEmail(null)
        setUsername(null)
        setTokenLoaded(true)
      }
    };

    fetchTokenFromSessionStorage();
  }, []);

  return (
    <NextUIProvider>
      <TokenContext.Provider value={{ token : token, setToken : setToken, tokenLoaded : tokenLoaded, setTokenLoaded : setTokenLoaded, email : email, username : username }}>
        {children}
      </TokenContext.Provider>
    </NextUIProvider>
  )
}