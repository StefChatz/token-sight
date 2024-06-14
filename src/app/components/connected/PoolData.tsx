import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/formatNumbers';
import axios from 'axios';
import { useEffect, useState } from 'react';

const PoolData = ({
  network,
  poolAddress,
}: {
  network: string;
  poolAddress: string;
}) => {
  const [poolData, setPoolData] = useState<any>(null);

  console.log('poolData', poolData);

  useEffect(() => {
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

export default PoolData;
