import { Box, useColorModeValue } from "@chakra-ui/react";

export const CardWrapper = ({ children, imgURL }: any) => (
  <Box mt={-150}>
    <Box mb={-300}>
      <Box
        h={300}
        bg={`url("${imgURL}")`}
        opacity={0.2}
        mb={-300}
        filter="saturate(3.5)"
        rounded="lg"
      />

      <Box
        h={300}
        bg={useColorModeValue("rgba(255,255,255, 0.2)", "rgba(0,0,0, 0.7)")}
        opacity={0.5}
        rounded="lg"
      />
    </Box>

    <Box
      h={300}
      rounded="lg"
      mb={150}
      p={6}
      style={{ backdropFilter: "blur(100px)" }}
    >
      {children}
    </Box>
  </Box>
);
