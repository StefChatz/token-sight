import { create } from 'zustand';
import { PoolAttributes, TokenAttributes } from './types';

interface StoreState {
  isConnected: boolean;
  searchAddress: string;
  tokenData: TokenAttributes | PoolAttributes | null;
  isToken: boolean | null;
  setConnected: (status: boolean) => void;
  setSearchAddress: (address: string) => void;
  setTokenData: (data: TokenAttributes | PoolAttributes | null) => void;
  setIsToken: (isToken: boolean | null) => void;
}

const initialState: StoreState = {
  isConnected: false,
  searchAddress: '',
  tokenData: null,
  isToken: null,
  setConnected: () => {},
  setSearchAddress: () => {},
  setTokenData: () => {},
  setIsToken: () => {},
};

const useStore = create<StoreState>((set) => ({
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
      : null,
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
}));

export default useStore;
