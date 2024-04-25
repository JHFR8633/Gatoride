"use client"

import React, { useState, useEffect, useContext } from "react";
import {Card, CardBody, CardFooter, Image, Spinner, Spacer, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure, Button } from "@nextui-org/react";
import { DatePickerCars } from "../common/date_picker";
import { dateRequest } from "../../hooks/cars";
import { useSearchParams } from 'next/navigation'
import { TokenContext } from "../auth_modal/modal";
import { reservationRequest } from "../../hooks/reservations";

// show available cars with date picker
export const CarDisplay = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = useContext( TokenContext ).token
  const query  = useSearchParams()

  const [ empty, setEmpty ] = useState(false)
  const [ dates, setDates ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ data, setData ] = useState(null)
  const [ car, setCar ] = useState(null)

  const pullCars = () => {
    dateRequest( dates )
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
      if ( query ) setDates({ start : query.start, end : query.end })
      else return 
      pullCars()
  }, []);

  const handleClick = ( close ) => {
    reservationRequest( dates, car, token )
    .then( data => { pullCars(); close() })
    .catch( error => setError(error));
  }

  const openModal = ( car ) => {
    setError( null )
    setCar( car )
    onOpen()
  }

  return (
    <>
      <Spacer y={14}></Spacer>
      <DatePickerCars setData={setData} syncDates={ setDates }/>
      <Spacer y={6}></Spacer>
      <div className="grid grid-cols-7 gap-3 m-10">
        { empty ?
        <>
          { data === null ?
            <>
              <Spacer y={200} className="col-span-7"></Spacer>
            <h1 className="col-span-7" style={{"color" : "#000000"}}>No Cars</h1>
            </>
            :
            data.map( ( item, index ) => (
              <CarCard item = { item } index = { index } handleClick = { openModal }/>
            ))
          }
        </>
        :
        <>
          <Spacer y={200} className="col-span-7"></Spacer>
          <Spinner className="col-span-7" size="lg" />
        </> 
        }
        <Spacer y={800} className="col-span-7"></Spacer>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <PaymentModal token = { token } handleClick={ handleClick } error={error}/>
      </Modal>
    </>
    
  );
}

const CarCard = ({ item, handleClick }) => {
  return (
    <Card className="w-60 h-70" shadow="sm" key={ item.make } isPressable onPress={ () => { handleClick( item.id ) }}>
        <CardBody>
          <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={ item.id }
              className="w-full object-cover h-[200px]"
              src={`http://localhost:4000/1`}
            />
        </CardBody>
        <CardFooter className="grid grid-cols-2 text-small justify-start">
          <b> Type { item.type } </b>
          <p> Model { item.model } </p>
          <b> Make { item.make } </b>
          <p> Location { item.location } </p>
          <b> Per Day { item.day } </b>
          <p> Per Mile { item.mile } </p>
          <b> Mileage { item.mileage } </b>
          <p> ID { item.id } </p>
        </CardFooter>
    </Card>
  )
}

const PaymentModal = ({ token, handleClick, error }) => {
  return (
    <ModalContent>
      { ( onClose ) => (
        <>
          { token ? 
          <>
            <ModalHeader>Pay Here</ModalHeader>
            <ModalFooter>
              <h1> {error} </h1>
              <Button color="primary" onPress={ () => { handleClick(onClose) }} > 
                Confirm
              </Button>
            </ModalFooter>
          </>
          : 
          <ModalHeader>Please Log In</ModalHeader>
          }
        </>
      ) }
    </ModalContent>
  )
}