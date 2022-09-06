
import { useEffect } from "react";
import { message } from "antd";
import {
  BSC_CHAIN_ID,
  BSC_URL,
  BSC_NAME,
  CHAIN_COIN,
  CHAIN_COIN_Decimal,
} from "./constants";
export const connectWalletHandler = async (
  onSuccess
) => {
  const { ethereum } = window;

  if (!ethereum) {
    message.error("Please install Metamask!");
  }

  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Found an account! Address: ", accounts[0]);
    message.success(`Found an account! Address: ${accounts[0]}`);
    // onSuccess?.(accounts[0]);
  } catch (err) {
    console.error(err);
  }
};

export const checkWalletIsConnected = async (
  onSuccess
) => {
  // if window hidden , not do anything
  if (document.hidden) {
    return;
  }
  const { ethereum } = window;

  if (!ethereum) {
    message.warn("Make sure you have Metamask installed!");
    return;
  }

  const accounts = await ethereum.request({ method: "eth_accounts" });
  if (accounts.length !== 0) {
    const account = accounts[0];
    onSuccess?.(account);
    if (ethereum?.networkVersion !== String(BSC_CHAIN_ID)) {
      // todo switch network
      try {
        // await ethereum.request({
        //   method: "wallet_switchEthereumChain",
        //   params: [{ chainId: `0x${BSC_CHAIN_ID.toString(16)}` }],
        // });
      } catch (switchError) {
        console.log(switchError, "switchError");
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${BSC_CHAIN_ID.toString(16)}`,
                  chainName: BSC_NAME,
                  rpcUrls: [BSC_URL],
                  nativeCurrency: {
                    name: CHAIN_COIN,
                    symbol: CHAIN_COIN,
                    decimals: CHAIN_COIN_Decimal,
                  },
                },
              ],
            });
          } catch (addError) {
            message.error("add bsc network error");
            console.error(addError, "addError");
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
      return;
    }
  } else {
    console.error("No authorized account found");
    connectWalletHandler(onSuccess);
  }
};
