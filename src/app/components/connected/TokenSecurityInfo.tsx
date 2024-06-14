import { useEffect, useState } from 'react';
import InfoCard from './InfoCard';
import axios from 'axios';
import { SecurityInfo } from '../types';
import { formatAddress } from '@/lib/formatNumbers';
import PoolCard from './PoolCard';

const TokenSecurityInfo = ({ tokenAddress }: { tokenAddress: string }) => {
  const [highestLiquidityPool, setHighestLiquidityPool] = useState<
    string | null
  >(null);

  const [securityInfo, setSecurityInfo] = useState<SecurityInfo | null>(null);

  useEffect(() => {
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

export default TokenSecurityInfo;
