import { Box, Button, Heading, Icon, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export const Hero = () => {
	return (
	    <Box
	      w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
	      mx="auto"
	      textAlign={{ base: "left", md: "center" }}
	      mb={100}
	    >
	      <Heading
		mb={6}
		fontSize={{ base: "5xl", md: "7xl" }}
		fontWeight="bold"
		lineHeight="none"
		letterSpacing={{ base: "normal", md: "tight" }}
		color={useColorModeValue("gray.900",'gray.100')}
	      >
		Check all {" "}
		<Text
		  display={{ base: "block", lg: "inline" }}
		  w="full"
		  bgClip="text"
		  bgGradient="linear-gradient(to right,  #ef415e, #5248bb)"
		  fontWeight="extrabold"
		>
		  exchange rates
		</Text>{" "}
		live.
	      </Heading>
	      <Text
		px={{ base: 0, lg: 24 }}
		mb={10}
		fontSize={{ base: "xl", md: "2xl" }}
		color={useColorModeValue("gray.600",'gray.300')}
	      >
		Hellonext is a feature voting software where you can allow your users
		to vote on features, publish roadmap, and complete your customer
		feedback loop.
	      </Text>
	      <Stack
	      direction={{base:"column",sm:"row"}}
		mb={{ base: 4, md: 8 }}
		spacing={2}
		justifyContent={{ sm: "left", md: "center" }}
	      >
	
	      </Stack>
	    </Box>

	);
      };
      
      