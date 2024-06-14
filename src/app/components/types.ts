export interface SecurityInfo {
  is_anti_whale: boolean;
  buy_tax: number;
  can_take_back_ownership: boolean;
  is_blacklisted: boolean;
  creator_address: string;
  dex: LiquidityPool[];
}

export interface LiquidityPool {
  pair: string;
  liquidity: number;
  name: string;
}

export interface ApiResponse {
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
