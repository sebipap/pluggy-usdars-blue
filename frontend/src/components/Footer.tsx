import { LinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={8}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image
          src={"https://pluggy.ai/_next/image?url=%2Flogo.png&w=128&q=75"}
        />
        <Text>Made by Sebastián Papanicolau for Pluggy</Text>
        <Stack direction={"row"} spacing={6}>
          <a href="https://github.com/sebipap/pluggy-usdars-blue">
            <Button leftIcon={<LinkIcon />}>Github Repo</Button>
          </a>
	  <a href="https://sebipap.github.io/">
            <Button leftIcon={<LinkIcon />}>My Portfolio</Button>
          </a>
        </Stack>
      </Container>
    </Box>
  );
};
