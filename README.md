# Pluggy Full-Stack coding challenge


Full-Stack aplication used to get live data of argentine peso / u.s. dollar conversion rate live.

The aplication is composed of three parts:

- Scraping and processing data by serverless functions
- Caching and serving cached data by express API
- React frontend

TS has been used in all the project

## Serverless Functions

I used vercel framework to be able to quickly set up 3 functions with the following endpoints and structure :

- `/quotes`
  ```
  [{
  "name": ...,
  "source": ...,
  "buy_price": ...,
  "sell_price": ...
  }, ...]
  ```
- `/average`
  ```
  {
  "average_buy_price": ...,
  "average_sell_price": ...
  }
  ```
- `/slippage`

  ```
  [{
  "name": ...,
  "source": ...,
  "buy_price_slippage": ...,
  "sell_price_slippage": ...
  }, ...]
  ```

- `/fullReport`

  ```
  "average": {
  	"average_buy_price": ...,
  	"average_sell_price": ...
  },

  fullQuotes: [{
  	"name": ...,
  	"source": ...,
  	"buy_price": ...,
  	"sell_price": ...
  	"buy_price_slippage": ...,
  	"sell_price_slippage": ...
  }, ...],
  update: ...
  ```

All endpoints get the data from the same source (data scraping) but show the data in a different way. I used `scrape-it` for data scraping from html files, and axios for api requests.

The functions can be accesed at https://usdars-blue-scraper-sebipap.vercel.app/ for  latest data, not being cached


## Express Backend

This is a simple NodeJS-express backend thats requests the data from the serverless function and saves is in a file, refreshing the contents each minute.
It gets the data from the `/fullReport` endpoint of the serverless function, and exposes the same four endpoints the serverless functions expose under ```/api```, but getting the data from the saved full report, now calling it `latestReport`, also adding the last update time.

- `/quotes`
  ```
  {
  	"quotes": [{
  		"name": ...,
  		"buy_price": ...,
  		"sell_price": ...
  		"source": ...,
  		},...],
  	"update": ...}
  }
  ```
- `/average`
  ```
  {
		"average":{
			"average_buy_price": ...,
			"average_sell_price": ...
		}
		"update": ...
	}
  ```
- `/slippage`

  ```
  {
  	"slippage": [{
  		"name": ...,
  		"buy_price_slippage": ...,
  		"sell_price_slippage": ...
  		"source": ...,
  		},...],
  	"update": ...}
  }
  ```

- `/latestreport`

  ```
  "average": {
  	"average_buy_price": ...,
  	"average_sell_price": ...
  },

  fullQuotes: [{
  	"name": ...,
  	"source": ...,
  	"buy_price": ...,
  	"sell_price": ...
  	"buy_price_slippage": ...,
  	"sell_price_slippage": ...
  }, ...],
  update: ...
  ```



Server can be accesed at:
https://pluggy-usdars-blue-backend.herokuapp.com

## React Frontend
* I built the app using create-react app with the typescript template.
* SWR is being used for handling the fetched data 
* Chakra UI is used as the component library of choice
	* Dark/Light themes are implemented with ChakraUI
* app is deployed and hosted in vercel: https://pluggy-usdars-blue.vercel.app/

