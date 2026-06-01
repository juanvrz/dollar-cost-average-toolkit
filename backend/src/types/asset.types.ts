export interface PricePoint {
	date: string;                             // formato ISO: "2024-01-15"
  	price: number;                            // precio de cierre (close)
}

export interface AssetPriceHistory {
	symbol: string;                           // ticker
  	prices: PricePoint[];                     // array de precios del activo
}
