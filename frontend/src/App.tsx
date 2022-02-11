import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { QuotesSection } from "./components/QuotesSection";

const App = () => {
  return (
    <>
      <Box>
        <Nav />

        <Box px={8} my={200} mx="auto">
          <Hero />
        </Box>

        <Box
          bg={useColorModeValue(
            "linear-gradient(to bottom right, transparent, transparent 50%,#5248bb 50%, #5248bb)",
            "linear-gradient(to bottom right, transparent, transparent 50%,#272162 50%, #272162)"
          )}
          style={{
            height: "125px",
            marginTop: "calc(100px * -1)",
          }}
        />
        <QuotesSection />
      </Box>
      {/* <Box bg="white" p={10}>
        <Heading>Promedio</Heading>
        <Text>Compra: {average.average_buy_price}</Text>
        <Text>Venta: {average.average_sell_price}</Text>

        <Heading>{lastUpdate}</Heading>
      </Box> */}
    </>
  );
};

export default App;
