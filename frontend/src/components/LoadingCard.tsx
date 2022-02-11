import { Center, Spinner } from "@chakra-ui/react";
import { CardWrapper } from "./CardWrapper";

export const LoadingCard = () => (
  <CardWrapper>
    <Center>
      <Spinner
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="darkpurple"
        position={"absolute"}
        top="40%"
        size={"xl"}
      />
    </Center>
  </CardWrapper>
);
