import { extendTheme } from "@chakra-ui/react";

const semanticTokens = {
  colors: {
    mypurple1: {
      default: "#b78af5",
      _dark: "#272162",
    },
    mypurple2: {
      default: "#8646df",
      _dark: "#20162e",
    },
    brandpink: {
      default: "mypink.200",
      _dark: "mypink.800",
    },
    brandtext: {
      default: "#880c21",
      _dark: "#d17cf3",
    },
    myblue: {
      default: "teal.100",
      _dark: "teal.900",
    },
    mybluetext: {
      default: "teal.900",
      _dark: "teal.200",
    },
  },
};

const colors = {
  mypink: {
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
