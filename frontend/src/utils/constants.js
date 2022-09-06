import { BigNumber } from "ethers";


export const ModalType = {
  REINVEST: 10,
  SELL: 20,
};
export const BSC_CHAIN_ID = process.env.NODE_ENV === "development" ? 56 : 56;
export const RINKEBY_CHAIN_ID = process.env.NODE_ENV === "development" ? 4 : 4;


export const BSC_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8545"
    : "https://bsc-dataseed.binance.org/";

  export const RINKEBY_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8545"
      : "https://rinkeby.infura.io/v3/";
export const RINKEBY_NAME =
    process.env.NODE_ENV === "development" ? "rinkeby-test" : "rinkeby";

export const BSC_NAME =
  process.env.NODE_ENV === "development" ? "bsc-test" : "bsc";

export const ETH_CHAIN_COIN =
  process.env.NODE_ENV === "development" ? "ETH" : "ETH";

export const CHAIN_COIN =
  process.env.NODE_ENV === "development" ? "BNB" : "BNB";

export const CHAIN_COIN_Decimal =
  process.env.NODE_ENV === "development" ? 18 : 18;

const moneyRankingList = [];
const timeRankingList = [];

const uint256MAX = BigNumber.from(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"
);
