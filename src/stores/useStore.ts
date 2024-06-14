import { create } from 'zustand';
import zukeeper from 'zukeeper';

interface TokenAttributes {
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

interface StoreState {
  isConnected: boolean;
  searchAddress: string;
  tokenData: TokenAttributes | PoolAttributes | null;
  isToken: boolean;
  setConnected: (status: boolean) => void;
  setSearchAddress: (address: string) => void;
  setTokenData: (data: TokenAttributes | PoolAttributes | null) => void;
  setIsToken: (isToken: boolean) => void;
}

const useStore = create<StoreState>(
  zukeeper((set) => ({
    isConnected: false,
    searchAddress:
      typeof window !== 'undefined'
        ? localStorage.getItem('searchAddress') || ''
        : '',
    tokenData:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('tokenData') || 'null')
        : null,
    isToken:
      typeof window !== 'undefined'
        ? localStorage.getItem('isToken') === 'true'
        : true,
    setConnected: (status) => set({ isConnected: status }),
    setSearchAddress: (address) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('searchAddress', address);
      }
      set({ searchAddress: address });
    },
    setTokenData: (data) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('tokenData', JSON.stringify(data));
      }
      set({ tokenData: data });
    },
    setIsToken: (isToken) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isToken', isToken.toString());
      }
      set({ isToken });
    },
  }))
);

window.store = zukeeper(useStore);

export default useStore;
