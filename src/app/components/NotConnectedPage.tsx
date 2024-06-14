import { PulseBeams } from './ui/PulseBeam';
import SparklesText from './ui/sparkles';

const NotConnectedPage = ({
  isConnected,
  open,
}: {
  isConnected: boolean;
  open: () => void;
}) => {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center pt-[20%]">
        <SparklesText text="Token" />
        <SparklesText text="Sight" />
      </div>
      <PulseBeams
        onClick={() => {
          if (isConnected) {
            open();
          } else {
            open();
          }
        }}
        label={isConnected ? 'Connected' : 'Connect'}
      />
    </main>
  );
};

export default NotConnectedPage;
