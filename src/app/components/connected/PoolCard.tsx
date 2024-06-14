import { formatAddress, formatNumber } from '@/lib/formatNumbers';
import { ClipboardIcon } from 'lucide-react';
import CopyToClipboard from 'react-copy-to-clipboard';

const PoolCard = ({ pool }: { pool: any }) => {
  return (
    <div className="bg-gray-700 rounded-lg p-4 m-2 shadow-lg dark:bg-gray-800">
      <h5 className="text-lg font-bold text-white">{pool.name}</h5>
      <div className="flex items-center space-x-2">
        <p className="text-white">Liquidity: ${formatNumber(pool.liquidity)}</p>
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

export default PoolCard;
