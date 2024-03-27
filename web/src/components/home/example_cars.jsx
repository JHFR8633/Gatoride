import React from "react";

import { CarCard } from "./car_card";
import { sport, SUV, economy, eletric } from "./car_images";
import {Spacer} from "@nextui-org/react";

export const ExampleCars = () => {
    return (
        <div className="flex justify-start">
            <CarCard type="Sports" img={sport}>
                <p>These are fast!</p>
            </CarCard>
            <CarCard type="SUVs" img={SUV}>
                <p className="justify-center">These are not so fast!</p>
            </CarCard>
            <CarCard type="Economy" img={economy}>
                <p className="justify-center">These are slower!</p>
            </CarCard>
            <CarCard type="Eletric" img={eletric}>
                <p className="justify-center">These are eletric!</p>
            </CarCard>
            <Spacer y={4}></Spacer>
        </div>
    )
}