import {
  Box,
  Heading,
  HStack,
  Image,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { iconsRoot } from "../config";
import { Quote } from "../types";
import { CardWrapper } from "./CardWrapper";

export const QuoteCard = (quote: Quote) => {
  const {
    name,
    buy_price,
    sell_price,
    buy_price_slippage,
    sell_price_slippage,
  } = quote;

  const imgURL = `${iconsRoot}/${name.replace(/\s/, "").toLowerCase()}.png`;

  return (
    <CardWrapper imgURL={imgURL}>
      <Image src={imgURL} borderRadius={"full"} w={70} my={4} />

      <Heading size="lg" color={useColorModeValue("black", "white")}>
        {name}
      </Heading>

      <Box mt={5}>
        <HStack gap={6}>
          <Stat
            p={2}
            bg={useColorModeValue("rgba(255,255,255,0.1)", "rgba(0,0,0,0.1)")}
            rounded="lg"
          >
            <StatLabel color={useColorModeValue("gray.800", "gray.300")}>
              Buy
            </StatLabel>
            <StatNumber color={useColorModeValue("gray.800", "gray.300")}>
              {buy_price.toFixed(2)}
            </StatNumber>
            <StatHelpText>
              {buy_price_slippage.toFixed(2)}% slippage
            </StatHelpText>
          </Stat>

          <Stat
            p={2}
            bg={useColorModeValue("rgba(255,255,255,0.1)", "rgba(0,0,0,0.1)")}
            rounded="lg"
          >
            <StatLabel color={useColorModeValue("gray.800", "gray.300")}>
              Sell
            </StatLabel>
            <StatNumber color={useColorModeValue("gray.800", "gray.300")}>
              {sell_price.toFixed(2)}
            </StatNumber>
            <StatHelpText>
              {sell_price_slippage.toFixed(2)}% slippage
            </StatHelpText>
          </Stat>
        </HStack>
      </Box>
    </CardWrapper>
  );
};
