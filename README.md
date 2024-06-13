# perpetual-contract-analyzer

使用OKEX的API获取所有永续合约交易对，并进行数据分析。筛选符合以下指标的交易对：1. MA均线4小时图中MA3向上穿过MA55。2. 每次交易的振幅在3%-5%之间。3. 不属于横盘状态的交易对。

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/perpetual-contract-analyzer.git
cd perpetual-contract-analyzer
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
