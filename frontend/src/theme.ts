import { extendTheme } from "@chakra-ui/react";

const semanticTokens = {
  colors: {
    lightpurple: {
      default: "#b78af5",
      _dark: "#272162",
    },
    darkpurple: {
      default: "#8646df",
      _dark: "#20162e",
    },
    brandpink: {
      default: "pluggy.200",
      _dark: "darkpurple",
    },
    brandtext: { default: "#880c21", _dark: "#d17cf3" },
    specialBlue: {
      default: "teal.100",
      _dark: "teal.900",
    },
    azul: {
      default: "teal.900",
      _dark: "teal.200",
    },
  },
};

const colors = {
  pluggy: {
    200: "#ffd3f7",
    800: "#310642",
  },
  brand: "#5248bb",
  brand2: "#ef415e",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ semanticTokens, config, colors });

export default theme;
