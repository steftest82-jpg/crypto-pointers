import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crypto Glossary — 50+ Cryptocurrency Terms Defined',
  description:
    'A comprehensive glossary of cryptocurrency and blockchain terms. From Bitcoin and DeFi to Layer 2 and tokenomics — every crypto term explained in plain English.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    title: 'Crypto Glossary — 50+ Terms Defined | Crypto Pointers',
    description: 'Every crypto term explained in plain English. The definitive cryptocurrency glossary for investors.',
    type: 'website',
  },
};

interface Term {
  term: string;
  definition: string;
  related?: string;
}

const glossaryTerms: Term[] = [
  { term: 'Airdrop', definition: 'A distribution of free tokens to wallet addresses, often used to reward early adopters or promote new projects.', related: '/blog/crypto-airdrops-guide' },
  { term: 'Altcoin', definition: 'Any cryptocurrency other than Bitcoin. Includes Ethereum, Solana, Cardano, and thousands of smaller tokens.', related: '/blog/altcoin-season-indicators' },
  { term: 'AMM (Automated Market Maker)', definition: 'A decentralized exchange mechanism that uses liquidity pools and mathematical formulas instead of order books to determine asset prices.', related: '/blog/liquidity-pools-explained' },
  { term: 'Bear Market', definition: 'A prolonged period of declining prices, typically defined as a 20% or greater drop from recent highs. Characterized by pessimism and reduced trading activity.', related: '/blog/crypto-bear-market-survival' },
  { term: 'Bitcoin (BTC)', definition: 'The first and largest cryptocurrency by market cap, created in 2009 by the pseudonymous Satoshi Nakamoto. A decentralized digital currency that operates on a proof-of-work blockchain.', related: '/blog/bitcoin-hits-150k-2026' },
  { term: 'Block', definition: 'A collection of transaction data that is bundled together and added to the blockchain. Each block contains a cryptographic hash of the previous block, creating a chain.' },
  { term: 'Blockchain', definition: 'A distributed, immutable ledger technology that records transactions across a network of computers. Each block is cryptographically linked to the previous one.', related: '/blog/understanding-blockchain-technology' },
  { term: 'Bridge', definition: 'A protocol that enables the transfer of tokens and data between different blockchain networks. Examples include Wormhole and Stargate.', related: '/blog/cross-chain-bridges-guide' },
  { term: 'Bull Market', definition: 'A sustained period of rising prices, characterized by optimism, increased investment, and growing market confidence.' },
  { term: 'CBDC (Central Bank Digital Currency)', definition: 'A digital form of fiat currency issued and regulated by a central bank. Examples include China digital yuan and the proposed digital euro.', related: '/blog/cbdc-interoperability-standard-2026' },
  { term: 'CEX (Centralized Exchange)', definition: 'A cryptocurrency exchange operated by a company that acts as an intermediary between buyers and sellers. Examples: Coinbase, Binance, Kraken.', related: '/blog/coinbase-exchange-review' },
  { term: 'Cold Wallet', definition: 'A cryptocurrency wallet that is not connected to the internet, providing enhanced security for long-term storage. Hardware wallets like Ledger and Trezor are cold wallets.', related: '/blog/ledger-nano-x-review-2025' },
  { term: 'DAO (Decentralized Autonomous Organization)', definition: 'An organization governed by smart contracts and token-holder voting rather than traditional corporate hierarchy.', related: '/blog/dao-governance-participation' },
  { term: 'DCA (Dollar-Cost Averaging)', definition: 'An investment strategy where a fixed amount is invested at regular intervals regardless of price, reducing the impact of volatility over time.', related: '/blog/dollar-cost-averaging-crypto' },
  { term: 'DeFi (Decentralized Finance)', definition: 'Financial services built on blockchain networks that operate without traditional intermediaries like banks. Includes lending, borrowing, trading, and insurance.', related: '/blog/defi-lending-borrowing-guide' },
  { term: 'DePIN (Decentralized Physical Infrastructure)', definition: 'Blockchain networks that coordinate the deployment and operation of real-world physical infrastructure through token incentives.', related: '/blog/depin-top-projects-2026' },
  { term: 'DEX (Decentralized Exchange)', definition: 'A cryptocurrency exchange that operates without a central authority, using smart contracts to facilitate peer-to-peer trading. Examples: Uniswap, Jupiter.', related: '/blog/uniswap-dex-review' },
  { term: 'Ethereum (ETH)', definition: 'The second-largest cryptocurrency and the leading smart contract platform. Supports DeFi, NFTs, and thousands of decentralized applications.', related: '/blog/ethereum-staking-yield-analysis' },
  { term: 'ETF (Exchange-Traded Fund)', definition: 'A regulated investment vehicle that tracks the price of an asset and can be traded on traditional stock exchanges. Spot Bitcoin and Ethereum ETFs are now available.', related: '/blog/bitcoin-etf-inflows-hit-record-2025' },
  { term: 'EVM (Ethereum Virtual Machine)', definition: 'The runtime environment for smart contracts on Ethereum and EVM-compatible chains like Polygon, Arbitrum, and BNB Chain.' },
  { term: 'Gas Fee', definition: 'The cost paid to process a transaction on a blockchain network. On Ethereum, gas fees vary based on network congestion.', related: '/blog/understanding-gas-fees' },
  { term: 'Halving', definition: 'A programmed event where the Bitcoin block reward is cut in half, occurring approximately every four years. Reduces new BTC supply and historically precedes bull markets.', related: '/blog/bitcoin-post-halving-cycle-2026' },
  { term: 'Hash Rate', definition: 'The total computational power being used to mine and process transactions on a proof-of-work blockchain. Higher hash rate means greater network security.' },
  { term: 'HODL', definition: 'A crypto community term meaning to hold assets long-term rather than selling during volatility. Originated from a misspelling of "hold" in a 2013 Bitcoin forum post.' },
  { term: 'Hot Wallet', definition: 'A cryptocurrency wallet connected to the internet, offering convenience for frequent trading but higher security risk compared to cold wallets.', related: '/blog/metamask-wallet-review' },
  { term: 'Impermanent Loss', definition: 'The difference in value between holding tokens in a liquidity pool versus simply holding them in a wallet. Occurs when the price ratio of pooled tokens changes.' },
  { term: 'Layer 1 (L1)', definition: 'The base blockchain network (e.g., Bitcoin, Ethereum, Solana) that processes and finalizes transactions directly on its own chain.', related: '/blog/layer-1-comparison-investment' },
  { term: 'Layer 2 (L2)', definition: 'A secondary network built on top of a Layer 1 blockchain to improve scalability and reduce fees. Examples: Arbitrum, Optimism, Base, zkSync.', related: '/blog/layer-2-scaling-explained' },
  { term: 'Liquidity Pool', definition: 'A collection of tokens locked in a smart contract that provides liquidity for decentralized trading. Liquidity providers earn fees from trades.', related: '/blog/liquidity-pools-explained' },
  { term: 'MEV (Maximal Extractable Value)', definition: 'The maximum value that can be extracted from block production beyond standard block rewards, often through transaction reordering or front-running.', related: '/blog/mev-protection-guide' },
  { term: 'Mining', definition: 'The process of using computational power to validate transactions and create new blocks on a proof-of-work blockchain like Bitcoin.' },
  { term: 'Multisig (Multi-Signature)', definition: 'A wallet that requires multiple private key signatures to authorize a transaction, providing enhanced security for teams and organizations.', related: '/blog/safe-multisig-wallet-review' },
  { term: 'NFT (Non-Fungible Token)', definition: 'A unique digital token that represents ownership of a specific asset such as art, music, or collectibles on a blockchain.', related: '/blog/nft-creation-guide-2025' },
  { term: 'On-Chain', definition: 'Refers to transactions or data that are recorded directly on the blockchain, as opposed to off-chain activity.' },
  { term: 'Oracle', definition: 'A service that provides real-world data to smart contracts on a blockchain. Chainlink is the most widely used oracle network.', related: '/blog/chainlink-oracle-review' },
  { term: 'Private Key', definition: 'A cryptographic key that proves ownership of cryptocurrency and is required to sign transactions. Must be kept secret — anyone with your private key controls your funds.' },
  { term: 'Proof of Stake (PoS)', definition: 'A consensus mechanism where validators stake cryptocurrency as collateral to verify transactions. Used by Ethereum, Solana, and most modern blockchains.', related: '/blog/crypto-staking-complete-guide' },
  { term: 'Proof of Work (PoW)', definition: 'A consensus mechanism where miners compete to solve complex mathematical puzzles to validate transactions and create new blocks. Used by Bitcoin.' },
  { term: 'Restaking', definition: 'The practice of using already-staked ETH to provide security for additional protocols, earning multiple layers of yield. Pioneered by EigenLayer.', related: '/blog/restaking-guide-2026' },
  { term: 'RWA (Real-World Assets)', definition: 'Traditional financial assets such as real estate, bonds, and commodities that have been tokenized and brought on-chain.', related: '/blog/rwa-tokenization-how-to-invest' },
  { term: 'Seed Phrase', definition: 'A 12 or 24-word recovery phrase that can restore access to a cryptocurrency wallet. Must be stored securely offline — never share it with anyone.' },
  { term: 'Smart Contract', definition: 'Self-executing code deployed on a blockchain that automatically enforces the terms of an agreement when predetermined conditions are met.', related: '/blog/smart-contracts-explained' },
  { term: 'Stablecoin', definition: 'A cryptocurrency pegged to a stable asset like the US dollar. Examples include USDT (Tether), USDC (Circle), and DAI (MakerDAO).', related: '/blog/stablecoin-yield-strategies-2026' },
  { term: 'Staking', definition: 'The process of locking cryptocurrency in a network to support blockchain operations (like transaction validation) in exchange for rewards.', related: '/blog/crypto-staking-complete-guide' },
  { term: 'Token', definition: 'A digital asset created on an existing blockchain (as opposed to a coin which has its own blockchain). ERC-20 tokens on Ethereum are the most common.' },
  { term: 'Tokenomics', definition: 'The economic design of a cryptocurrency token, including supply mechanics, distribution, utility, and incentive structures.', related: '/blog/tokenomics-evaluation-guide' },
  { term: 'TVL (Total Value Locked)', definition: 'The total amount of cryptocurrency deposited in a DeFi protocol. Used as a key metric to measure a protocol adoption and trust.' },
  { term: 'Validator', definition: 'A node operator in a proof-of-stake network that verifies transactions and proposes new blocks. Validators stake cryptocurrency as collateral.' },
  { term: 'Wallet', definition: 'Software or hardware that stores your private keys and allows you to send, receive, and manage cryptocurrency. Types include hot wallets, cold wallets, and smart wallets.', related: '/blog/how-to-set-up-a-crypto-wallet' },
  { term: 'Web3', definition: 'The vision of a decentralized internet built on blockchain technology, where users own their data, identity, and digital assets.' },
  { term: 'Whale', definition: 'An individual or entity that holds a large amount of cryptocurrency, whose trading activity can significantly impact market prices.' },
  { term: 'Yield Farming', definition: 'A DeFi strategy where users move assets between protocols to maximize returns from trading fees, liquidity incentives, and governance token rewards.' },
  { term: 'Zero-Knowledge Proof (ZKP)', definition: 'A cryptographic method that allows one party to prove something is true without revealing the underlying data. Used for privacy and scaling (ZK rollups).', related: '/blog/zero-knowledge-proofs-explained' },
];

