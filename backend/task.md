## 1. Backend
Create a HTTP server (using `Node.js`) that exposes three different endpoints:

#### 1.a Quotes
GET `/quotes`: It returns an array of objects with a blue USD quotes (or "cotización dolar blue") retrieved from 3 different sources:
- https://www.ambito.com/contenidos/dolar.html
- https://www.dolarhoy.com
- https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB

The objects must have the following minimum structure/attributes (you can add new useful attributes and/or insights)
```json
{
  "buy_price": 140.3,
  "sell_price": 144,
  "source": "https://www.ambito.com/contenidos/dolar.html"
}
```

#### 1.b Average
GET `/average`: It returns an object with average positions of all the quotes.

The objects must have the following minimum structure/attributes (you can add new useful attributes and/or insights)
```json
{
  "average_buy_price": 142.3,
  "average_sell_price": 147.4
}
```

#### 1.c Slippage 
GET `/slippage `: It returns an array objects with the information of how much slippage percentage there is between each source and the average.

The objects must have the following minimum structure/attributes (you can add new useful attributes and/or insights)
```json
{
  "buy_price_slippage": 0.04,
  "sell_price_slippage": -0.06,
  "source": "https://www.ambito.com/contenidos/dolar.html"
}
```

There is no requirement of _how_ to collect the information (you can either use web scrapping techniques, reverse engineering, just HTTP requests, etc.)

Must-have requeriments:
- Always retrieve fresh information (max time between last update is 60s)
- Deploy the project and make it available in some public URL (If no clue of doing this, we suggest using [Heroku](https://heroku.com))

Nice-to-have requeriments:
- TypeScript
- Serverless functions (you can easily use [Vercel](https://vercel.com) or [Serverless Framework](https://serverless.com) if you're new to this, but any serverless environment of your confort does the job).
- Create a system caché that show information no older than 60 seconds