interface TokenAttributes {
  name: string;
  address: string;
  symbol: string;
  image_url: string;
  decimals: number;
  total_supply: string;
  coingecko_coin_id: string;
  price_usd: string;
  fdv_usd: string;
  total_reserve_in_usd: string;
  volume_usd: {
    h24: string;
  };
  market_cap_usd: string;
}

interface PoolAttributes {
  name: string;
  address: string;
  base_token_price_usd: string;
  quote_token_price_usd: string;
  base_token_price_native_currency: string;
  quote_token_price_native_currency: string;
  base_token_price_quote_token: string;
  quote_token_price_base_token: string;
  pool_created_at: string;
  reserve_in_usd: string;
  fdv_usd: string;
  market_cap_usd: string;
  price_change_percentage: {};
  transactions: {};
  volume_usd: {};
}

export type { TokenAttributes, PoolAttributes };
