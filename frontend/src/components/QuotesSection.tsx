import {
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { server } from "../config";
import { Average, Quote, ReportResponse } from "../types";
import { QuoteCard } from "./QuoteCard";

const defaultAvg: Average = { average_buy_price: 0, average_sell_price: 0 };
const defaultQuote: Quote = {
  name: "",
  buy_price: 0,
  sell_price: 0,
  buy_price_slippage: 0,
  sell_price_slippage: 0,
  source: "",
};

export const QuotesSection = () => {
  const [average, setAverage] = useState(defaultAvg);
  const [quotes, setQuotes] = useState([defaultQuote]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = (endpoint: string) =>
    fetch(server + endpoint).then((res) => res.json());

  const updateValues = () => {
    getData("latestreport").then((res) => {
      const { average, fullQuotes, update }: ReportResponse = res;
      setAverage(average);
      setQuotes(fullQuotes);
      setLastUpdate(update);
      setLoading(false);
    });
  }

  

  useEffect(() => {
    updateValues()
    setInterval(updateValues, 15000);
  }, []);

  const LoadingCards = () => (
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
      <Stack spacing={5}>

      <SkeletonCircle size="20" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      </Stack>
    </Box>
  );

  return (
    <Box
      bg={useColorModeValue(
        "linear-gradient(0deg, #8841ef, #5248bb)",
        "linear-gradient(0deg, #20162e, #272162)"
      )}
      pb={0}
    >
      <SimpleGrid columns={[1, 2, 3]} gap={"30px"} mx={[50, "15%"]}>
        {loading ? (
          <LoadingCards />
        ) : (
          quotes.map((quote) => <QuoteCard {...quote} /> )
        )}
      </SimpleGrid>
    </Box>
  );
};
