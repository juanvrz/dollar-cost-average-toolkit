# Dollar-Cost Averaging Toolkit

Interactive web tool to analyze and compare investment strategies on different financial assets using real historical data.

The toolkit lets you simulate Dollar-Cost Averaging (DCA) strategies and compare them against alternatives like Lump-sum investing, using real historical prices from Yahoo Finance and historical exchange rates for accurate cross-currency analysis.

## Features

- **Multi-asset support**: crypto (BTC, ETH), stocks (AAPL, GOOG, AMZN, NVDA), indices (S&P 500, NASDAQ-100, MSCI World, Emerging Markets) and commodities (Gold, Silver).
- **Cross-currency analysis**: invest in any asset using EUR or USD. Historical exchange rates are applied per-date for realistic results.
- **Configurable DCA**: daily, weekly, biweekly or monthly purchases over any date range.
- **Strategy comparison**: compare DCA vs Lump-sum investing side by side with synchronized chart visualization.
- **Dark mode**: persistent theme preference with system preference detection.
- **Real historical data**: powered by Yahoo Finance via `yahoo-finance2`.

## Tech stack

**Backend**
- Node.js + TypeScript
- Express for the REST API
- yahoo-finance2 for historical market data

**Frontend**
- React + TypeScript
- Vite for development tooling
- Tailwind CSS for styling
- Recharts for data visualization

## Architecture

The project is split into two independent applications:

```
dollar-cost-average-toolkit/
├── backend/          # Node + Express API
│   └── src/
│       ├── clients/  # External API integrations (Yahoo Finance)
│       ├── services/ # Business logic (DCA simulation, currency conversion)
│       ├── routes/   # REST endpoints
│       └── types/    # Shared TypeScript types
└── frontend/         # React + Vite app
    └── src/
        ├── components/ # UI components
        ├── services/   # API client layer
        └── types/      # Frontend types
```

### Key design decisions

- **Anti-corruption layer for Yahoo Finance**: the client wraps the external API in a stable contract. If the data provider changes, only the client is affected.
- **Currency conversion uses per-date exchange rates**: each purchase in a DCA simulation uses the historical exchange rate of that specific date, not the current one. This produces results that match what a real investor would have experienced.
- **Closed asset catalog over open search**: a curated list of assets keeps the UX clean and avoids dealing with edge cases of obscure symbols. Open search is planned for a future iteration.
- **Single-language UI with string centralization in mind**: all texts are currently hardcoded in English. The codebase is structured so that adding i18n with `react-i18next` would not require deep refactors.

## Running locally

### Prerequisites

- Node.js 22 or higher
- npm

### Backend

```bash
cd backend
npm install
npm run dev
```

The API runs on `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The UI runs on `http://localhost:5173`.

## API endpoints

| Method | Endpoint        | Description                         |
|--------|-----------------|-------------------------------------|
| GET    | `/api/health`   | Health check                        |
| GET    | `/api/assets`   | Returns the asset catalog           |
| GET    | `/api/prices`   | Historical prices for a given symbol|
| POST   | `/api/dca`      | Runs a DCA simulation               |

### Example request

```bash
curl -X POST http://localhost:3000/api/dca \
  -H "Content-Type: application/json" \
  -d '{
    "assetId": "btc",
    "amountPerPurchase": 100,
    "currency": "EUR",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "frequency": "monthly",
    "compareWith": "lump-sum"
  }'
```

## Roadmap

Features intentionally left out of the MVP, in not an specific order:

- Additional comparison strategies (different start day, different asset, different frequency)
- Search across all Yahoo Finance symbols (in addition to the curated catalog)
- i18n with `react-i18next`
- Persistent simulation history per user
- Export results to PDF/CSV
- Unit tests on the DCA service
- Production deployment configuration

## Author

Built by Juan Álvarez Lomba ([@juanvrz](https://github.com/juanvrz))
