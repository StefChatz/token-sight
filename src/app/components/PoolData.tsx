import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PoolData = ({
  network,
  poolAddress,
}: {
  network: string;
  poolAddress: string;
}) => {
  const [poolData, setPoolData] = useState<any>(null);
  const [baseToken, setBaseToken] = useState<any>(null);
  const [quoteToken, setQuoteToken] = useState<any>(null);

  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        const response = await axios.get(
          `https://api.geckoterminal.com/api/v2/networks/${network}/pools/${poolAddress}?include=base_token,quote_token`
        );
        setPoolData(response.data.data);
        const included = response.data.included;
        setBaseToken(
          included.find(
            (item: any) =>
              item.id === response.data.data.relationships.base_token.data.id
          )
        );
        setQuoteToken(
          included.find(
            (item: any) =>
              item.id === response.data.data.relationships.quote_token.data.id
          )
        );
      } catch (error) {
        console.error('Failed to fetch pool data:', error);
      }
    };

    fetchPoolData();
  }, [network, poolAddress]);

  if (!poolData || !baseToken || !quoteToken) {
    return <div>Loading pool data...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 space-y-10">
        <div className="grid grid-cols-1">
          <InfoCard title="Pool Name" value={poolData.attributes.name} />
          <InfoCard title="Base Token" value={baseToken.attributes.name} />
          <InfoCard title="Quote Token" value={quoteToken.attributes.name} />
          <InfoCard
            title="Base Token Price (USD)"
            value={`$${poolData.attributes.base_token_price_usd}`}
          />
          <InfoCard
            title="Quote Token Price (USD)"
            value={`$${poolData.attributes.quote_token_price_usd}`}
          />
          <InfoCard
            title="Reserve in USD"
            value={`$${poolData.attributes.reserve_in_usd}`}
          />
          <InfoCard
            title="Volume (24h USD)"
            value={`$${poolData.attributes.volume_usd.h24}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PoolData;
