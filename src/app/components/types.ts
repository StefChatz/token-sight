export interface SecurityInfo {
  is_anti_whale: boolean;
  buy_tax: number;
  can_take_back_ownership: boolean;
  is_blacklisted: boolean;
  creator_address: string;
  dex: LiquidityPool[];
  holder_count: number;
  holder_percent: number;
  lp_holder_count: number;
  lp_total_supply: number;
}

export interface LiquidityPool {
  pair: string;
  liquidity: number;
  name: string;
}

export interface ApiTokenResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      address: string;
      symbol: string;
      decimals: number;
      total_supply: string;
      coingecko_coin_id: string;
      price_usd: string;
      fdv_usd: string;
      total_reserve_in_usd: string;
      volume_usd: {
        h24: string; // Assuming h24 is a property under volume_usd
      };
      market_cap_usd: string;
    };
    relationships: {}; // Define more specifically if relationships have a known structure
  };
}

export interface ApiPoolResponse {
  data: {
    id: string;
    type: string;
    attributes: {
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
    };
    relationships: {};
  };
}
