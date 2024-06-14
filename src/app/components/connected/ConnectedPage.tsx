'use client';

import * as React from 'react';
import NavBar from '../NavBar';
import useStore from '@/stores/useStore';
import TokenCards from './TokenCards';
import CommandInputComp from './CommandInputComp';
import { TokenAttributes } from '@/stores/types';
import TokenSecurityInfo from './TokenSecurityInfo';
import PoolData from './PoolData';

const ConnectedPage = () => {
  const {
    searchAddress,
    setSearchAddress,
    tokenData,
    setTokenData,
    isToken,
    setIsToken,
  } = useStore();

  React.useEffect(() => {
    const savedContractAddress = localStorage.getItem('searchAddress');
    const savedTokenData = localStorage.getItem('tokenData');

    if (savedContractAddress) {
      setSearchAddress(savedContractAddress);
    }

    if (savedTokenData) {
      setTokenData(JSON.parse(savedTokenData));
    }
  }, [setSearchAddress, setTokenData]);

  return (
    <main className="flex flex-col items-center bg-gray-900 text-white">
      <NavBar />
      {isToken ? (
        <div className="flex flex-col items-center justify-center space-y-10 pt-20">
          <CommandInputComp
            setSearchAddress={setSearchAddress}
            setTokenData={setTokenData}
            setIsToken={setIsToken}
            isToken={isToken}
          />
          {searchAddress && (
            <>
              <TokenCards tokenData={tokenData as TokenAttributes} />
              <TokenSecurityInfo tokenAddress={searchAddress} />
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-10 pt-20 h-screen">
          {!searchAddress && (
            <h1 className="text-2xl font-bold">
              Search for a token or pool to get started
            </h1>
          )}
          <CommandInputComp
            className="self-center"
            setSearchAddress={setSearchAddress}
            setTokenData={setTokenData}
            setIsToken={setIsToken}
            isToken={isToken}
          />
          {searchAddress && (
            <PoolData network="eth" poolAddress={searchAddress} />
          )}
        </div>
      )}
    </main>
  );
};

export default ConnectedPage;
