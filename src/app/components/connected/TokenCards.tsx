import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardIcon } from 'lucide-react';
import { formatNumber, formatAddress } from '@/lib/formatNumbers';
import Image from 'next/image';

interface TokenData {
  name?: string;
  symbol?: string;
  address?: string;
  market_cap_usd?: number;
  fdv_usd?: number;
  volume_usd?: {
    h24?: number;
  };
  total_supply?: number;
  total_reserve_in_usd?: number;
  price_usd?: number;
}

interface TokenCardsProps {
  tokenData?: TokenData;
}

const TokenCards = ({ tokenData }: TokenCardsProps) => {
  console.log('tokenData', tokenData);

  if (!tokenData) {
    return <div>No token data available.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="flex flex-col items-center justify-center space-y-10 pb-2">
        <div className="flex items-center space-x-4">
          <img
            src={tokenData?.image_url}
            alt={tokenData.name}
            width={48}
            height={48}
          />
          <h1 className="text-5xl font-bold">{tokenData.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">{`${
            tokenData.symbol
          } - ${formatAddress(tokenData.address || '')}`}</p>
          <CopyToClipboard
            text={tokenData.address || ''}
            onCopy={() => console.log('Address copied!')}
          >
            <button>
              <ClipboardIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-white">Token Info</h1>
      <div className="grid gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Market Cap (USD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${formatNumber(Number(tokenData.market_cap_usd))}
            </div>
            <p className="text-xs text-muted-foreground">
              Market Capitalization
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fully Diluted Valuation (USD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${formatNumber(Number(tokenData.fdv_usd))}
            </div>
            <p className="text-xs text-muted-foreground">
              Fully Diluted Market Cap
            </p>
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
              ${formatNumber(Number(tokenData.volume_usd?.h24))}
            </div>
            <p className="text-xs text-muted-foreground">24h Trading Volume</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(Number(tokenData.total_supply))}
            </div>
            <p className="text-xs text-muted-foreground">Token Total Supply</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Reserve in USD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${formatNumber(Number(tokenData.total_reserve_in_usd))}
            </div>
            <p className="text-xs text-muted-foreground">Total Reserve Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Token Price (USD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${formatNumber(Number(tokenData.price_usd))}
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

export default TokenCards;
