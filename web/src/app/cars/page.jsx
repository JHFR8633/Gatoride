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
            <div className="flex flex-col justify-center items-center bg-gradient-to-b from-orange-100 to-orange-400">
              <CarDisplay/>
            </div>
        </main>
    </div>
    );
}
