import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { server } from "./config";

const QuoteCard = ({ name, imgURL }) => {
  return (
    <Box
      h={300}
      bg={useColorModeValue(
        "linear-gradient(130.03deg ,rgba(185, 160, 246, 0.7) 27.17%,rgba(151, 185, 166, 0.7) 85.87%)",
        "linear-gradient(130.03deg, rgb(0 35 54 / 60%) 27.17%, rgb(52 10 20 / 70%) 85.87%)"
      )}
      style={{ backdropFilter: "blur(10px)" }}
      rounded="lg"
      mt={-150}
      mb={150}
      p={6}
    >
      <Image w="15%" my={4} borderRadius={"full"} shadow="sm" src={imgURL} />

      <Heading size="lg" color={useColorModeValue("gray.800", "gray.300")}>
        {name}
      </Heading>

      <Box mt={5}>
        <HStack gap={6}>
          <Stat p={2} style={{ backdropFilter: "blur(100px)" }} rounded="lg">
            <StatLabel color={useColorModeValue("gray.800", "gray.300")}>
              Compra
            </StatLabel>
            <StatNumber color={useColorModeValue("gray.800", "gray.300")}>
              $200.00
            </StatNumber>
          </Stat>

          <Stat p={2} style={{ backdropFilter: "blur(100px)" }} rounded="lg">
            <StatLabel color={useColorModeValue("gray.800", "gray.300")}>
              Venta
            </StatLabel>
            <StatNumber color={useColorModeValue("gray.800", "gray.300")}>
              $200.00
            </StatNumber>
          </Stat>
        </HStack>
      </Box>
    </Box>
  );
};

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [averages, setAverages] = useState([]);
  const [slippages, setSlippages] = useState([]);
  const [fullPrices, setFullPrices] = useState([]);

  const getData = (endpoint) =>
    fetch(server + endpoint).then((res) => res.json());

  useEffect(() => {
    setInterval(() => {
      getData("quotes").then((res) => setQuotes(res));
      getData("average").then((res) => setAverages(res));
      getData("slippage").then((res) => setSlippages(res));
    }, 15000);
  }, []);

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

        <Box
          bg={useColorModeValue(
            "linear-gradient(0deg, #8841ef, #5248bb)",
            "linear-gradient(0deg, #20162e, #272162)"
          )}
          pb={200}
        >
          <SimpleGrid columns={[1, 2, 3]} gap={"30px"} mx={300}>
            <QuoteCard
              name="Ambito Financiero"
              imgURL="https://scontent.faep14-2.fna.fbcdn.net/v/t1.6435-9/52452461_2359851127373094_5185038545848369152_n.png?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Be5_2_1HFXQAX8-8JFq&_nc_ht=scontent.faep14-2.fna&oh=00_AT_ea1bu54bom4pxGGSVfv_yFZ2tkQSRt6V8t8WNY0KUKQ&oe=6227C31F"
            />

            <QuoteCard
              name="Dolar Hoy"
              imgURL="https://pbs.twimg.com/profile_images/1359590688791400452/BFumyKFA_400x400.png"
            />

            <QuoteCard
              name="El Cronista"
              imgURL="https://scontent.faep14-2.fna.fbcdn.net/v/t1.6435-9/202068853_4286685154724770_3504484261847562339_n.png?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=cj6g7e80UlwAX9UE_C4&_nc_ht=scontent.faep14-2.fna&oh=00_AT8mdBVjOIOC4riI0RwB9oykWkuUpbR-UWRbPeIEsuJhSQ&oe=622A75DA"
            />

            <QuoteCard />
            <QuoteCard />
            <QuoteCard />
            <QuoteCard />
          </SimpleGrid>
        </Box>
      </Box>

      {/* <Heading>Quotes</Heading>
      <table>
        <th>buy</th>
        <th>sell</th>
        <th>source</th>
        {quotes.map((quote) => (
          <tr>
            <td>{quote.buy_price}</td>
            <td>{quote.sell_price}</td>
            <td>{quote.source}</td>
          </tr>
        ))}
      </table>
      <h3>Slippage</h3>

      <table>
        <th>buy slippage</th>
        <th>sell slippage</th>
        <th>source</th>
        {slippages.map((slippage) => (
          <tr>
            <td>{slippage.buy_price_slippage}</td>
            <td>{slippage.sell_price_slippage}</td>
            <td>{slippage.source}</td>
          </tr>
        ))}
      </table>

      <h3>Average</h3>
      <table>
        <th>buy</th>
        <th>sell</th>
        <tr>
          <td>{averages.average_buy_price}</td>
          <td>{averages.average_sell_price}</td>
        </tr>
      </table> */}
    </>
  );
};

export default App;
