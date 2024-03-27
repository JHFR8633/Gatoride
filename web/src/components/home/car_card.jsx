import React from "react";
import {Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";


export const CarCard = ({ img="", type="SUV", children }) => {
  return (
    <Card className="py-4 m-4 p-4 flex-shrink-0">
      <CardHeader className="pb-2 pt-2 px-4 flex-col items-center">
        <h1 className="text-big font-bold pb-4">{type}</h1>
        <Image
            alt="Card background"
            className="object-cover rounded-xl pb-4"
            src={img}
            width="200px"
            height="auto"
        />
        <Divider className="my-4" />
        </CardHeader>
        <CardBody className="overflow-visible py-2 text-center">
                {children}
        </CardBody>
    </Card>
  );
}
