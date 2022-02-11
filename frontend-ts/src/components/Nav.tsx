import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Heading,
  Image,
  Text,
  MenuIcon,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";

export const Nav = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <chakra.header
      bg={bg}
      m={4}
      px={{ base: 2, sm: 4 }}
      py={4}
      //       shadow="md"
      rounded="lg"
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack p="2" spacing={5}>
          <Image
            src={"https://pluggy.ai/_next/image?url=%2Flogo.png&w=128&q=75"}
          />

          <Text fontSize={"2.2vh"}> | Exchange Rates </Text>
        </HStack>
        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={1}
            mr={1}
            color="brand.500"
            display={{ base: "none", md: "inline-flex" }}
          >
            <IconButton
              aria-label={`Change theme to ${colorMode == "dark" ? "light" : "dark"}` }
              onClick={toggleColorMode}
              icon={colorMode == "dark" ? <MoonIcon /> : <SunIcon />}
            />

            <Button rightIcon={<TriangleDownIcon />}>English</Button>
          </HStack>

          <Box display={{ base: "inline-flex", md: "none" }}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color={useColorModeValue("gray.800", "inherit")}
              variant="ghost"
              icon={<HamburgerIcon />}
              onClick={mobileNav.onOpen}
            />

            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bg={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
            >
              <CloseButton
                aria-label="Close menu"
                onClick={mobileNav.onClose}
              />
              <Button>Change Language</Button>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </chakra.header>
  );
};
