import { useEffect, useState } from "react";

export const LoadingNumber = () => {
  const [randomNumber, setRandomNumber] = useState("0");

  useEffect(() => {
    setInterval(() => {
      const number: string = (parseFloat(Math.random().toFixed(5)) * 1000).toFixed(2) 
         
      setRandomNumber(number);
    }, 50);
  }, []);

  return <>{randomNumber}</>
};
