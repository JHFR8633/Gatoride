import React from "react";

import GatorideNavbar from "@/components/common/navbar";
import { CarDisplay } from "@/components/cars/users_display";

export default function Employee() {
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