// Group terms by first letter
const grouped = glossaryTerms.reduce<Record<string, Term[]>>((acc, term) => {
  const letter = term.term[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(term);
  return acc;
}, {});

const letters = Object.keys(grouped).sort();

const glossaryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Crypto Pointers Cryptocurrency Glossary',
  description: 'A comprehensive glossary of cryptocurrency and blockchain terms.',
  url: 'https://cryptopointers.com/glossary',
  hasDefinedTerm: glossaryTerms.map(t => ({
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.definition,
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
      />

      {/* Header */}
      <section className="relative bg-gradient-to-b from-text/[0.04] via-bg to-bg">
        <div className="container-wide pt-12 md:pt-16 pb-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-text/40">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></li>
              <li className="font-semibold text-text/60">Glossary</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
            Crypto <span className="gradient-text">Glossary</span>
          </h1>
          <p className="text-lg text-text/55 leading-relaxed max-w-2xl mb-8">
            Every cryptocurrency and blockchain term explained in plain English.
            From beginner basics to advanced DeFi concepts — your definitive reference guide.
          </p>
          {/* Letter navigation */}
          <div className="flex flex-wrap gap-2">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold text-text/60 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="container-wide py-12 md:py-16">
        <div className="max-w-4xl">
          {letters.map(letter => (
            <div key={letter} id={`letter-${letter}`} className="mb-12">
              <div className="sticky top-16 md:top-[72px] z-10 bg-bg/95 backdrop-blur-sm py-2 mb-4 border-b-2 border-primary/20">
                <h2 className="text-2xl font-extrabold text-primary">{letter}</h2>
              </div>
              <dl className="space-y-6">
                {grouped[letter].map(item => (
                  <div key={item.term} className="group">
                    <dt className="text-lg font-bold text-text mb-1">{item.term}</dt>
                    <dd className="text-sm text-text/65 leading-relaxed">
                      {item.definition}
                      {item.related && (
                        <Link
                          href={item.related}
                          className="inline-flex items-center gap-1 ml-2 text-primary font-semibold hover:text-secondary transition-colors"
                        >
                          Learn more
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
