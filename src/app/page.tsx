'use client';

import { PulseBeams } from './components/ui/PulseBeam';
import { useWeb3Modal, useWeb3ModalTheme } from '@web3modal/wagmi/react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import SparklesText from './components/ui/sparkles';
import NotConnectedPage from './components/NotConnectedPage';
import { Loader2 } from 'lucide-react';
import NavBar from './components/NavBar';
import ConnectedPage from './components/ConnectedPage';
import useStore from '../stores/useStore';

export default function Home() {
  const { open } = useWeb3Modal();
  const { setThemeMode } = useWeb3ModalTheme();
  const { address } = useAccount();
  const isConnected = useStore((state) => state.isConnected);
  const [loading, setLoading] = useState(true);

  setThemeMode('dark');

  useEffect(() => {
    useStore.setState({ isConnected: !!address });
    setLoading(false);
  }, [address]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 h-screen">
        <Loader2 className="w-4 h-4 animate-spin text-white" />
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isConnected) {
    return <NotConnectedPage isConnected={isConnected} open={open} />;
  }

  return <ConnectedPage />;
}
