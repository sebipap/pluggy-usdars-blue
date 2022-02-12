import {
  Box,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface Heroprops {
  title: string[];
  paragraph: string;
}

export const Hero = ({ title, paragraph }: Heroprops) => {
  return (
    <Box
      w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
      mx="auto"
      textAlign={{ base: "left", md: "center" }}
      mb={100}
      px={8}
      my={200}
    >
      <Heading
        mb={6}
        fontSize={{ base: "5xl", md: "7xl" }}
        fontWeight="bold"
        lineHeight="none"
        letterSpacing={{ base: "normal", md: "tight" }}
        color={useColorModeValue("gray.900", "gray.100")}
      >
        {title[0]}{" "}
        <Text
          display={{ base: "block", lg: "inline" }}
          w="full"
          bgClip="text"
          bgGradient="linear-gradient(to right, brand, brand2)"
          fontWeight="extrabold"
        >
          {title[1]}
        </Text>{" "}
        <Box display={"inline"}>
          {title[2]}
        </Box>
      </Heading>
      <Text
        px={{ base: 0, lg: 24 }}
        mb={10}
        fontSize={{ base: "xl", md: "2xl" }}
        color={useColorModeValue("gray.600", "gray.300")}
      >
        {paragraph}
      </Text>
      <Stack
        direction={{ base: "column", sm: "row" }}
        mb={{ base: 4, md: 8 }}
        spacing={2}
        justifyContent={{ sm: "left", md: "center" }}
      ></Stack>
    </Box>
  );
};
