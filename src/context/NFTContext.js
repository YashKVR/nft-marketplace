"use client"
import React, { useState, useEffect } from "react"
import Web3Modal from "web3modal"
import { ethers } from "ethers"
import axios from "axios"

import { MarketAddress, MarketAddressABI } from "./constants"

export const NFTContext = React.createContext();

const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTProvider = ({ children }) => {
    const nftCurrency = 'POL';
    const [currentAccount, setCurrentAccount] = useState("")
    const [isLoadingNFT, setIsLoadingNFT] = useState(false);

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return alert('Please install Metamask')

        const accounts = await window.ethereum.request({ method: 'eth_accounts' })

        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        }
        else {
            console.log("No Accounts found");

        }
    }

    const connectWallet = async () => {
        if (!window.ethereum) return alert('Please install Metamask');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        setCurrentAccount(accounts[0]);
        window.location.reload();
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    const fetchNFTs = async () => {
        setIsLoadingNFT(false);

        const provider = new ethers.JsonRpcProvider("https://polygon-amoy.drpc.org");
        const contract = fetchContract(provider);

        const data = await contract.fetchMarketItems();

        const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const { data: { image, name, description } } = await axios.get(tokenURI);
            const price = ethers.formatUnits(unformattedPrice.toString(), 'ether');
            const formattedImageUrl = `https://ipfs.io/ipfs/${image.slice(7)}`

            return { price, tokenId: Number(tokenId), id: Number(tokenId), seller, owner, image: formattedImageUrl, name, description, tokenURI };
        }));

        return items;
    };

    const fetchMyNFTsOrListedNFTs = async (type) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();

        const contract = fetchContract(signer);

        const data = type === 'fetchItemsListed' ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();

        const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const { data: { image, name, description } } = await axios.get(tokenURI);
            const price = ethers.formatUnits(unformattedPrice.toString(), 'ether');
            const formattedImageUrl = `https://ipfs.io/ipfs/${image.slice(7)}`

            return { price, tokenId: Number(tokenId), id: Number(tokenId), seller, owner, image: formattedImageUrl, name, description, tokenURI };
        }));
        return items;

    }

    const fetchNFTsListedForMint = async () => {
        const { data: { car_data } } = await axios.get("https://game-cibqh.ondigitalocean.app/api/private/v0/all-cars-fetch");

        const filteredData = []
        for (let i = 0; i < car_data.length; i++) {
            if (car_data[i].is_nft_listed_for_mint) {
                filteredData.push(car_data[i])
            }
        }

        return filteredData;
    }

    return (
        <NFTContext.Provider value={{ nftCurrency, currentAccount, connectWallet, fetchNFTs, isLoadingNFT, fetchMyNFTsOrListedNFTs, fetchNFTsListedForMint }}>
            {children}
        </NFTContext.Provider>
    )
}