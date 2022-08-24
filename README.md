
# CryptoBoo 👻 
A Cryptocurrency price tracking app made using Next.js

👉 [**Live Demo**](https://cryptoboo.vercel.app/)

![App Screenshot](https://cryptoboo.vercel.app/screenshots/homepage.jpg)


## Run Locally

**1. Clone the project**

```bash
  git clone https://github.com/jaikpillai/crypto-tracker.git
```

**2. Go to the project directory**

```bash
  cd project-directory
```

**3. Install dependencies**

```bash
  npm install
```

**4. Get an API Key** for Coinranking API from [**here**](https://rapidapi.com/Coinranking/api/coinranking1/)

You can find the Docs for the API [here](https://developers.coinranking.com/api/documentation)  

**5. Create .env.local file** in your project's root directory and create a variable
```js
NEXT_PUBLIC_RAPID_API={PASTE_YOUR_API_KEY_HERE}
```

**6. Start the server**

```bash
  npm run dev
```
Open http://localhost:3000 with your browser to see the result.


## Features

- Price tracking
- International Fiat Currency support (Prices can also be viewed in other cryptocurrencies)
- Historical Price data
- Search Cryptocurrencies
- Pagination
- Chart.js implementation for charts


## More Screenshots
**Coin Details**

![App Screenshot](https://cryptoboo.vercel.app/screenshots/coin_details_page.jpg)

**Choose currency**
![App Screenshot](https://cryptoboo.vercel.app/screenshots/choose_currency_dialog.jpg)

**Price Chart**
![App Screenshot](https://cryptoboo.vercel.app/screenshots/price_chart_2.jpg)


## Tech Stack

**Client:** React, Next.js, Typescript,  TailwindCSS, Chart.js

**API:** Coinranking API

