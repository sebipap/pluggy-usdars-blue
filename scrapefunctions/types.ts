type ValueGetter = (obj: DataSource) => Promise<PriceData>;

export type PriceDataResponse = PriceData | boolean;

export interface DataSource {
  name: string;
  source: string;
  buy_key?: string;
  sell_key?: string;
  buy_selector?: string;
  sell_selector?: string;
  requestHandler: ValueGetter;
}
export interface PriceData {
  buy_price: number;
  sell_price: number;
}

export interface FullQuote {
  name: String;
  buy_price: number;
  sell_price: number;
  buy_price_slippage: number;
  sell_price_slippage: number;
  source: String;
}

export interface Quote {
  name: string;
  buy_price: number;
  sell_price: number;
  source: string;
}

export interface Average {
  name: string;
  average_buy_price: number;
  average_sell_price: number;
  source: string;
}

export interface AverageValues {
  average_buy_price: number;
  average_sell_price: number;
}

export interface Slippage {
  name: string;
  buy_price_slippage: number;
  sell_price_slippage: number;
  source: string;
}

export interface FullReport {
  average: AverageValues;
  fullQuotes: FullQuote[];
  update: string;
}
