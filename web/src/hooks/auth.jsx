"use client"

import React, { useEffect, useState } from 'react';

const GetRequestComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/getcars')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Perform a GET Request</h2>
      <p>{data ? JSON.stringify(data) : 'Loading...'}</p>
    </div>
  );
};

export default GetRequestComponent;