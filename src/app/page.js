"use client"
import { useState, useEffect, useContext } from 'react'
import Banner from "@/components/Banner";

import { NFTContext } from '@/context/NFTContext';
import CarCard from '@/components/CarCard';

export default function Home() {
  const { fetchNFTs, fetchNFTsListedForMint } = useContext(NFTContext);
  // const [NFTs, setNFTs] = useState([])
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // fetchNFTs().then((items) => {
    //   setNFTs(items);
    //   console.log(items);
    // });

    fetchNFTsListedForMint().then((items) => {
      setCars(items);
      console.log("cars: ", items);
    })
  }, []);


  return (
    <div className="flex flex-col justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={(<>Discover, collect, and sell <br /> extraordinary NFTs</>)}
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
      </div>

      <div className="mt-10">
        <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
          <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">Mint Your Cars</h1>
          <div>Search Bar</div>
        </div>

        <div className="mt-3 flex flex-wrap justify-start md:justify-center">

          {cars.map((nft) => <CarCard
            key={nft.tokenId}
            nft={nft}
          />)}

          {/* {NFTs.map((nft) => <NFTCard
            key={nft.tokenId}
            nft={nft}
          />)} */}

          {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <NFTCard
              key={`nft-${i}`}
              nft={{
                i,
                name: `Nifty NFT ${i}`,
                price: (10 - i * 0.534).toFixed(2),
                seller: '0x3eb...5050',
                owner: '0x4ex...8080',
                description: 'Cool NFT on sale'
              }}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
