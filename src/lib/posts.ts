import fs from 'fs';
import path from 'path';

export interface PostFrontmatter {
  title: string;
  slug: string;
  publishedAt: string;
  author: string;
  focusKeyword: string;
  excerpt: string;
  coverImage: string;
  categories: string[];
  keyTakeaways: string[];
}

export interface Post extends PostFrontmatter {
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

function parseYamlValue(value: string): string | string[] {
  const trimmed = value.trim();
  if (trimmed.startsWith('[')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
  }
  return trimmed.replace(/^['"]|['"]$/g, '');
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatterBlock = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  let currentKey = '';
  let isArray = false;
  let arrayValues: string[] = [];

  const lines = frontmatterBlock.split('\n');
  for (const line of lines) {
    if (line.match(/^\s*-\s+/) && isArray) {
      arrayValues.push(line.replace(/^\s*-\s+/, '').replace(/^['"]|['"]$/g, '').trim());
      continue;
    }

    if (isArray && currentKey) {
      data[currentKey] = arrayValues;
      isArray = false;
      arrayValues = [];
    }

    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const val = kvMatch[2].trim();
      if (val === '' || val === '[]') {
        isArray = true;
        arrayValues = [];
      } else {
        data[currentKey] = parseYamlValue(val);
      }
    }
  }

  if (isArray && currentKey) {
    data[currentKey] = arrayValues;
  }

  return { data, content };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return getDefaultPosts();

  const slugs = fs.readdirSync(POSTS_DIR).filter((f) => fs.statSync(path.join(POSTS_DIR, f)).isDirectory());

  if (slugs.length === 0) return getDefaultPosts();

  const posts: Post[] = [];

  for (const slug of slugs) {
    const filePath = path.join(POSTS_DIR, slug, 'index.mdx');
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(raw);

    posts.push({
      title: (data.title as string) || slug,
      slug,
      publishedAt: (data.publishedAt as string) || new Date().toISOString(),
      author: (data.author as string) || 'Yosef Kamel',
      focusKeyword: (data.focusKeyword as string) || '',
      excerpt: (data.excerpt as string) || '',
      coverImage: (data.coverImage as string) || '',
      categories: Array.isArray(data.categories) ? (data.categories as string[]) : [],
      keyTakeaways: Array.isArray(data.keyTakeaways) ? (data.keyTakeaways as string[]) : [],
      content,
    });
  }

  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((p) => p.categories.includes(category));
}

export function getAllCategories(): { slug: string; label: string }[] {
  return [
    { slug: 'crypto-news', label: 'Crypto News' },
    { slug: 'crypto-guides', label: 'Crypto Guides' },
    { slug: 'crypto-investing', label: 'Crypto Investing' },
    { slug: 'crypto-reviews', label: 'Crypto Reviews' },
  ];
}

function getDefaultPosts(): Post[] {
  return [
    {
      title: 'Bitcoin Surges Past $100K: What It Means for Your Portfolio',
      slug: 'bitcoin-surges-past-100k',
      publishedAt: '2024-12-15',
      author: 'Yosef Kamel',
      focusKeyword: 'Bitcoin price surge',
      excerpt:
        'Bitcoin has shattered the $100,000 barrier for the first time. We break down the catalysts, what institutional players are doing, and how you should position your portfolio right now.',
      coverImage:
        'http://img.b2bpic.net/premium-photo/vibrant-illustration-businessman-celebrating-success-with-dynamic-colors-expressive-movements_34926-7829.jpg',
      categories: ['crypto-news', 'crypto-investing'],
      keyTakeaways: [
        'Bitcoin crossed $100K driven by institutional ETF inflows',
        'On-chain metrics suggest strong holder conviction',
        'Diversification remains critical even in bull markets',
        'Set clear profit-taking targets to lock in gains',
      ],
      content:
        '## The Historic Milestone\n\nBitcoin has officially crossed the $100,000 mark, cementing its status as the most significant financial asset of the 21st century. This is not just a number — it represents a paradigm shift in how the world views decentralised money.\n\n## What Drove the Surge?\n\nThe confluence of spot Bitcoin ETF approvals, the April 2024 halving, and massive institutional accumulation created a perfect storm. BlackRock\'s iShares Bitcoin Trust alone has accumulated over $30 billion in assets under management.\n\n## What Should Investors Do Now?\n\nWhile the euphoria is palpable, smart investors know that discipline wins over emotion. Consider rebalancing your portfolio, setting stop-losses, and never investing more than you can afford to lose.\n\n## Looking Ahead\n\nAnalysts are now eyeing $150K as the next major resistance level. Whether we get there in weeks or months, the trajectory is unmistakably bullish. Stay informed, stay disciplined, and let the data guide your decisions.',
    },
    {
      title: 'The Complete Beginner\'s Guide to Cryptocurrency Investing in 2025',
      slug: 'beginners-guide-crypto-investing-2025',
      publishedAt: '2024-12-10',
      author: 'Yosef Kamel',
      focusKeyword: 'crypto investing guide',
      excerpt:
        'New to crypto? This comprehensive guide walks you through everything — from setting up your first wallet to building a diversified crypto portfolio that matches your risk tolerance.',
      coverImage:
        'http://img.b2bpic.net/free-photo/study-halls-biology-digital-illustrations_456031-75.jpg',
      categories: ['crypto-guides', 'crypto-investing'],
      keyTakeaways: [
        'Start with reputable exchanges like Coinbase or Kraken',
        'Never share your private keys or seed phrases',
        'Begin with Bitcoin and Ethereum before exploring altcoins',
        'Dollar-cost averaging reduces timing risk significantly',
      ],
      content:
        '## Why Cryptocurrency?\n\nCryptocurrency represents the most accessible wealth-building opportunity of our generation. Unlike traditional markets, crypto never sleeps, has no minimum investment, and is open to anyone with an internet connection.\n\n## Step 1: Choose Your Exchange\n\nStart with a regulated, reputable exchange. Coinbase, Kraken, and Binance are solid choices depending on your region. Look for strong security practices, insurance on deposits, and intuitive interfaces.\n\n## Step 2: Secure Your Assets\n\nSecurity is non-negotiable. Enable two-factor authentication, use a hardware wallet for long-term holdings, and never — ever — share your seed phrase with anyone.\n\n## Step 3: Build Your Portfolio\n\nBegin with the blue chips: Bitcoin (BTC) and Ethereum (ETH). As you learn more, you can explore promising Layer 2s, DeFi protocols, and emerging projects. Always do your own research.\n\n## Step 4: Stay Consistent\n\nDollar-cost averaging (DCA) is your best friend. Invest a fixed amount regularly regardless of price. This strategy removes emotion from the equation and smooths out volatility.',
    },
    {
      title: 'Ethereum vs Solana: Which Blockchain Deserves Your Investment in 2025?',
      slug: 'ethereum-vs-solana-2025',
      publishedAt: '2024-12-05',
      author: 'Yosef Kamel',
      focusKeyword: 'Ethereum vs Solana',
      excerpt:
        'The battle between Ethereum and Solana intensifies. We compare fees, speed, ecosystem maturity, and investment potential to help you decide where to allocate capital.',
      coverImage:
        'http://img.b2bpic.net/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg',
      categories: ['crypto-reviews', 'crypto-investing'],
      keyTakeaways: [
        'Ethereum leads in ecosystem maturity and total value locked',
        'Solana offers superior speed and lower transaction costs',
        'Both chains have strong developer communities',
        'Consider holding both for maximum diversification',
      ],
      content:
        '## The Two Titans\n\nEthereum and Solana represent two fundamentally different visions for the future of blockchain. Ethereum prioritises decentralisation and security; Solana optimises for speed and cost. Both approaches have merit.\n\n## Performance & Fees\n\nSolana processes up to 65,000 transactions per second with fees often below $0.01. Ethereum\'s Layer 1 handles around 15 TPS with higher fees, though Layer 2 solutions like Arbitrum and Optimism are closing the gap rapidly.\n\n## Ecosystem & TVL\n\nEthereum dominates with over $50 billion in total value locked across DeFi protocols. Solana\'s TVL has surged to $8 billion, driven by explosive growth in meme coins and a resurgent NFT scene.\n\n## Our Verdict\n\nBoth chains deserve a place in a well-diversified crypto portfolio. Ethereum is the safer, more established bet. Solana offers higher upside potential with commensurately higher risk. Allocate accordingly.',
    },
    {
      title: 'Top 5 Crypto Wallets Reviewed: Security, Ease of Use & Features',
      slug: 'top-5-crypto-wallets-reviewed',
      publishedAt: '2024-11-28',
      author: 'Yosef Kamel',
      focusKeyword: 'best crypto wallets',
      excerpt:
        'Your crypto is only as safe as your wallet. We tested and reviewed the top 5 crypto wallets of 2025, ranking them on security, user experience, and supported assets.',
      coverImage:
        'http://img.b2bpic.net/free-photo/blurred-hotel-reception_1203-89.jpg',
      categories: ['crypto-reviews', 'crypto-guides'],
      keyTakeaways: [
        'Ledger Nano X remains the gold standard for hardware wallets',
        'MetaMask is essential for Ethereum DeFi interaction',
        'Phantom leads for Solana ecosystem users',
        'Always verify you are downloading official wallet software',
      ],
      content:
        '## Why Your Wallet Matters\n\nIn crypto, you are your own bank. That means the security and reliability of your wallet directly determines the safety of your assets. A poor wallet choice can lead to devastating losses.\n\n## 1. Ledger Nano X\n\nThe Ledger Nano X remains our top pick for cold storage. Its Secure Element chip, Bluetooth connectivity, and support for 5,500+ assets make it the most versatile hardware wallet available.\n\n## 2. MetaMask\n\nThe undisputed king of Ethereum wallets. MetaMask\'s browser extension and mobile app provide seamless access to thousands of dApps, from Uniswap to Aave.\n\n## 3. Phantom\n\nIf you\'re active on Solana, Phantom is non-negotiable. Its sleek interface, built-in swap feature, and NFT gallery make it the best Solana wallet by a wide margin.\n\n## 4. Trust Wallet\n\nBacked by Binance, Trust Wallet supports dozens of blockchains and offers a built-in dApp browser. Great for multi-chain users who want a single mobile solution.\n\n## 5. Rabby Wallet\n\nThe rising star for power users. Rabby\'s transaction preview feature shows you exactly what a smart contract will do before you sign — a game-changer for DeFi safety.',
    },
    {
      title: 'DeFi Yield Farming Explained: How to Earn Passive Income with Crypto',
      slug: 'defi-yield-farming-explained',
      publishedAt: '2024-11-20',
      author: 'Yosef Kamel',
      focusKeyword: 'DeFi yield farming',
      excerpt:
        'Yield farming can generate substantial passive income, but the risks are real. This guide explains how DeFi yield farming works, the best strategies, and how to avoid common traps.',
      coverImage:
        'http://img.b2bpic.net/premium-photo/lizard-sweater-contemplating-sunset_1150025-79783.jpg',
      categories: ['crypto-guides', 'crypto-investing'],
      keyTakeaways: [
        'Yield farming involves providing liquidity to DeFi protocols for rewards',
        'Impermanent loss is the biggest risk — understand it before committing',
        'Start with established protocols like Aave, Compound, or Curve',
        'Never chase unsustainable APYs above 100% — they rarely last',
      ],
      content:
        '## What Is Yield Farming?\n\nYield farming is the practice of depositing your crypto assets into decentralised finance (DeFi) protocols to earn rewards. Think of it as earning interest on your crypto, but with significantly higher potential returns — and risks.\n\n## How It Works\n\nWhen you provide liquidity to a decentralised exchange like Uniswap or Curve, you earn a share of the trading fees generated by that pool. Many protocols also distribute governance tokens as additional incentives.\n\n## The Risks You Must Understand\n\nImpermanent loss occurs when the price ratio of your deposited assets changes. Smart contract bugs can drain entire pools. And sky-high APYs often collapse as more capital enters the pool. Due diligence is not optional.\n\n## Getting Started Safely\n\nStick to battle-tested protocols with audited smart contracts. Aave, Compound, and Curve have proven track records. Start small, learn the mechanics, and scale up gradually as your confidence grows.',
    },
    {
      title: 'Breaking: SEC Approves Spot Ethereum ETF — A New Era for Crypto',
      slug: 'sec-approves-spot-ethereum-etf',
      publishedAt: '2024-11-15',
      author: 'Yosef Kamel',
      focusKeyword: 'Ethereum ETF approved',
      excerpt:
        'The SEC has officially approved spot Ethereum ETFs, opening the floodgates for institutional capital. Here is what this historic decision means for ETH price and the broader market.',
      coverImage:
        'http://img.b2bpic.net/premium-photo/person-business-businesswoman-woman-adult-female-smiling-portrait-office-horizontal-photog_1064589-402141.jpg',
      categories: ['crypto-news'],
      keyTakeaways: [
        'Spot Ethereum ETFs are now approved for trading on major exchanges',
        'Institutional inflows could drive ETH to new all-time highs',
        'Staking yield makes ETH ETFs potentially more attractive than BTC ETFs',
        'Regulatory clarity continues to improve for the broader crypto industry',
      ],
      content:
        '## The Approval\n\nAfter months of anticipation, the SEC has given the green light to multiple spot Ethereum ETF applications. This landmark decision follows the successful launch of spot Bitcoin ETFs earlier in the year.\n\n## Why This Matters\n\nInstitutional investors who were previously unable or unwilling to hold ETH directly can now gain exposure through familiar, regulated investment vehicles. This dramatically expands Ethereum\'s addressable market.\n\n## Price Implications\n\nIf the Bitcoin ETF launch is any guide, we could see billions in inflows within the first few months. Some analysts are projecting ETH could reach $8,000-$10,000 as institutional demand ramps up.\n\n## The Bigger Picture\n\nThis approval signals a broader shift in regulatory attitude toward cryptocurrency. With both BTC and ETH now available as regulated ETF products, the line between traditional finance and crypto continues to blur.',
    },
  ];
}
