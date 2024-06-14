'use client';

import * as React from 'react';
import NavBar from '../NavBar';
import axios from 'axios';
import useStore from '@/stores/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAddress, formatNumber } from '@/lib/formatNumbers';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardIcon } from 'lucide-react';
import { SecurityInfo } from '../types';
import TokenCards from './TokenCards';
import CommandInputComp from './CommandInputComp';

export const truncateNumber = (num: number): string => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });
};

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

  const PoolCard = ({ pool }: { pool: any }) => {
    return (
      <div className="bg-gray-700 rounded-lg p-4 m-2 shadow-lg dark:bg-gray-800">
        <h5 className="text-lg font-bold text-white">{pool.name}</h5>
        <div className="flex items-center space-x-2">
          <p className="text-white">
            Liquidity: ${formatNumber(pool.liquidity)}
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-300">{formatAddress(pool.pair)}</p>
            <CopyToClipboard
              text={pool.pair}
              onCopy={() => console.log('Pair address copied!')}
            >
              <button>
                <ClipboardIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  };

  const InfoCard = ({ title, value }: { title: string; value: string }) => {
    return (
      <div className="bg-gray-700 rounded-lg p-4 m-2 shadow-lg dark:bg-gray-800 text-white">
        <h5 className="text-lg font-bold">{title}</h5>
        <p>{value}</p>
      </div>
    );
  };

  const TokenSecurityInfo = ({ tokenAddress }: { tokenAddress: string }) => {
    const [highestLiquidityPool, setHighestLiquidityPool] = React.useState<
      string | null
    >(null);

    const [securityInfo, setSecurityInfo] = React.useState<SecurityInfo | null>(
      null
    );

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const url = `https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${tokenAddress}`;
          const response = await axios.get(url);
          const resultKey = Object.keys(response.data.result)[0];
          setSecurityInfo(response.data.result[resultKey]);
          setHighestLiquidityPool(response.data.result[resultKey].dex[0]);
        } catch (error) {
          console.error('Failed to fetch security info:', error);
        }
      };

      fetchData();
    }, [tokenAddress]);

    if (!securityInfo) {
      return <div className="text-white">Loading security information...</div>;
    }
    console.log('highestLiquidityPool', highestLiquidityPool);

    return (
      <div className="flex flex-col items-center justify-center space-y-10">
        <h1 className="text-2xl font-bold text-white">Token Security Info</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard
            title="Anti Whale"
            value={securityInfo.is_anti_whale ? 'Yes' : 'No'}
          />
          <InfoCard title="Buy Tax" value={`${securityInfo.buy_tax}%`} />
          <InfoCard
            title="Can Take Back Ownership"
            value={securityInfo.can_take_back_ownership ? 'Yes' : 'No'}
          />
          <InfoCard
            title="Is Blacklisted"
            value={securityInfo.is_blacklisted ? 'Yes' : 'No'}
          />
          <InfoCard
            title="Creator Address"
            value={formatAddress(securityInfo.creator_address)}
          />
          <InfoCard
            title="Holder Count"
            value={String(securityInfo.holder_count)}
          />
          <InfoCard
            title="LP Holders"
            value={String(securityInfo.lp_holder_count)}
          />
          <InfoCard
            title="LP Total Supply"
            value={`${(securityInfo.lp_total_supply * 100).toFixed(2)}%`}
          />
        </div>

        <h4 className="text-2xl font-bold text-white">Liquidity Pools</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityInfo.dex && securityInfo.dex.length > 0 ? (
            securityInfo.dex.map((pool: any, index: number) => (
              <PoolCard key={index} pool={pool} />
            ))
          ) : (
            <div>No liquidity pools found.</div>
          )}
        </div>
      </div>
    );
  };

  const PoolData = ({
    network,
    poolAddress,
  }: {
    network: string;
    poolAddress: string;
  }) => {
    console.log('isToken', isToken);
    const [poolData, setPoolData] = React.useState<any>(null);

    console.log('poolData', poolData);

    React.useEffect(() => {
      const fetchPoolData = async () => {
        try {
          const url = `https://api.geckoterminal.com/api/v2/networks/${network}/pools/${poolAddress}`;
          console.log('url', url);
          const response = await axios.get(url);
          console.log('response', response);
          setPoolData(response.data);
        } catch (error) {
          console.error('Failed to fetch pool data:', error);
        }
      };

      fetchPoolData();
    }, [network, poolAddress]);

    if (!poolData) {
      return <div className="text-white">Loading pool data...</div>;
    }

    return (
      <div className="flex flex-col items-center justify-center space-y-10">
        <h1 className="text-5xl font-bold">{poolData.data.attributes.name}</h1>
        <div className="grid gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Base Token Price (USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {formatNumber(
                  Number(poolData.data.attributes.base_token_price_usd)
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Fully Diluted Value (USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${formatNumber(Number(poolData.data.attributes.fdv_usd))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Volume (24h USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${formatNumber(Number(poolData.data.attributes.volume_usd.h24))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quote Token Price (Base Token)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {formatNumber(
                  Number(poolData.data.attributes.quote_token_price_base_token)
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quote Token Price (USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {formatNumber(
                  Number(poolData.data.attributes.quote_token_price_usd)
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pool hosted on
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {poolData.data.relationships.dex.data.id
                  .replace(/_/g, ' ')
                  .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase())}
              </div>
            </CardContent>
          </Card>
        </div>
        <iframe
          referrerPolicy="no-referrer"
          id="dextools-widget"
          title="DEXTools Trading Chart"
          width="500"
          height="500"
          src={`https://www.dextools.io/widget-chart/en/ether/pe-light/${poolAddress}?theme=dark&chartType=1&chartResolution=30&drawingToolbars=false`}
        ></iframe>
      </div>
    );
  };

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
              <TokenCards tokenData={tokenData} />
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
