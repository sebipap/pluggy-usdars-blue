import { Box, Heading, SimpleGrid, Text, useQuery } from "@chakra-ui/react";
import { Quote } from "../types";
import { useReport } from "../useReport";
import { Error } from "./Error";
import { LoadingCard } from "./LoadingCard";
import { QuoteCard } from "./QuoteCard";

export const QuotesSection = () => {
  const { data, isLoading, isError } = useReport();

  const QuotesWrapper = ({ children }: any) => (
    <>
      <Box
        bgGradient={
          "linear(to bottom right, transparent 49.5% , mypurple1 50%)"
        }
        h={125}
        mt={"calc(100px * -1)"}
      />
      <Box bgGradient={"linear(to bottom, mypurple1 , mypurple2)"} pb={0}>
        {children}
      </Box>
    </>
  );

  return (
    <QuotesWrapper>
      {isError ? (
        <Error />
      ) : (
        <SimpleGrid columns={[1, 1, 1, 3]} gap={"30px"} mx={[5, 10, "15%"]}>
          {isLoading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            data.fullQuotes?.map((quote: Quote) => (
              <QuoteCard {...quote} />
            ))
          )}
        </SimpleGrid>
      )}
      <Heading></Heading>
    </QuotesWrapper>
  );
};
