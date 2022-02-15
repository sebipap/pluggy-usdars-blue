import { Box, SimpleGrid} from "@chakra-ui/react";
import { AverageSection } from "./components/AverageSection";
import { Calculator } from "./components/Calculator";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { QuotesSection } from "./components/QuotesSection";

export const App = () => (
    <Box>
      <Nav />

      <Hero
        title={["Get the latest ", "Blue Dollar price", " live."]}
        paragraph="Check out blue market exchange rate quotes from the best sources"
      />

      <QuotesSection />

      <SimpleGrid
        columns={[1, 1, 1, 2]}
        spacing={[5, 20]}
        my={"100px"}
        mx={["5%", "10%"]}
      >

        <AverageSection />
        
        <Calculator />

      </SimpleGrid>

      <Footer />
    </Box>
  );


