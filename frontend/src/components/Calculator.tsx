import { ReactNode, useState } from "react";
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { toInteger } from "lodash";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useReport } from "../useReport";
import { Error } from "./Error";

const PriceWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      mb={4}
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={"mybluetext"}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
};

const PriceInput = ({
  name,
  value,
  handleChange,
}: {
  name: string;
  value: number;
  handleChange: (e: any) => void;
}) => {
  const parcedValue = toInteger(value * 100) / 100;

  return (
    <Center>
      <PriceWrapper>
        <Box py={4} px={12}>
          <Text color="mybluetext" fontWeight="500" fontSize="2xl">
            {name}
          </Text>
          <HStack justifyContent="center">
            <Text color="mybluetext" fontSize="3xl" fontWeight="600">
              $
            </Text>
            <Input
              type={"text"}
              color="mybluetext"
              fontSize={"4xl"}
              fontWeight="900"
              variant={"unstyled"}
              h={"80px"}
              borderColor={"transparent"}
              value={parcedValue}
              onChange={handleChange}
            />
          </HStack>
        </Box>
      </PriceWrapper>
    </Center>
  );
};

const Arrow = ({ direction }: { direction: string }) => (
  <Box pb={"10px"}>
    {direction === "up" ? (
      <ArrowUpIcon w={7} h={7} />
    ) : (
      <ArrowDownIcon w={7} h={7} />
    )}
  </Box>
);

export const Calculator = () => {
  const { data, isLoading, isError } = useReport();

  const average = data && data.average

  const avgBuy = average?.average_buy_price;
  const avgSell = average?.average_sell_price;
  const avgAverage = (avgBuy + avgSell) / 2;

  const [ars, setArs] = useState(0);
  const [usd, setUsd] = useState(0);
  const [arrow, setArrow] = useState("down");

  const handleARS = (e: any) => {
    setArrow("up");
    const arsAmount = parseFloat(e.target.value);
    setArs(arsAmount);
    setUsd(arsAmount / avgAverage);
  };
  const handleUSD = (e: any) => {
    setArrow("down");
    const usdAmount = parseFloat(e.target.value);
    setUsd(usdAmount);
    setArs(usdAmount * avgAverage);
  };


  return (
    <Box
      px={12}
      pt={12}
      rounded="lg"
      bg={"myblue"}
      borderWidth="1px"
      borderColor={"mybluetext"}
      shadow={useColorModeValue(
        "#91ffed -1px 0px 50px 3px",
        "#004338 -1px 0px 50px 3px"
      )}
    >
      {isLoading ? (
        <Center>
          <Spinner
            thickness="10px"
            speed="0.65s"
            color="mybluetext"
            top="40%"
            size={"xl"}
          />
        </Center>
      ) : isError? <Error/> : (
        <>
          <VStack spacing={2} textAlign="center">
            <Heading size="xl" color="mybluetext" fontSize="4xl">
              Converter
            </Heading>

            <Text fontSize="lg" color="mybluetext">
              Convert USD to ARS and vice-versa
            </Text>
          </VStack>
          <VStack spacing={0} py={10}>
            <PriceInput name="USD" value={usd} handleChange={handleUSD} />
            <Arrow direction={arrow} />
            <PriceInput name="ARS" value={ars} handleChange={handleARS} />
          </VStack>
        </>
      )}
    </Box>
  );
};
