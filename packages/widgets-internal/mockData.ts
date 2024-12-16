import { ChainId } from "@pancakeswap/chains";
import { ERC20Token } from "@pancakeswap/sdk";

// For StoryBook
export const cakeToken = new ERC20Token(
  ChainId.BSC,
  "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  18,
  "CAKE",
  "SimbSwap Token",
  "https://pancakeswap.finance/"
);

export const bscToken = new ERC20Token(
  ChainId.BSC,
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  18,
  "BNB",
  "BNB",
  "https://www.binance.com/"
);
