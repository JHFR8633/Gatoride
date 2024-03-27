"use client"

import React from "react";
import {Card, CardBody, CardHeader, Input, Spacer, Button } from "@nextui-org/react";
import { useState, createContext, useContext } from "react";


const DateContext = createContext();

export const DatePicker = () => {
    const [ date, setDate ] = useState({ start : '', end : '' });

    return (
        <Card className="w-full max-w-lg flex flex-shrink items-center" style={{flexShrink:0}}>
            <CardHeader className="max-w-lg justify-center pb-1">
                <Button color="secondary" onPress={()=>{console.log( date )}} className="min-w-full">
                    Find Your Car Now!
                </Button>
            </CardHeader>
            <CardBody className="max-w-lg pb-4">
                <DateContext.Provider value={[ date, setDate ]}>
                    <DateInput/>
                </DateContext.Provider>
            </CardBody>
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


    return (
        <div className="flex flex-row">
            <Input
                type="date"
                label="Start Date"
                value={date["start"]}
                className="max-w-xs flex"
                onChange={handleDate("start")}
            />
            <Spacer x={4} />
            <Input
                type="date"
                label="End Date"
                value={date["end"]}
                className="max-w-xs flex"
                onChange={handleDate("end")}
            />
        </div>
    )
}