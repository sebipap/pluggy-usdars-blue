export interface Average {
  average_buy_price: number;
  average_sell_price: number;
}

export interface Quote {
  name: string;
  buy_price: number;
  sell_price: number;
  buy_price_slippage: number;
  sell_price_slippage: number;
  source: string;
}

export interface ReportResponse {
  average: Average;
  fullQuotes: Quote[];
  update: string;
}
