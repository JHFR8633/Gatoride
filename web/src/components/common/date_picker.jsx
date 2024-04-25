"use client"

import React from "react";
import {Card, CardBody, CardHeader, CardFooter, Input, Spacer, Button, Link } from "@nextui-org/react";
import { useState, createContext, useContext } from "react";
import { dateRequest } from "../../hooks/cars";


const DateContext = createContext();


// Components for choosing the date


// Home Page
export const DatePicker = () => {
    const [ dates, setDates ] = useState({ start : null, end : null });

    return (
        <Card className="w-full max-w-lg flex flex-shrink items-center" style={{ flexShrink:0 }}>
            <CardHeader className="max-w-lg justify-center pb-1">
                <Button color="secondary" as={ Link } className="min-w-full" href={`/cars?start=${dates.start}&end=${dates.end}`}>
                    Find Your Car Now!
                </Button>
            </CardHeader>
            <CardBody className="max-w-lg pb-4">
                <DateContext.Provider value={[ dates, setDates ]}>
                    <DateInput/>
                </DateContext.Provider>
            </CardBody>
        </Card>
    )
}

// Cars Page
export const DatePickerCars = ({ setData, syncDates, start = null, end = null }) => {
    const [ dates, setDates ] = useState({ start : start, end : end });

    const handleDate = () => {
           dateRequest( dates )
           .then( data => { setData( data ); syncDates(dates) })
           .catch( error => console.error( error ))
    }

    return (
        <Card className="w-full max-w-lg flex flex-shrink items-center" style={{flexShrink:0}}>
            <CardBody className="max-w-lg pb-1">
                <DateContext.Provider value={[ dates, setDates ]}>
                    <DateInput/>
                </DateContext.Provider>
            </CardBody>
            <CardFooter className="max-w-lg justify-center pb-4">
                <Button color="secondary" onPress={handleDate} className="min-w-full">
                    Find Available Cars
                </Button>
            </CardFooter>
        </Card>
    )
}

const DateInput = () => {
    const [ date, setDate ] = useContext(DateContext)

    const handleDate = (range) => {
        return (
            (e) => {
                setDate({ ...date, [range]: e.target.value });
            }
        )
    };

    const start = date["start"] ? date["start"] : ''
    const end = date["end"] ? date["end"] : ''

    return (
        <div className="flex flex-row">
            <Input
                type="date"
                label="Start Date"
                value={ start }
                className="max-w-xs flex"
                onChange={handleDate("start")}
            />
            <Spacer x={4} />
            <Input
                type="date"
                label="End Date"
                value={ end }
                className="max-w-xs flex"
                onChange={handleDate("end")}
            />
        </div>
    )
}