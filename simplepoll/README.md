# SimplePoll

A decentralized polling smart contract built on the Soroban platform for the Stellar network. This project enables secure, transparent, and tamper-proof voting systems using blockchain technology.

## Project Description

SimplePoll is a Soroban smart contract that allows users to create, manage, and participate in polls on the Stellar blockchain. It leverages the security and decentralization of blockchain to ensure that votes are immutable and verifiable, making it ideal for community governance, surveys, and decision-making processes.

## What It Does

SimplePoll provides a simple yet powerful interface for:
- Creating polls with multiple options
- Casting votes securely
- Viewing real-time results
- Ensuring one vote per user per poll
- Maintaining poll integrity through smart contract logic

The contract is designed to be gas-efficient and scalable, suitable for both small community polls and larger organizational voting needs.

## Features

- **Poll Creation**: Create polls with custom questions and multiple choice options
- **Secure Voting**: Each user can vote only once per poll using their Stellar account
- **Real-time Results**: View live vote counts and percentages
- **Immutable Records**: All votes are permanently recorded on the blockchain
- **Transparent**: Anyone can verify the poll results and contract logic
- **Cross-platform**: Interact with the contract via CLI, web interfaces, or custom applications

## Deployed Smart Contract Link

[View on Stellar Lab](https://lab.stellar.org/r/testnet/contract/CAPV43GG4IGZYH4QRK7CZKYIRO6FZS4LSM4FUKG3G6GA5OFL7KYDSWQW)

## Project Structure

This repository uses the recommended structure for a Soroban project:

```
.
├── contracts
│   └── hello_world
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── Cargo.toml
└── README.md
```

- New Soroban contracts can be put in `contracts`, each in their own directory.
- Contracts should have their own `Cargo.toml` files that rely on the top-level `Cargo.toml` workspace for their dependencies.
- Frontend libraries can be added to the top-level directory as well.

## Prerequisites

- [Rust](https://rustup.rs/) (latest stable version)
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup) (install via `cargo install stellar-cli`)
- A funded Stellar account for deployment

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd simplepoll
   ```

2. Install dependencies:
   ```bash
   cargo build
   ```

## Building the Contract

To build the smart contract:

```bash
stellar contract build
```

This will generate the WASM file in `target/wasm32v1-none/release/`.

## Testing

Run the contract tests:

```bash
cargo test
```

## Deployment

1. Set up your Stellar identity:
   ```bash
   stellar keys generate <your-key-name>
   stellar keys fund <your-key-name> --network testnet
   ```

2. Deploy the contract:
   ```bash
   stellar contract deploy \
     --wasm target/wasm32v1-none/release/simplepoll.wasm \
     --source <your-key-name> \
     --network testnet \
     --alias simplepoll
   ```

## Usage

### Creating a Poll

```bash
# Example command to invoke contract (adjust based on your contract interface)
stellar contract invoke \
  --id <contract-id> \
  --source <your-key-name> \
  --network testnet \
  -- \
  create_poll \
  --question "What is your favorite color?" \
  --options '["Red", "Blue", "Green"]'
```

### Voting

```bash
stellar contract invoke \
  --id <contract-id> \
  --source <your-key-name> \
  --network testnet \
  -- \
  vote \
  --poll_id <poll-id> \
  --option 1
```

### Viewing Results

```bash
stellar contract invoke \
  --id <contract-id> \
  --source <your-key-name> \
  --network testnet \
  -- \
  get_results \
  --poll_id <poll-id>
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Soroban](https://soroban.stellar.org/) - the smart contracts platform for Stellar
- Inspired by decentralized governance and voting systems
- Thanks to the Stellar community for their support and contributions
