import { ReactNode } from "react";
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  Spinner,
  SimpleGrid,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { Average } from "../types";

const PriceWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      mb={4}
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={"brandtext"}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
};

const Price = ({
  name,
  value,
  onUpdate,
}: {
  name: string;
  value: number;
  onUpdate: boolean;
}) => (
  <PriceWrapper>
    <Box py={4} px={12}>
      <Text color="brandtext" fontWeight="500" fontSize="2xl">
        {name}
      </Text>
      <HStack justifyContent="center">
        <Text color="brandtext" fontSize="3xl" fontWeight="600">
          $
        </Text>
        <Text
          color="brandtext"
          fontSize="5xl"
          fontWeight="900"
          textDecoration={onUpdate ? "underline" : "none"}
        >
          {value.toFixed(2)}
        </Text>
      </HStack>
    </Box>
  </PriceWrapper>
);

interface AverageData {
  average: Average;
  loading: boolean;
  lastUpdate: string;
  onUpdate: boolean;
}

export const AverageSection = ({
  average,
  loading,
  lastUpdate,
  onUpdate,
}: AverageData) => {
  const avgBuy = average.average_buy_price;
  const avgSell = average.average_sell_price;

  const spread = avgSell - avgBuy;
  const avgAverage = (avgBuy + avgSell) / 2;
  const spreadPercentage = (100 * spread) / avgAverage;

  return (
    <Box
      p={12}
      rounded="lg"
      bg={"brandpink"}
      borderWidth="1px"
      borderColor={"brandtext"}
      h={"fit-content"}
      shadow={useColorModeValue("#ffb0f1 -1px 0px 50px 3px", "#320046 -1px 0px 50px 3px")}

    >
      {loading ? (
        <Center>
          <Spinner
            thickness="10px"
            speed="0.65s"
            color="brandtext"
            top="40%"
            size={"xl"}
          />
        </Center>
      ) : (
        <>
          <VStack spacing={2} textAlign="center">
            <Heading size="xl" color="brandtext" fontSize="4xl">
              Average Value Today
            </Heading>

            <Text fontSize="lg" color="brandtext">
              Buy-sell spread: ${spread.toFixed(2)} (
              {spreadPercentage.toFixed(2)}%)
            </Text>
          </VStack>
          <SimpleGrid columns={[1, 2]} spacing={{ base: 4, lg: 10 }} py={10}>
            <Price name="Buy" value={avgBuy} onUpdate={onUpdate} />
            <Price name="Sell" value={avgSell} onUpdate={onUpdate} />
          </SimpleGrid>

          <Text fontSize="lg" color="brandtext">
            Last update {lastUpdate}
          </Text>
        </>
      )}
    </Box>
  );
};
