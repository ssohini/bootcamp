# SimplePoll Deployment & Setup Guide

## 🚀 Complete Setup Instructions

### Phase 1: Local Development

#### 1.1 Prerequisites
- Node.js 18+ (or Bun 1.0+)
- npm/yarn/bun
- A Stellar wallet (create at: https://stellar.org)
- Git for version control

#### 1.2 Clone & Install
```bash
# Clone the repository
git clone https://github.com/yourusername/simplepoll.git
cd simplepoll/frontend

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Create environment file
cp .env.local.example .env.local
```

#### 1.3 Configure Environment
Edit `.env.local`:
```env
# Soroban Contract Configuration
NEXT_PUBLIC_CONTRACT_ID=CAU4XHPZ3HXW4Q4L7Z7C7K7K7C7K7K7C7K7K7C7K7K7C7K7K7C7K7K
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org/

# IPFS Configuration (optional, for metadata storage)
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud
IPFS_API_KEY=your_pinata_api_key
IPFS_SECRET_KEY=your_pinata_secret_key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### 1.4 Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

---

### Phase 2: Smart Contract Deployment

#### 2.1 Setup Rust Environment
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"

# Add WebAssembly target
rustup target add wasm32-unknown-unknown

# Install Soroban CLI
cargo install soroban-cli --locked
```

#### 2.2 Deploy Contract to Testnet
```bash
cd simplepoll/contracts/simplepoll

# Build for WebAssembly
cargo build --target wasm32-unknown-unknown --release

# Deploy contract (using Makefile)
make deploy NETWORK=testnet

# Or manually:
soroban contract deploy \
  --network testnet \
  --source <your-public-key> \
  --wasm target/wasm32-unknown-unknown/release/simplepoll.wasm
```

Get your `CONTRACT_ID` and update `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ID=<deployed-contract-id>
```

---

### Phase 3: Frontend Deployment

#### Option A: Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_CONTRACT_ID
vercel env add IPFS_API_KEY
vercel env add IPFS_SECRET_KEY

# Deploy to production
vercel --prod
```

#### Option B: Deploy to CloudFlare Pages

```bash
# Install CloudFlare CLI
npm install -g @cloudflare/wrangler

# Login
wrangler login

# Build project
npm run build

# Deploy
wrangler pages deploy ./out
```

Files configuration in `wrangler.toml`:
```toml
[env.production]
vars = { NEXT_PUBLIC_CONTRACT_ID = "your-contract-id" }
```

#### Option C: Deploy to AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Configure environment
amplify secret add IPFS_API_KEY

# Deploy
amplify publish
```

#### Option D: Deploy to Docker (Self-hosted)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t simplepoll:latest .
docker run -p 3000:3000 -e NEXT_PUBLIC_CONTRACT_ID=<id> simplepoll:latest
```

---

### Phase 4: DNS & Domain Setup

#### 4.1 Custom Domain (Vercel)
```bash
# Add domain in Vercel dashboard
# or via CLI:
vercel domains add yourdomain.com
```

#### 4.2 DNS Configuration
Point your domain to:
- **Vercel**: `cname.vercel-dns.com`
- **CloudFlare**: `example.pages.dev` (CNAME)
- **AWS Amplify**: Amplify-provided DNS

#### 4.3 SSL Certificate
Automatic with all providers above.

---

### Phase 5: Monitoring & Analytics

#### 5.1 Setup Google Analytics
```bash
# Add to .env.local
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G_XXXXXXXXXX
```

Update `layout.tsx`:
```typescript
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### 5.2 Error Monitoring (Sentry)
```bash
# Install Sentry
npm install @sentry/nextjs

# Configure
npx @sentry/wizard@latest --integration nextjs
```

#### 5.3 Vercel Analytics
Automatic with Vercel deployment.

---

### Phase 6: Security Checklist

- [ ] Enable HTTPS (automatic with all providers)
- [ ] Set Content Security Policy headers
- [ ] Validate user input on client & server
- [ ] Sanitize blockchain transaction data
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted origins
- [ ] Implement rate limiting on API routes
- [ ] Add Web Application Firewall (WAF) rules
- [ ] Enable DDoS protection
- [ ] Regular security audits

---

### Phase 7: Performance Optimization

#### 7.1 Image Optimization
```bash
# Optimize images in public/
npx imagemin public/** --out-dir=public
```

#### 7.2 Bundle Analysis
```bash
npm install -g webpack-bundle-analyzer
# Then: npm run build
```

#### 7.3 Core Web Vitals
Check Lighthouse score:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

```bash
# Test locally
npm run build
npm start
# Open Chrome DevTools > Lighthouse
```

---

### Phase 8: Backup & Disaster Recovery

```bash
# Backup contract data
soroban contract invoke \
  --network testnet \
  --id CAU4XHPZ3HXW4Q4L7Z7C7K7K7C7K7K7C7K7K7C7K7K7C7K7K7C7K7K \
  --fn export_data

# Backup database (if using)
pg_dump simplepoll_db > backup_$(date +%Y%m%d).sql

# Test recovery procedure monthly
```

---

### Troubleshooting

#### Issue: "Cannot find module '@react-three/fiber'"
```bash
npm install --legacy-peer-deps
```

#### Issue: "Contract not found"
```bash
# Verify contract ID
soroban contract info --network testnet --id CAU4...

# Redeploy if needed
make deploy NETWORK=testnet
```

#### Issue: "Wallet connection fails"
- Check if using testnet network
- Try different wallet (Freighter, Stellar Lab)
- Clear browser cache and cookies

#### Issue: "Animations laggy on mobile"
```typescript
// In animation component:
const preferReducedMotion = 
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!preferReducedMotion) {
  // Run animations
}
```

---

### Maintenance Tasks

#### Weekly
- Monitor application logs
- Check blockchain transaction status
- Verify wallet connectivity

#### Monthly
- Update dependencies: `npm update`
- Security audits with `npm audit`
- Performance testing
- Backup critical data

#### Quarterly
- Major dependency updates
- Contract function audits
- Security penetration testing
- User feedback review

---

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build production
npm start                # Start production server
npm run lint             # Run linter

# Contracts
make build               # Build contract
make deploy NETWORK=testnet  # Deploy contract
make test                # Run contract tests
make invoke              # Invoke contract function
```

---

### Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Guide](https://vercel.com/docs)
- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Guide](https://developers.stellar.org/soroban)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🎉 Deployment Complete!

Your SimplePoll application is now live. Share the URL with your community and start creating decentralized polls!

**Questions?** Check the [README](../README.md) or open an issue on GitHub.