'use client';

import * as React from 'react';
import { CommandDialog, CommandInput } from '@/components/ui/command';
import NavBar from './NavBar';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import useStore from '@/stores/useStore';
import { Loader2 } from 'lucide-react';
import { DollarSignIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/formatNumbers';
import ShinyButton from '@/components/ui/shinyButton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardIcon } from 'lucide-react';
import { ApiResponse, SecurityInfo } from './types';

const ConnectedPage = () => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isToken, setIsToken] = React.useState(true);
  const { contractAddress, setContractAddress, tokenData, setTokenData } =
    useStore();

  React.useEffect(() => {
    const savedContractAddress = localStorage.getItem('contractAddress');
    const savedTokenData = localStorage.getItem('tokenData');

    if (savedContractAddress) {
      setContractAddress(savedContractAddress);
    }

    if (savedTokenData) {
      setTokenData(JSON.parse(savedTokenData));
    }
  }, [setContractAddress, setTokenData]);

  const CommandInputComp = () => {
    const [localInputValue, setLocalInputValue] = React.useState('');
    const [localIsToken, setLocalIsToken] = React.useState(isToken);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalInputValue(e.target.value);
    };

    const handleRadioChange = (value: string) => {
      setLocalIsToken(value === 'token');
    };

    const handleSubmit = async () => {
      const network = 'eth';
      const address = localInputValue.trim();

      if (address) {
        const url = `https://api.geckoterminal.com/api/v2/networks/${network}/tokens/${address}`;
        try {
          setLoading(true);
          const response = await axios.get<ApiResponse>(url);
          console.log('API Response:', response.data);
          setContractAddress(response.data.data.attributes.address);
          setIsToken(localIsToken);
          setTokenData(response.data.data.attributes);
        } catch (error) {
          console.error('API Error:', error);
        } finally {
          setOpen(false);
          setLoading(false);
        }
      }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSubmit();
    };

    return (
      <ShinyButton onClick={() => setOpen(true)}>
        <p className="text-sm">
          Press{' '}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-700 px-1.5 font-mono text-[10px] font-medium text-white opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <form onSubmit={handleFormSubmit}>
            <Input
              placeholder="Enter a Token or Pool address..."
              className="w-full rounded-b-none"
              value={localInputValue}
              onChange={handleInputChange}
            />
            <div className="flex flex-col items-center justify-center space-y-4 py-10 border">
              <span> I&apos;m looking for a:</span>
              <RadioGroup
                defaultValue={localIsToken ? 'token' : 'pool'}
                onValueChange={handleRadioChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="token" id="r1" />
                  <Label htmlFor="r1">Token</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pool" id="r2" />
                  <Label htmlFor="r2">Pool</Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              className="w-full rounded-t-none"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </CommandDialog>
      </ShinyButton>
    );
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const TokenCards = () => {
    return (
      <div className="flex flex-col items-center justify-center space-y-10">
        <div className="flex flex-col items-center justify-center space-y-10 pb-2">
          <h1 className="text-5xl font-bold">{tokenData?.name}</h1>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">{`$${
              tokenData?.symbol
            } - ${formatAddress(tokenData?.address || '')}`}</p>
            <CopyToClipboard
              text={tokenData?.address || ''}
              onCopy={() => console.log('Address copied!')}
            >
              <button>
                <ClipboardIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-3">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Cap (USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${formatNumber(Number(tokenData?.market_cap_usd))}
              </div>
              <p className="text-xs text-muted-foreground">
                Market Capitalization
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Fully Diluted Valuation (USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${formatNumber(Number(tokenData?.fdv_usd))}
              </div>
              <p className="text-xs text-muted-foreground">
                Fully Diluted Market Cap
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Volume (24h USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${formatNumber(Number(tokenData?.volume_usd?.h24))}
              </div>
              <p className="text-xs text-muted-foreground">
                24h Trading Volume
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Supply
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(Number(tokenData?.total_supply))}
              </div>
              <p className="text-xs text-muted-foreground">
                Token Total Supply
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reserve in USD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${formatNumber(Number(tokenData?.total_reserve_in_usd))}
              </div>
              <p className="text-xs text-muted-foreground">
                Total Reserve Value
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Token Price (USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${formatNumber(Number(tokenData?.price_usd))}
              </div>
              <p className="text-xs text-muted-foreground">
                Current Price per Token
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

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
    const [securityInfo, setSecurityInfo] = React.useState<SecurityInfo | null>(
      null
    );
    const [highestLiquidityPair, setHighestLiquidityPair] = React.useState('');

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const url = `https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${tokenAddress}`;
          const response = await axios.get(url);
          const resultKey = Object.keys(response.data.result)[0];
          setSecurityInfo(response.data.result[resultKey]);

          if (response.data.result[resultKey].dex) {
            const pools = response.data.result[resultKey].dex;
            const highestLiquidityPool = pools.reduce(
              (prev: any, current: any) => {
                return prev.liquidity > current.liquidity ? prev : current;
              }
            );
            setHighestLiquidityPair(highestLiquidityPool.pair);
          }
        } catch (error) {
          console.error('Failed to fetch security info:', error);
        }
      };

      fetchData();
    }, [tokenAddress]);

    if (!securityInfo) {
      return <div className="text-white">Loading security information...</div>;
    }

    return (
      <div className="flex flex-col items-center justify-center space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 space-y-10">
          <div className="grid grid-cols-1 ">
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
          </div>
          <iframe
            referrerPolicy="no-referrer"
            id="dextools-widget"
            title="DEXTools Trading Chart"
            width="500"
            height="500"
            src={`https://www.dextools.io/widget-chart/en/ether/pe-light/${highestLiquidityPair}?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false`}
          ></iframe>
        </div>

        <h4 className="text-2xl font-bold text-white">Liquidity Pools</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityInfo.dex.map((pool: any, index: number) => (
            <PoolCard key={index} pool={pool} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-col items-center bg-gray-900 text-white">
      <NavBar />
      {isToken ? (
        <div className="flex flex-col items-center justify-center space-y-10 pt-20">
          <CommandInputComp />
          {contractAddress && (
            <>
              <TokenCards />
              <TokenSecurityInfo tokenAddress={contractAddress} />
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-10 pt-20">
          <CommandInputComp />
        </div>
      )}
    </main>
  );
};

export default ConnectedPage;
