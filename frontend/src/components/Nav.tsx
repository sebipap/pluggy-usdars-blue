import {
  chakra,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const Nav = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <chakra.header m={4} px={{ base: 2, sm: 4 }} py={4}>
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack p="2" spacing={5}>
          <Image
            src={"https://pluggy.ai/_next/image?url=%2Flogo.png&w=128&q=75"}
          />

          <Text fontSize={"2.2vh"}> | Exchange Rates </Text>
        </HStack>
        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack spacing={1} mr={1} color="brand.500" display={"inline-flex"}>
            {colorMode === "dark" ? (
              <IconButton
                aria-label={`Change theme to dark`}
                onClick={toggleColorMode}
                icon={<SunIcon />}
              />
            ) : (
              <IconButton
                aria-label={`Change theme to light`}
                onClick={toggleColorMode}
                icon={<MoonIcon />}
              />
            )}
          </HStack>
        </HStack>
      </Flex>
    </chakra.header>
  );
};
