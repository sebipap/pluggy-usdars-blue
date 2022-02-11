import { ReactNode } from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  Skeleton,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Average } from "../types";
import { LoadingCard } from "./LoadingCard";
import { LoadingNumber } from "./LoadingNumber";

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      w={300}
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={"brandtext"}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export const AverageSection = ({
  average,
  loading,
  lastUpdate,
  onUpdate,
}: {
  average: Average;
  loading: boolean;
  lastUpdate: string;
  onUpdate: boolean;
}) => {
  return (
    <Box
      m={"auto"}
      my={12}
      p={12}
      w={"fit-content"}
      rounded="lg"
      bg={"brandpink"}
      borderColor={"brandtext"}
    >
      <VStack spacing={2} textAlign="center">
        <Heading size="xl" color="brandtext" fontSize="4xl">
          Average value today
        </Heading>
        <Text fontSize="lg" color="brandtext">
          Last update {lastUpdate}
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        {loading ? (
          <Spinner
            thickness="10px"
            speed="0.65s"
            emptyColor="brandpink"
            color="brandtext"
            top="40%"
            size={"xl"}
          />
        ) : (
          <>
            {" "}
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text color="brandtext" fontWeight="500" fontSize="2xl">
                  Buy
                </Text>
                <HStack justifyContent="center">
                  <Text color="brandtext" fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text color="brandtext" fontSize="5xl" fontWeight="900">
                    {onUpdate ? (
                      <LoadingNumber />
                    ) : (
                      average.average_buy_price.toFixed(2)
                    )}{" "}
                  </Text>
                </HStack>
              </Box>
            </PriceWrapper>
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text color="brandtext" fontWeight="500" fontSize="2xl">
                  Sell
                </Text>
                <HStack justifyContent="center">
                  <Text color="brandtext" fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text color="brandtext" fontSize="5xl" fontWeight="900">
                    {onUpdate ? (
                      <LoadingNumber />
                    ) : (
                      average.average_sell_price.toFixed(2)
                    )}
                  </Text>
                </HStack>
              </Box>
            </PriceWrapper>{" "}
          </>
        )}
      </Stack>
    </Box>
  );
};
