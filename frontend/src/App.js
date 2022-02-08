import { useEffect, useState } from "react";
import { server } from "./config";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [averages, setAverages] = useState([]);
  const [slippages, setSlippages] = useState([]);
  const [fullPrices, setFullPrices] = useState([]);

  const getData = (endpoint) =>
    fetch(server + endpoint).then((res) => res.json());

  useEffect(() => {
    setInterval(() => {
      getData("quotes").then((res) => setQuotes(res));
      getData("average").then((res) => setAverages(res));
      getData("slippage").then((res) => setSlippages(res));
    }, 15000);
  }, []);

  return (
    <>
      <h3>Quotes</h3>
      <table>
        <th>buy</th>
        <th>sell</th>
        <th>source</th>
        {quotes.map((quote) => (
          <tr>
            <td>{quote.buy_price}</td>
            <td>{quote.sell_price}</td>
            <td>{quote.source}</td>
          </tr>
        ))}
      </table>
      <h3>Slippage</h3>

      <table>
        <th>buy slippage</th>
        <th>sell slippage</th>
        <th>source</th>
        {slippages.map((slippage) => (
          <tr>
            <td>{slippage.buy_price_slippage}</td>
            <td>{slippage.sell_price_slippage}</td>
            <td>{slippage.source}</td>
          </tr>
        ))}
      </table>

      <h3>Average</h3>
      <table>
        <th>buy</th>
        <th>sell</th>
        <tr>
          <td>{averages.average_buy_price}</td>
          <td>{averages.average_sell_price}</td>
        </tr>
      </table>
    </>
  );
};

export default App;
