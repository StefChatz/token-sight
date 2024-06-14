import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// Get projectId from https://cloud.walletconnect.com
export const projectId = '6a7fdfa8080206e492e4c0a976b5c931';

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'token-sight',
  description: 'token-sight',
  url: 'https://token-sight.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
