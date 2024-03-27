import React from "react";

import GatorideNavbar from "@/components/common/navbar";

import { ExampleCars } from "../components/home/example_cars";
import { DatePicker } from "../components/common/date_picker";
import { TitleCard } from "../components/home/title_card";

import { ScrollShadow, Spacer } from "@nextui-org/react";


export default function Home() {
  return (
    <div className="justify-items-center">
        <header >
            <GatorideNavbar/>
        </header> 
        <main>
            <div className="flex flex-col justify-center items-center" style={{backgroundImage:"url(images/background.jpg)", width:"100%", height:"100%", position:"fixed", bottom:0}}>
                <Spacer y={20}></Spacer>
                <TitleCard/>
                <Spacer y={16}></Spacer>
                <DatePicker/>
                <Spacer y={10}></Spacer>
                <ScrollShadow orientation="horizontal" className="max-w-4xl" offset="4">
                    <ExampleCars/>
                </ScrollShadow>
            </div>
        </main>
    </div>
    );
}
