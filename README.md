# Stellar Development Bootcamp 🚀

A comprehensive full-stack development bootcamp featuring two cutting-edge decentralized applications built on the **Stellar Soroban blockchain** with modern web technologies.

## 🎬 Project Demo

Click below to watch the full demo 👇

[![Watch Demo](https://img.youtube.com/vi/hVSH87A518s/0.jpg)](https://youtu.be/hVSH87A518s)

```
███████╗████████╗███████╗██╗     ██╗      █████╗ ██████╗ 
██╔════╝╚══██╔══╝██╔════╝██║     ██║     ██╔══██╗██╔══██╗
███████╗   ██║   █████╗  ██║     ██║     ███████║██████╔╝
╚════██║   ██║   ██╔══╝  ██║     ██║     ██╔╔═██║██╔══██╗
███████║   ██║   ███████╗███████╗███████╗██║ ╚███║██║  ██║
╚══════╝   ╚═╝   ╚══════╝╚══════╝╚══════╝╚═╝  ╚══╝╚═╝  ╚═╝
```

---

## 📚 Projects Overview

This bootcamp contains two innovative blockchain applications:

### 1. **SimplePoll** - Decentralized Polling Platform
A full-featured polling application with Web3 integration and immutable on-chain voting records.

**Tech Stack:**
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Blockchain:** Stellar Soroban Smart Contracts
- **Styling:** Y2K Neon Aesthetic with custom animations
- **Fonts:** Golden, Adobe Casion Italic, Ranade, Libre Baskerville, Sreda
- **Animations:** Framer Motion, custom CSS keyframes with GPU acceleration
- **Wallet:** Freighter API for Stellar integration

**Key Features:**
- 🗳️ Create and vote on decentralized polls
- 🔗 Immutable vote recording on Stellar blockchain
- 💎 Y2K Neon UI with doodle animations
- 📱 Fully responsive design
- 🎨 Smooth scrolling with performance optimizations
- 👛 Freighter wallet integration

📂 **Location:** `/simplepoll`

---

### 2. **Hello Contract** - Soroban Smart Contract
A foundational Rust smart contract demonstrating core Soroban patterns and best practices.

**Tech Stack:**
- **Language:** Rust
- **Framework:** Soroban SDK
- **Network:** Stellar Testnet
- **Build:** Cargo with WASM compilation

**Key Features:**
- 📖 Educational contract examples
- 🧪 Test suite demonstrations
- 🔧 Build and deployment workflow

📂 **Location:** `/hello_contract`

---

## 🛠️ Prerequisites

Ensure you have the following installed:

- **Node.js** 18.0+ (for frontend development)
- **Rust** 1.72+ (for contract development)
- **npm** or **yarn** (Node package manager)
- **Cargo** (Rust package manager)
- **Git** (version control)

### Optional but Recommended:
- **Freighter Wallet Extension** - For Stellar blockchain interaction
- **Visual Studio Code** - Recommended editor with extensions:
  - Rust-analyzer
  - TypeScript Vue Plugin (Volar)
  - Tailwind CSS IntelliSense

---

## 🚀 Quick Start

### SimplePoll Frontend

```bash
# Navigate to frontend directory
cd simplepoll/frontend

# Install dependencies (with legacy peer deps for React 19)
npm install --legacy-peer-deps

# Start development server
npm run dev
```

**Access:** http://localhost:3000

### Hello Contract (Soroban)

```bash
# Navigate to contract directory
cd hello_contract/contracts/hello-world

# Build the contract
make build

# Run tests
make test
```

---

## 📁 Project Structure

```
bootcamp/
├── simplepoll/                    # Decentralized polling application
│   ├── frontend/                  # Next.js frontend
│   │   ├── app/                   # Next.js app directory
│   │   ├── components/            # React components
│   │   ├── lib/                   # Utility functions (Soroban integration)
│   │   ├── public/                # Static assets
│   │   ├── tailwind.config.ts     # Tailwind configuration with custom fonts
│   │   ├── tsconfig.json          # TypeScript config
│   │   ├── next.config.ts         # Next.js config
│   │   └── package.json           # Dependencies
│   ├── contracts/                 # Smart contracts (future)
│   ├── README.md                  # SimplePoll documentation
│   └── DEPLOYMENT.md              # Deployment guide
│
├── hello_contract/                # Soroban smart contract
│   ├── contracts/
│   │   └── hello-world/           # Hello World contract
│   │       ├── src/               # Rust source code
│   │       ├── Cargo.toml         # Rust dependencies
│   │       └── Makefile           # Build commands
│   ├── README.md                  # Contract documentation
│   └── target/                    # Build output
│
└── README.md                      # This file
```

---

## 🎨 SimplePoll Features

### Design System
- **Color Palette:** Hot Pink (#FF1493), Cyan (#00FFFF), Deep Pink (#FF10F0), Purple (#9D00FF)
- **Typography:** 
  - Golden (Gluten) for logo
  - Ranade for headings
  - Adobe Casion Italic for cursive text
  - Libre Baskerville for serif elements
- **Visual Effects:** Neon glows, metallic chrome gradients, animated doodles

### Performance Optimizations
- GPU acceleration with `transform: translateZ(0)`
- `will-change` properties for smooth animations
- Custom scrollbar with performance hints
- Reduced motion preferences support
- Optimized animations: float (3s), pulse (2s), spin (4s), swish (4s)

### Layout
- Sidebar navigation with stats widget
- Main content grid (4-column layout)
- Featured Polls section with grid display
- All Polls section with scrollable list
- Dynamic poll cards with hover effects

---

## 🔗 Blockchain Integration

### Soroban Smart Contracts
SimplePoll integrates with Stellar Soroban for immutable poll recording:

```typescript
// Example: Storing poll on-chain
const txHash = await storePollOnChain({
  title: "Best Programming Language?",
  options: ["Rust", "TypeScript", "Python"],
  author: walletAddress,
  timestamp: Date.now()
}, walletAddress);
```

### Freighter Wallet Integration
- Connect Stellar accounts
- Sign transactions
- Safe wallet address display
- Automatic connection state management

---

## 📖 Documentation

### SimplePoll
- **[README.md](./simplepoll/README.md)** - Project overview and features
- **[DEPLOYMENT.md](./simplepoll/DEPLOYMENT.md)** - Setup and deployment guide

### Hello Contract
- **[README.md](./hello_contract/README.md)** - Contract overview

---

## 🔧 Development Commands

### SimplePoll Frontend

```bash
cd simplepoll/frontend

# Development
npm run dev         # Start dev server at localhost:3000

# Build & Production
npm run build       # Production build
npm run start       # Start production server

# Linting & Quality
npm run lint        # Run ESLint
npm run type-check  # TypeScript checking
```

### Hello Contract

```bash
cd hello_contract/contracts/hello-world

# Build WASM contract
make build

# Run tests
make test

# Clean build artifacts
make clean
```

---

## 🚢 Deployment

### SimplePoll Frontend Deployment

**Vercel (Recommended):**
```bash
# Connect your GitHub repo to Vercel dashboard
# Auto-deploys on main branch push
```

**Manual Deployment:**
```bash
npm run build
npm run start
```

### Soroban Contract Deployment

```bash
# Deploy to Stellar Testnet
soroban contract invoke \
  --network testnet \
  --id CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

See [DEPLOYMENT.md](./simplepoll/DEPLOYMENT.md) for detailed instructions.

---

## 🎯 Key Technologies

| Category | Technology | Version |
|----------|-----------|---------|
| **Frontend** | Next.js | 16.1.6 |
| | React | 19.2.3 |
| | TypeScript | 5.x |
| | Tailwind CSS | 4.0.0 |
| **Animation** | Framer Motion | Latest |
| | GSAP | Latest |
| **Blockchain** | Soroban SDK | Latest |
| | Stellar | Testnet |
| **Wallet** | Freighter API | Latest |
| **Styling** | CSS Animations | Custom |

---

## 🎓 Learning Outcomes

By completing this bootcamp, you'll learn:

1. **Full-Stack Web Development**
   - Modern React with TypeScript
   - Next.js 16 app directory patterns
   - Tailwind CSS advanced styling
   - Custom CSS animations and performance optimization

2. **Blockchain Development**
   - Soroban smart contract basics
   - Stellar network integration
   - Wallet connections and signatures
   - On-chain data storage

3. **UI/UX Design**
   - Y2K aesthetic design principles
   - Animation and microinteractions
   - Responsive design patterns
   - Accessibility considerations

4. **DevOps & Deployment**
   - Git workflow and GitHub collaboration
   - Environment configuration
   - Production builds
   - Blockchain testnet interaction

---

## 🐛 Troubleshooting

### Freighter Wallet Not Detected
```
Solution: 
1. Install Freighter extension from Chrome Web Store
2. Hard refresh: Ctrl+Shift+R
3. Check DevTools Console (F12) for connection logs
```

### Build Errors
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Soroban Contract Build Issues
```bash
# Update Rust
rustup update

# Clean and rebuild
make clean && make build
```

---

## 📞 Support & Resources

### Documentation
- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Docs](https://soroban.stellar.org/)
- [Next.js Guide](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community
- Stellar Discord: https://discord.gg/stellar
- Soroban Issues: https://github.com/stellar/soroban-docs/issues

---

## 📋 Checklist for First-Time Setup

- [ ] Install Node.js 18+
- [ ] Clone this repository
- [ ] Install npm dependencies (`npm install --legacy-peer-deps`)
- [ ] Create `.env.local` file with configuration
- [ ] Start dev server (`npm run dev`)
- [ ] Open http://localhost:3000
- [ ] Connect Freighter wallet
- [ ] Create your first poll!

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## ✨ Acknowledgments

- **Stellar Foundation** - Soroban blockchain infrastructure
- **Vercel** - Next.js framework and deployment platform
- **Tailwind Labs** - Tailwind CSS framework
- **React Team** - React library and ecosystem

---

## 🚀 What's Next?

- [ ] Deploy to mainnet
- [ ] Add multi-signature polls
- [ ] Implement governance tokens
- [ ] Advanced analytics dashboard
- [ ] Mobile app with React Native
- [ ] DAO integration

---

**Last Updated:** March 2026  
**Made with ❤️ in the Stellar Bootcamp**
