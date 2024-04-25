"use client"

import React, { useState, useEffect, useContext } from "react";
import {Card, CardBody, CardFooter, Image, Spinner, Spacer } from "@nextui-org/react";
import { reservationListRequest } from "../../hooks/reservations";
import { TokenContext } from "../auth_modal/modal";

// show all reservations
export const CarDisplay = () => {
  const token = useContext( TokenContext ).token

  const [ empty, setEmpty ] = useState(false)
  const [ data, setData ] = useState(null)

  const pullCars = () => {
    reservationListRequest( token )
    .then( data => {
      if ( data ) setData( data )
      setEmpty( true )
    } )
    .catch( () => {
      setEmpty( true )
      setData( null )
    } );
  }

  useEffect(() => {
      pullCars()
  }, [ token ]);

  return (
    <div className="grid grid-cols-7 gap-3 m-10">
    <Spacer y={200} className="col-span-7"></Spacer>
    { empty ?
    <>
        { data === null ?
        <h1 className="col-span-7" style={{"color" : "#000000"}}>No Reservations</h1>
        :
        data.map( ( item, index ) => (
            <CarCard item = { item } index = { index } />
        ))
        }
    </>
    :
    <Spinner className="col-span-7" size="lg" />
    }
    <Spacer y={800} className="col-span-7"></Spacer>
    </div>
  );
}

const CarCard = ({ item }) => {
    return (
      <Card className="w-60 h-70" shadow="sm" key={ item.username } isPressable >
          <CardFooter className="grid grid-cols-2 text-small justify-start">
          <p> Reservation ID = { item.id } </p>
          <p> Car ID = { item.car_id } </p>
          <p> Start = { item.start } </p>
          <p> End = { item.end } </p>
          </CardFooter>
      </Card>
    )
  }
