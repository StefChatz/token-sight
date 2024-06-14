'use client';

import Link from 'next/link';
import useScroll from '@/lib/use-scroll';
import { HandCoins } from 'lucide-react';

export default function NavBar() {
  const scrolled = useScroll(50);

  return (
    <>
      <div
        className={`fixed top-0 w-full flex justify-center z-50 transition-all duration-300 ${
          scrolled
            ? 'border-gray-200/50 bg-white/10 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-1xl">
            <span className="text-white font-bold text-lg">Token Sight</span>
          </Link>
          <div className="flex items-center space-x-4">
            <w3m-button />
          </div>
        </div>
      </div>
    </>
  );
}
