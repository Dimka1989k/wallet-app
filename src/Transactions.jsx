import { useState } from "react";
import { ethers } from "ethers";
import { parseEther } from "ethers";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Logo,
  Header,
  Button,
  Title,
  Container,
  ContainerForm,
  ButtonSend,
  Input,
  ContainerLink,
} from "./Transactions.styled.jsx";
import logotype from "../src/assets/metamask.svg";

const StyledContainer = styled(ToastContainer)`
  .Toastify__toast {
    background: -webkit-linear-gradient(left, #e5771b, #753d16);
    color: white;
  }

  .Toastify__progress-bar {
    background: #fff1d7;
  }
`;

const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [inputAddress, setInputAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [isInvalidAddressFormat, setIsInvalidAddressFormat] = useState(false);

  const handleAddressInputChange = (event) => {
    setInputAddress(event.target.value);
    setIsInvalidAddressFormat(!addressRegex.test(event.target.value));
  };

  const showToast = (message) => {
    toast(message);
  };

  const addressRegex = /^0x[a-fA-F0-9]{40}$/;

  const handleAmountInputChange = (event) => {
    setInputAmount(event.target.value);
  };

  const isChecksumAddress = (address) => {
    try {
      const checksumAddress = ethers.utils.getAddress(address);
      return checksumAddress === address;
    } catch (error) {
      return false;
    }
  };

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setIsWalletConnected(true);
          setDefaultAccount(result[0]);
          getUserBalance(result[0]);
        })
        .catch((error) => {
          console.error(error);
          setIsWalletConnected(false);
        });
    } else {
      setErrorMessage("Install MetaMask please!!");
    }
  };

  const getUserBalance = async (accountAddress) => {
    if (ethers && ethers.formatEther) {
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [String(accountAddress), "latest"],
        });

        setUserBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error("Error fetching balance:", error);
        setUserBalance(null);
      }
    } else {
      console.error("ethers or formatEther is undefined");
    }
  };

  const sendTransaction = async (event) => {
    event.preventDefault();
    if (inputAddress && defaultAccount && inputAmount) {
      setIsLoading(true);

      if (isNaN(inputAmount) || parseFloat(inputAmount) <= 0) {
        setIsLoading(false);
        showToast(
          "Invalid amount! Amount must be a valid number greater than 0."
        );
        return;
      }

      try {
        const amountInWei = parseEther(inputAmount);

        const transaction = {
          to: inputAddress,
          value: amountInWei,
          gasLimit: 2000000,
        };

        const transactionHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transaction],
        });

        console.log("Transaction sent:", transactionHash);
        setIsLoading(false);
        showToast("Transaction successful!");
      } catch (error) {
        console.error("Error sending transaction:", error);
        setIsLoading(false);
        showToast("Transaction failed!");
      }
    } else {
      showToast("Address and amount fields are required!");
    }
  };

  return (
    <>
      <Header>
        <Logo src={logotype} alt={logotype} />
        {!isWalletConnected && (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
        {isWalletConnected && (
          <Container>
            <Title>
              {userBalance !== null
                ? parseFloat(userBalance).toFixed(2)
                : "0.00"}
            </Title>
            {typeof defaultAccount === "string" && (
              <Title>
                {defaultAccount.substring(0, 5)}…
                {defaultAccount.substring(defaultAccount.length - 4)}
              </Title>
            )}
          </Container>
        )}
      </Header>
      <center>
        <ContainerForm onSubmit={sendTransaction}>
          <Input
            type="text"
            placeholder="Address"
            value={inputAddress}
            onChange={handleAddressInputChange}
          />
          {isInvalidAddressFormat && (
            <div
              style={{
                color: "red",
                fontSize: "10px",
                position: "absolute",
                top: "70px",
              }}
            >
              Invalid Ethereum address format!
            </div>
          )}

          <Input
            type="number"
            placeholder="Amount"
            min="0.000001"
            step="0.1"
            value={inputAmount}
            onChange={handleAmountInputChange}
          />
          <ButtonSend
            type="submit"
            onClick={sendTransaction}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </ButtonSend>
        </ContainerForm>
        <StyledContainer />
        {inputAddress &&
          isWalletConnected &&
          !isChecksumAddress(inputAddress) && (
            <div style={{ color: "red" }}>
              Invalid Ethereum address checksum!
            </div>
          )}

        {errorMessage}
        <ContainerLink>
          <a
            href="https://github.com/Dimon1989k/wallet-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </a>
        </ContainerLink>
      </center>
    </>
  );
};

export default MetaMask;
