import { create } from 'zustand';

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

interface StoreState {
  isConnected: boolean;
  contractAddress: string;
  tokenData: TokenAttributes | null;
  setConnected: (status: boolean) => void;
  setContractAddress: (address: string) => void;
  setTokenData: (data: TokenAttributes | null) => void;
}

const useStore = create<StoreState>((set) => ({
  isConnected: false,
  contractAddress: localStorage.getItem('contractAddress') || '',
  tokenData: JSON.parse(localStorage.getItem('tokenData') || 'null'),
  setConnected: (status) => set({ isConnected: status }),
  setContractAddress: (address) => {
    localStorage.setItem('contractAddress', address);
    set({ contractAddress: address });
  },
  setTokenData: (data) => {
    localStorage.setItem('tokenData', JSON.stringify(data));
    set({ tokenData: data });
  },
}));

export default useStore;
