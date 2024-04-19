import React from "react";

import GatorideNavbar from "@/components/common/navbar";
import { CarDisplay } from "@/components/cars/car_display";

export default function Cars() {
  return (
    <div>
        <header >
            <GatorideNavbar/>
        </header> 
        <main>
            <div className="flex flex-col justify-center items-center" style={{backgroundImage:"url(images/background.jpg)", width:"100%", height:"100%", position:"fixed", bottom:0}}>
              <CarDisplay/>
            </div>
        </main>
    </div>
    );
}