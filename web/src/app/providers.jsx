// app/providers.tsx
'use client'


import { TokenContext } from '@/components/auth_modal/modal';
import React, { useState, useEffect } from "react";
import {NextUIProvider} from '@nextui-org/react';
import { tokenRequest } from "@/hooks/auth";
import "@/tailwind/output.css"


export function Providers({children}) {
  const [ tokenLoaded, setTokenLoaded ] = useState( false )
  const [ token, setToken ] = useState( null )
  const [ data, setData ] = useState( null )
  
  useEffect(() => {
      const storedToken = sessionStorage.getItem('token');

      if ( storedToken === null ) { 
        setData({ username : '', email : '', role : '', id : ''})
        setTokenLoaded( true )
        setToken( null ); 
      }

      else {
        tokenRequest( storedToken, setToken )
        .then( ( data ) => { setToken( storedToken ); setData( data )})
        .catch( () => { console.error( "Invalid Token" )})
        setTokenLoaded( true )
      }
  }, []);

  return (
    <NextUIProvider>
      <TokenContext.Provider value={{ token : token, setToken : setToken, data : data, setData : setData, tokenLoaded : tokenLoaded }}>
        {children}
      </TokenContext.Provider>
    </NextUIProvider>
  )
}