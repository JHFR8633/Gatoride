import React from "react";
import {Card, CardHeader, CardBody } from "@nextui-org/react";

// The title in the homepage
export const TitleCard = () => {
  return (
    <Card className="px-4 py-2 w-full max-w-5xl" isBlurred>
        <CardHeader className="flex-col items-center pb-0">
            <h1 className="text-2xl font-bold pb-4">Rent the Perfect Car</h1>
        </CardHeader>
        <CardBody className="overflow-visible pt-0 text-center">
            <p className="text-lg">Experience the freedom of the open road with out top-quality cars.</p>
        </CardBody>
    </Card>
  );
}
