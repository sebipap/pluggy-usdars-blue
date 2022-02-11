import { Box, toast, useToast, useUpdateEffect } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AverageSection } from "./components/AverageSection";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { QuotesSection } from "./components/QuotesSection";
import { server } from "./config";
import { Average, Quote, ReportResponse } from "./types";

const defaultAvg: Average = { average_buy_price: 0, average_sell_price: 0 };
const defaultQuote: Quote = {
  name: "",
  buy_price: 0,
  sell_price: 0,
  buy_price_slippage: 0,
  sell_price_slippage: 0,
  source: "",
};

const App = () => {
  const [average, setAverage] = useState(defaultAvg);
  const [quotes, setQuotes] = useState([defaultQuote]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(true);
  const [onUpdate, setOnUpdate] = useState(false);

  const toast = useToast();

  const getData = (endpoint: string) =>
    fetch(server + endpoint).then((res) => res.json());

  const updateEffect = () => {
    setLoading(false);
    setOnUpdate(true);
    setTimeout(() => setOnUpdate(false), 500);
  };

  const updateValues = () => {
    updateEffect();

    getData("latestreport").then((res) => {
      const report: ReportResponse = res;
      if (report) {
        setAverage(report.average);
        setQuotes(report.fullQuotes);
        setLastUpdate(report.update);
      } else {
        toast({
          title: "Failed to fetch data!",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }
    });
  };

  useEffect(() => {
    updateValues();
    setInterval(updateValues, 15000);
  }, []);

  return (
    <Box>
      <Nav />

      <Hero
        title={["Get latest ", "Blue Dollar price", " live."]}
        paragraph="Check out blue market exchange rate quotes from the best sources"
      />

      <QuotesSection quotes={quotes} loading={loading} onUpdate={onUpdate} />

      <AverageSection {...{ average, loading, onUpdate, lastUpdate }} />
    </Box>
  );
};

export default App;
