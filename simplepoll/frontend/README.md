# SimplePoll - Decentralized Polling on Stellar

A production-grade full-stack web application for creating and voting on decentralized polls using Soroban smart contracts on the Stellar blockchain. Built with **Next.js 14**, **React**, **TypeScript**, **TailwindCSS**, and advanced animations using **Framer Motion**, **GSAP**, **Three.js**, and **Lenis**.

![Neo-Brutalism UI](https://img.shields.io/badge/UI%20Style-Neo--Brutalism-black?logoColor=white)
![Production Grade](https://img.shields.io/badge/Status-Production--Grade-green)
![Blockchain](https://img.shields.io/badge/Blockchain-Stellar%20Soroban-blue)

---

## 🎨 Features

### Frontend Excellence
- **Neo-Brutalism Design**: Bold typography, thick borders, chunky elements with exaggerated hover states
- **3D Particle Background**: WebGL-powered animated particle system using Three.js and React Three Fiber
- **Smooth Scrolling**: Lenis-powered inertia scrolling with velocity detection
- **Advanced Animations**: Framer Motion for card physics and GSAP for cinematic transitions
- **Floating UI Elements**: Books/polls that float with parallax and anti-gravity effects
- **Micro-interactions**: Subtle feedback on every interaction
- **Responsive Design**: Mobile-first, optimized for all device sizes

### Blockchain Features
- **Soroban Smart Contracts**: Decentralized poll creation and voting
- **On-Chain Verification**: All polls and votes recorded immutably on Stellar
- **Wallet Integration**: Support for Freighter, Stellar Lab, and Lobstr wallets
- **Transaction Tracking**: View blockchain confirmation and transaction hashes

### Core Functionality
- ✅ Create polls with custom questions and options
- ✅ Vote securely on polls
- ✅ Real-time results with live vote counts
- ✅ Poll search and filtering
- ✅ User dashboard for managing created polls
- ✅ Blockchain verification badges
- ✅ IPFS integration for metadata storage
- ✅ Responsive mobile experience

---

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS 4** - Utility-first styling
- **Framer Motion 10** - Animation library
- **GSAP 3** - Professional animation platform
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Three Drei** - Helper library for React Three Fiber
- **Lenis** - Smooth scroll library
- **Lottie React** - Animation playback

### Blockchain
- **Stellar SDK** - Stellar blockchain interaction
- **Soroban Client** - Smart contract interaction
- **Wallet Integration** - Multi-wallet support

### Development
- **TypeScript 5** - Type system
- **ESLint 9** - Code linting
- **PostCSS 4** - CSS processing

---

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- npm or yarn
- A Stellar wallet (Freighter, Stellar Lab, or Lobstr)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/simplepoll.git
   cd simplepoll/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   bun install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_CONTRACT_ID=your_contract_id
   NEXT_PUBLIC_NETWORK=testnet
   NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org/
   IPFS_API_KEY=your_pinata_api_key
   IPFS_SECRET_KEY=your_pinata_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
simplepoll/
├── app/
│   ├── api/
│   │   └── polls/                    # Poll API routes
│   │       ├── route.ts              # GET all, POST create
│   │       └── [id]/route.ts         # GET detailed, PUT vote
│   ├── book/
│   │   └── [id]/page.tsx             # Individual poll page
│   ├── dashboard/page.tsx            # User dashboard
│   ├── library/page.tsx              # Poll library
│   ├── globals.css                   # Global Neo-Brutalism styles
│   ├── layout.tsx                    # Root layout with Lenis
│   └── page.tsx                      # Home page
├── components/
│   ├── AnimatedHero.tsx              # Hero section with GSAP
│   ├── BookCard.tsx                  # Individual poll card
│   ├── FloatingBookGrid.tsx          # Grid of floating polls
│   ├── LenisWrapper.tsx              # Smooth scroll provider
│   ├── Navigation.tsx                # Navbar with mobile menu
│   ├── ParticleBackground.tsx       # 3D particle effect
│   ├── UploadModal.tsx               # Create poll modal
│   ├── VerificationBadge.tsx         # Blockchain verification
│   └── WalletConnect.tsx             # Wallet connection dropdown
├── lib/
│   └── soroban.ts                    # Blockchain integration
├── public/                           # Static assets
├── tailwind.config.ts                # Tailwind configuration
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
└── .env.local.example                # Environment template
```

---

## 🎬 Animation System

### Framer Motion
Used for interactive component animations:
- **Hover physics**: Cards lift and respond to mouse movement
- **Page transitions**: Smooth entrance animations
- **Floating effects**: Polls drift and bob in space
- **Interactive feedback**: Buttons and controls respond to user input

### GSAP
Used for cinematic effects:
- **Hero animations**: Letter-by-letter text reveals
- **Scroll triggers**: Elements animate as you scroll
- **Timeline sequences**: Complex multi-element animations
- **Easing functions**: Professional motion curves

### Three.js + React Three Fiber
- **Particle system**: 5000+ animated particles
- **Cursor interaction**: Particles respond to mouse movement
- **Depth simulation**: Parallax effect behind UI
- **Performance**: GPU-accelerated rendering

### Lenis
- **Smooth scrolling**: Inertia-based scroll physics
- **Scroll velocity**: Detect scroll speed for animations
- **Cross-browser**: Works consistently across devices
- **Mobile support**: Touch-optimized

---

## 🎨 Neo-Brutalism Design System

The UI follows the Neo-Brutalist design language:

### Colors
- **Black**: `#000000` - Primary borders and text
- **Yellow**: `#FFD700` - Accent and highlights
- **Blue**: `#0066FF` - Secondary actions
- **Red**: `#FF0000` - Danger actions
- **Green**: `#00CC00` - Success states
- **White**: `#FFFFFF` - Backgrounds

### Typography
- **Space Grotesk**: Headlines (700 weight, bold)
- **Inter**: Body text (400-700 weights)
- **IBM Plex Mono**: Code and technical text

### Elements
- **Thick Borders**: 4px-6px border-width
- **Strong Shadows**: Crisp drop shadows (0px 8px+)
- **No Rounded Corners**: Sharp, angular edges
- **Large Typography**: Bold, eye-catching headlines
- **Playful Layout**: Grid-based with intentional breaking

---

## 🔗 Blockchain Integration

### Smart Contract Interaction

Store polls on-chain:
```typescript
import { SorobanUtils } from '@/lib/soroban';

const txHash = await SorobanUtils.storePollOnChain(
  {
    id: '123',
    title: 'Which language?',
    author: 'user',
    options: ['TypeScript', 'Python'],
    timestamp: Date.now(),
  },
  userWalletAddress
);
```

Record votes on-chain:
```typescript
const voteTxHash = await SorobanUtils.recordVoteOnChain(
  {
    pollId: '123',
    optionIndex: 0,
    voterWallet: userAddress,
    timestamp: Date.now(),
  },
  userWalletAddress
);
```

Verify poll authenticity:
```typescript
const isVerified = await SorobanUtils.verifyPollOnChain(
  pollId,
  transactionHash
);
```

### Wallet Connection

```typescript
import WalletConnect from '@/components/WalletConnect';

<WalletConnect 
  onConnect={(walletId) => {
    // Handle wallet connection
  }}
  isConnected={isConnected}
/>
```

---

## 📱 Pages

### Home (`/`)
- Hero section with cinematic animations
- 3D particle background
- Stats overview
- Featured polls
- Feature highlights
- Call-to-action section

### Library (`/library`)
- Search all polls
- Filtering and sorting
- Grid view with floating animations
- Real-time vote counts
- Pagination support

### Poll Details (`/book/[id]`)
- Full poll information
- Live voting interface
- Real-time results with animated progress bars
- Share functionality
- Blockchain verification badge
- Transaction details

### Dashboard (`/dashboard`)
- User statistics
- Polls created by user
- Active/closed poll management
- Vote analytics
- Edit and close polls

### Create Poll (Modal)
- Title and description input
- Add/remove poll options
- Set poll duration
- Submit to blockchain
- Success confirmation

---

## 🚀 Deployment

### Environment Setup
1. Copy `.env.local.example` to `.env.local`
2. Fill in your Stellar contract details
3. Configure IPFS gateway for metadata

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Vercel will automatically build and deploy on push

```bash
# Or deploy via CLI
vercel --prod
```

### Deploy to CloudFlare Pages

```bash
# Login to CloudFlare
npx wrangler login

# Deploy
npx wrangler pages deploy ./out
```

### Deploy to AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize project
amplify init

# Deploy
amplify publish
```

---

## 📊 API Routes

### Polls Endpoints

**GET /api/polls**
- Fetch all polls
- Response: `{ success: true, data: Poll[], count: number }`

**POST /api/polls**
- Create new poll
- Body: `{ title, description, options, duration }`
- Response: `{ success: true, data: Poll }`

**GET /api/polls/[id]**
- Fetch poll details
- Response: `{ success: true, data: Poll }`

**PUT /api/polls/[id]**
- Record vote
- Body: `{ optionId, vote: true }`
- Response: `{ success: true, data: Poll }`

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

---

## 📈 Performance Optimization

- **Code Splitting**: Automatic route-based splitting with Next.js
- **Image Optimization**: Next.js Image component for automatic optimization
- **CSS Optimization**: TailwindCSS purging unused styles
- **Animation Performance**: GPU-accelerated transforms, requestAnimationFrame
- **Lazy Loading**: Components load on-demand
- **Caching**: Static generation where possible

---

## 🔒 Security

- **Environment Variables**: Sensitive data in `.env.local`
- **HTTPS Only**: All blockchain transactions use HTTPS
- **CSP Headers**: Content Security Policy configured in next.config.ts
- **Input Validation**: Client and server-side validation
- **XSS Protection**: React's built-in XSS protection

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

- Issues: GitHub Issues
- Discussions: GitHub Discussions
- Email: support@simplepoll.dev

---

## 🙏 Acknowledgments

- [Stellar Network](https://stellar.org) for blockchain infrastructure
- [Next.js](https://nextjs.org) for the web framework
- [Framer Motion](https://www.framer.com/motion/) for animations
- [GSAP](https://greensock.com/) for professional animations
- [Three.js](https://threejs.org/) for 3D graphics
- [TailwindCSS](https://tailwindcss.com) for styling

---

**Built with ❤️ for the web3 community**
