'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  isConnected?: boolean;
  address?: string;
}

declare global {
  interface Window {
    freighter?: any;
    __freighterExtensionInstalled?: boolean;
    stellar?: any;
  }
}

export default function WalletConnect({
  onConnect,
  isConnected = false,
  address = '',
}: WalletConnectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const [freighterAvailable, setFreighterAvailable] = useState(false);

  useEffect(() => {
    // Continuous Freighter detection with detailed logging
    let checkCount = 0;
    const checkFreighter = () => {
      checkCount++;
      const hasFreighter = !!window.freighter;
      const hasStellar = !!(window as any).stellar;
      
      if (checkCount === 1) {
        console.log('\n🚀 === FREIGHTER DETECTION STARTED ===');
        console.log('  window.freighter available:', hasFreighter);
        console.log('  window.stellar available:', hasStellar);
        if (hasFreighter) {
          console.log('  window.freighter methods:', Object.keys(window.freighter || {}));
        }
      }
      
      if (hasFreighter || hasStellar) {
        console.log(`✅ [%cCheck #${checkCount}%c] Freighter/Stellar detected!`, 'color: green; font-weight: bold;', 'color: inherit;');
        setFreighterAvailable(true);
      }
    };

    // Check immediately
    checkFreighter();
    
    // Keep checking every 100ms
    const interval = setInterval(checkFreighter, 100);

    // Also try on various events
    const handleEvent = () => {
      console.log(`🔄 [Event] Checking Freighter...`);
      checkFreighter();
    };
    window.addEventListener('load', handleEvent);
    window.addEventListener('focus', handleEvent);
    window.addEventListener('mousedown', handleEvent);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleEvent);
      window.removeEventListener('focus', handleEvent);
      window.removeEventListener('mousedown', handleEvent);
    };
  }, []);

  const wallets = [
    { name: 'Freighter', id: 'freighter', icon: '🔌' },
    { name: 'Stellar Lab', id: 'stellar-lab', icon: '🌟' },
    { name: 'Lobstr', id: 'lobstr', icon: '💼' },
  ];

  const handleConnect = async (walletId: string) => {
    setIsLoading(true);
    setDebugInfo('');
    
    try {
      if (walletId === 'freighter') {
        console.log('🔗 === STARTING FREIGHTER CONNECTION ===');
        let publicKey: string | null = null;
        const log: string[] = [];

        // Check 1: Is window.freighter available?
        console.log('✓ Check 1: window.freighter available?', !!window.freighter);
        log.push(`window.freighter available: ${!!window.freighter}`);

        if (window.freighter) {
          try {
            console.log('\n📍 Using window.freighter (extension injected)');
            console.log('  Available methods:', Object.keys(window.freighter));
            
            // The modern Freighter API
            // Step 1: Request access to get wallet
            console.log('  → Step 1: Requesting access...');
            try {
              await window.freighter.requestAccess();
              console.log('    ✅ Access granted');
              log.push('✅ requestAccess() succeeded');
            } catch (accessErr: any) {
              console.log('    ⚠️ requestAccess not available or rejected:', accessErr.message);
              log.push(`⚠️ requestAccess: ${accessErr.message}`);
            }

            // Step 2: Get the public key
            console.log('  → Step 2: Getting public key...');
            if (typeof window.freighter.getPublicKey === 'function') {
              publicKey = await window.freighter.getPublicKey();
              console.log('    ✅ Got public key:', publicKey);
              log.push(`✅ getPublicKey(): ${publicKey}`);
            } else {
              console.warn('    ⚠️ getPublicKey not a function');
              log.push(`⚠️ getPublicKey is ${typeof window.freighter.getPublicKey}`);
            }
          } catch (e) {
            const err = e as Error;
            console.error('  ❌ Error with window.freighter:', err.message);
            log.push(`❌ window.freighter error: ${err.message}`);
          }
        } else {
          console.warn('⚠️ window.freighter NOT available - extension not injected');
          log.push('❌ window.freighter is undefined - Freighter extension not detected');
        }

        // If that didn't work, try the npm package as fallback
        if (!publicKey) {
          console.log('\n📍 Trying @stellar/freighter-api npm package fallback...');
          try {
            const { isConnected, getAddress, requestAccess } = await import('@stellar/freighter-api');
            console.log('  Module imported successfully');
            
            // Try the current API
            if (isConnected && await isConnected()) {
              console.log('  ✅ Already connected');
              const result = await getAddress();
              publicKey = result.address;
            } else {
              console.log('  → Requesting access via npm package...');
              await requestAccess();
              console.log('  → Getting public key...');
              const result = await getAddress();
              publicKey = result.address;
            }
            log.push(`✅ npm package success: ${publicKey}`);
          } catch (e) {
            const err = e as Error;
            console.warn('  ❌ npm package failed:', err.message);
            log.push(`❌ npm package: ${err.message}`);
          }
        }

        if (!publicKey) {
          console.error('\n❌ CONNECTION FAILED');
          console.error('Full diagnostic log:', log);
          const fullLog = log.join('\n');
          
          throw new Error(
            `Freighter Connection Failed\n\n` +
            `Diagnostic:\n${fullLog}\n\n` +
            `Solutions:\n` +
            `1. Make sure you're NOT using file:// - use http://localhost:3000\n` +
            `2. Freighter must be installed and enabled in Extensions\n` +
            `3. Hard refresh page: Ctrl+Shift+R\n` +
            `4. Check DevTools (F12) → Console for "Check 1" message\n` +
            `5. If window.freighter is undefined, extension isn't injecting\n` +
            `6. Try: Disable/Enable Freighter in extensions → Reload`
          );
        }

        console.log('\n✅✅✅ SUCCESS! Connected to Freighter');
        console.log('Public Key:', publicKey);
        
        setIsOpen(false);
        onConnect?.(publicKey);
      } else {
        alert(`${walletId} support coming soon!`);
      }
    } catch (error) {
      console.error('❌ Wallet connection error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setDebugInfo(errorMessage);
      alert(`❌ Connection failed:\n\n${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const truncateAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="relative">
      {/* @ts-ignore */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          border-3 border-y2k-hotpink px-4 py-2 font-ranade font-bold
          text-xs uppercase transition-all duration-200
          ${
            isConnected
              ? 'bg-y2k-lime text-y2k-black'
              : 'bg-y2k-hotpink text-y2k-black'
          }
        `}
        type="button"
        style={{boxShadow: '0 0 10px rgba(255, 20, 147, 0.7)'}}
      >
        {isConnected ? `✓ ${truncateAddress(address)}` : 'Connect Wallet'}
      </motion.button>

      {/* Dropdown Menu */}
      {!isConnected && (
        <>
          {/* @ts-ignore */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute top-full right-0 mt-2 w-64 bg-y2k-black
              border-3 border-y2k-hotpink z-50
              ${isOpen ? 'block' : 'hidden'}
            `}
            style={{boxShadow: '0 0 15px rgba(255, 20, 147, 0.5)'}}
          >
          <div className="p-3 max-h-96 overflow-y-auto custom-scrollbar">
            <p className="font-ranade font-bold text-xs uppercase mb-3 text-y2k-hotpink">
              Select Wallet
            </p>

            {debugInfo && (
              <div className="mb-3 p-2 bg-y2k-purple text-white border-2 border-y2k-purple rounded text-xs">
                <p className="font-bold">⚠️ Error:</p>
                <p className="mt-1 whitespace-pre-wrap text-xs">{debugInfo}</p>
              </div>
            )}

            {wallets.map((wallet, idx) => (
              // @ts-ignore
              <motion.button
                key={wallet.id}
                initial={{ opacity: 0, x: -10 }}
                animate={isOpen ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleConnect(wallet.id)}
                disabled={isLoading && wallet.id !== 'freighter'}
                className={`
                  w-full p-2 mb-2 border-3 
                  text-black font-inter font-bold text-xs flex items-center justify-between
                  transition-all duration-200 last:mb-0 uppercase
                  ${
                    wallet.id === 'freighter'
                      ? 'border-y2k-hotpink bg-y2k-hotpink hover:bg-y2k-deeppink'
                      : 'border-gray-400 bg-gray-300 opacity-50 cursor-not-allowed'
                  }
                  ${isLoading && wallet.id === 'freighter' ? 'opacity-70' : ''}
                `}
                type="button"
              >
                <span>{wallet.icon} {wallet.name}</span>
                {isLoading && wallet.id === 'freighter' && <span className="animate-spin">⟳</span>}
              </motion.button>
            ))}

            <div className="mt-3 p-2 bg-y2k-dark border-2 border-y2k-purple rounded text-xs">
              <p className="font-bold text-y2k-cyan">💡 Status:</p>
              <p className={`mt-1 font-bold ${freighterAvailable ? 'text-y2k-lime' : 'text-y2k-hotpink'}`}>
                {freighterAvailable ? '✅ Freighter Detected!' : '⚠️ Freighter Not Detected'}
              </p>
              <ul className="mt-2 text-y2k-cyan space-y-1 text-xs">
                <li>✓ Extension installed?</li>
                <li>✓ Extension enabled?</li>
                <li>✓ Page refreshed?</li>
              </ul>
              <div className="mt-2 space-y-1">
                <button
                  onClick={() => handleConnect('freighter')}
                  disabled={isLoading}
                  className="w-full p-1 bg-y2k-lime text-y2k-black font-bold rounded text-xs hover:bg-y2k-cyan transition-colors disabled:opacity-50"
                >
                  🔄 Retry
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full p-1 bg-y2k-cyan text-y2k-black font-bold rounded text-xs hover:bg-y2k-lime transition-colors"
                >
                  🔄 Reload
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        </>
      )}

      {/* Backdrop */}
      {isOpen && (
        <>
          {/* @ts-ignore */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />
        </>
      )}
    </div>
  );
}
