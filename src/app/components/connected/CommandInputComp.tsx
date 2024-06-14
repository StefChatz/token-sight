import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { ApiTokenResponse, ApiPoolResponse } from '../types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ShinyButton from '@/components/ui/shinyButton';
import { CommandDialog } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface CommandInputCompProps {
  setSearchAddress: (address: string) => void;
  setTokenData: (data: any) => void;
  setIsToken: (isToken: boolean) => void;
  isToken: boolean;
  className?: string;
}

const CommandInputComp = ({
  setSearchAddress,
  setTokenData,
  setIsToken,
  isToken,
  className,
}: CommandInputCompProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localInputValue, setLocalInputValue] = useState('');
  const [localIsToken, setLocalIsToken] = useState(null);
  const { toast } = useToast();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

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
      const url = localIsToken
        ? `https://api.geckoterminal.com/api/v2/networks/${network}/tokens/${address}`
        : `https://api.geckoterminal.com/api/v2/networks/${network}/pools/${address}?include=base_token`;

      try {
        setLoading(true);
        const response = await axios.get<ApiTokenResponse | ApiPoolResponse>(
          url
        );
        console.log('API Response:', response.data);

        setSearchAddress(response.data.data.attributes.address);
        setTokenData(response.data.data.attributes);
        setIsToken(localIsToken);
        setOpen(false);
      } catch (error: any) {
        toast({
          title: 'API Error',
          variant: 'destructive',
          description: error.message,
        });
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className={className}>
      <ShinyButton onClick={() => setOpen(true)}>
        <p className="text-sm">
          Press{' '}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-700 px-1.5 font-mono text-[10px] font-medium text-white opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </ShinyButton>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <form onSubmit={handleFormSubmit}>
          <Input
            placeholder="Enter a Token or Pool address..."
            className="w-full rounded-b-none focus-visible:ring-0"
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
    </div>
  );
};

export default CommandInputComp;
