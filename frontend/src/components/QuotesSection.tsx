import {
  Box,
  Center,
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
import { CardWrapper } from "./CardWrapper";
import { LoadingCard } from "./LoadingCard";
import { QuoteCard } from "./QuoteCard";



export const QuotesSection = ({quotes, loading, onUpdate} : {quotes: Quote[], loading: boolean, onUpdate: boolean}) => {


  const QuotesWrapper = ({ children }: any) => (
    <>
      <Box
        bgGradient={
          "linear(to bottom right, transparent 49.5% , lightpurple 50%)"
        }
        h={125}
        mt={"calc(100px * -1)"}
      />
      <Box
        bgGradient={"linear(to bottom, lightpurple , darkpurple)"}
        pb={0}
      >{children}</Box>
      
    </>
  );

  return (
    <QuotesWrapper>
      <SimpleGrid columns={[1, 1, 1, 3]} gap={"30px"} mx={[5, 10, "15%"]}>
        {loading ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : (
          quotes.map((quote) => <QuoteCard {...{quote, onUpdate}} />)
        )}
      </SimpleGrid>
    </QuotesWrapper>
  );
};
