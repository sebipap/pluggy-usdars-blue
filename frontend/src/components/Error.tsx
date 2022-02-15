import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

export const Error = () => (
  <Alert
    status="error"
    variant="subtle"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    height="200px"
    rounded={"lg"}
    bg="transparent"
    
  >
    <AlertIcon boxSize="40px" mr={0} />
    <AlertTitle mt={4} mb={1} fontSize="lg">
      Fetch error!
    </AlertTitle>
    <AlertDescription maxWidth="sm">
      There was an error fetching the quotes.
    </AlertDescription>
  </Alert>
);
