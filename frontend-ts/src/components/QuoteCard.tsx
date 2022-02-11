import {
  Avatar,
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

export const QuoteCard = (quote: Quote) => {
  const {
    name,
    buy_price,
    sell_price,
    buy_price_slippage,
    sell_price_slippage,
    source,
  } = quote;

  const imgURL = iconsRoot + name.replace(/\s/, "").toLowerCase() + ".png";

  return (
    <Box mt={-150}>
      <Box
        h={300}
        bg={`url("${imgURL}")`}
        mb={-300}
        opacity={0.5}
        filter="saturate(3.5)"
        rounded="lg"
        border="1px solid black"
      />
      <Box
        h={300}
        bg={useColorModeValue("rgba(255,255,255, 0.2)", "rgba(0,0,0, 0.7)")}
        style={{ backdropFilter: "blur(50px)" }}
        rounded="lg"
        mb={150}
        p={6}
      >
        <Avatar my={4} size={"lg"} src={imgURL} name={name} />

        <Heading size="lg" color={useColorModeValue("gray.800", "gray.300")}>
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
                ${buy_price}
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
                ${sell_price}
              </StatNumber>
              <StatHelpText>
                {sell_price_slippage.toFixed(2)}% slippage
              </StatHelpText>
            </Stat>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
