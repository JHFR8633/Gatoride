"use client"

import React, { useState, useEffect } from "react";
import {Card, CardBody, CardFooter, Image, Spinner} from "@nextui-org/react";

export const CarDisplay = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/getcars')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-6 max-w-5xl">
      { data === null ?
      <Spinner size="lg" />
      :
      data.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.id}
              className="w-full object-cover h-[500px]"
              src={`http://localhost:4000/${index+1}`}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.make}</b>
            <p className="text-default-500">{item.model}</p>
          </CardFooter>
        </Card>
      ))
      }
    </div>
  );
}
