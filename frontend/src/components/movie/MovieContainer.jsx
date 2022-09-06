import { useEffect, useState } from "react";
import { ethers } from 'ethers'
// import Web3Modal from "web3modal";
import { message, Button, Spin } from 'antd';

import dataService from "../../service/dataService";
import MediaCard from "../common/MediaCard";
import styles from './index.css';
import { useHistory } from 'react-router-dom';
import {setTheme} from "../common/theme";

import Statistic from "../common/Statistic";

import ThemeSwitch from "../common/ThemeSwitch";

import {
  connectWalletHandler,
  checkWalletIsConnected,
} from "../../utils/connectUtil";

import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const projectId = "2EJLXd43olPvCLiOP0MTUiSk3dM";
const projectSecret = "6b8e34124d3dd04a205335bf97863758";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

import simpleTokenArtifact from '../../contracts/SimpleToken.json'
import contractAddress from '../../contracts/contract-address.json'
import deployerAccount from '../../contracts/deployer.json'

let simpleTokenContractAddress = contractAddress.contractAddress;
//get the contract deployer
const contractDeployer = deployerAccount.deployer;
let networkError = '';
const HARDHAT_NETWORK_ID = '4'

function MovieContainer() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [dark, setDark] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [tokenData, setTokenData] = useState({});
  const [movieName, setMovieName] = useState('');
  const [movieId, setMovieId] = useState(0);
  const [showUpload, setShowUpload] = useState(false);

  const [nftOwner, setNftOwner] = useState("");
  const [isUpload, setIsupload] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  let currentPage = 1;
  const pageSize = 10;

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const simpleToken = new ethers.Contract(
    simpleTokenContractAddress,
    simpleTokenArtifact.abi,
    provider.getSigner(0)
  )
  console.log("simpleToken:", simpleToken)
  
  let totalPage;
  useEffect( async() => {
    dataService.get().then((response) => {
      let sourceList = response.data.results
      totalPage = sourceList.length / pageSize
      getList(sourceList);
      localStorage.setItem("FILMLISTM", JSON.stringify(response.data.results));
    });
    // _getAddress();
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log("getAddress account: ", account);
    // _checkNetwork();
    setSelectedAddress(account);
    return ()=>{
      setData([]);
    }
  }, []);
  
  useEffect(() => {
    // if(!_checkNetwork()) return;
    // checkWalletIsConnected();
    simpleToken.on("Transfer", (from, to, value) => {
      message.success(`NFT id为：${value}的NFT已经被地址${to} Mint成功`);
      // init();
      // console.log(from, to, value.toString());
    });
  }, []);
  
  //
  const getList = async (sourceList)=>{
      let tempList = [];
      const listLen = sourceList.length;
      sourceList.forEach(async (item)=>{
        // console.log("item:", item)
        const mintData = await getContractMint(item.id);
        // console.log("mintData:", mintData)
        item.isMinted = mintData;
        tempList.push(item);
        if(tempList.length === listLen) {
          setData(tempList);
        }
      })
      const count = await simpleToken.getTotalSupply();
      // console.log("count:", count)
      const totalSupply = count.toString()
      // console.log("totalSupply:", totalSupply)
      setCount(totalSupply);
  }

 const saveToIpfs = async (e) =>{
    e.preventDefault();
    let file = e.target.files[0];
    try {
      const added = await ipfs.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
        const imageHashCode = added.cid.toString();
      // let imageHashUrl = 'https://ipfs.io/ipfs/'+hashCode
      console.log("saveToIpfs hashCode:", 'https://ipfs.io/ipfs/'+imageHashCode)
      mint(movieName, imageHashCode);
    } catch (err) {
      console.error(err);
    }
  }

  // 
  const downLoad =(link, filename, id) =>{
    setMovieId(id)
    console.log("download id:", id)
    console.log("downLoad filename:", filename)
    let a = document.createElement('a')
    a.href = link
    a.target = "_blank"
    a.download = filename || 'default.png'
    a.dispatchEvent(new MouseEvent('click'));

    setTimeout(()=>{
      setShowUpload(true)
      setMovieName(filename)
    }, 0) 
  }

  const _checkNetwork = () => {
    console.log("window.ethereum.networkVersion:", window.ethereum.networkVersion)
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true
    }
    message.warning('Please connect Metamask to Rinkeby');
    return false
  }

  const _contractMint = async (addr, tokenURI, id) => {
    const res = await simpleToken.mint(addr, tokenURI, id);
    return res;
  }
  // mint NFT
  const mint = async (name, imageHash) => {  
    try {
      const nameAdded = await ipfs.add(name, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const nameHashCode = nameAdded.cid.toString();

      const metaData = JSON.stringify({
        movie_title: nameHashCode,
        image_uri: imageHash
      });
      console.log("metaData:", metaData)
      const metaDataAdded = await ipfs.add(metaData, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const res = await _contractMint( selectedAddress, metaDataAdded.cid.toString(), movieId);
      console.log("_contractMint res:", res)
      // setSelectedAddress(account);
      console.log("setSelectedAddress:", selectedAddress)
      setTimeout(()=>{

        message.success("Mint Success");
      }, 10)
    } catch (err) {
      console.error(err);
    }
  } 
  const getContractMint = async (id) =>{
    const res = await simpleToken.getMintRecord(id);
    return res;
  }
  return (
    
    <div className="main-container">
     <ThemeSwitch />
      <div className="connect-wallet">
        <Button
          type="primary"
          shape="round"
          className="wallet-btn"
          onClick={() => {
            connectWalletHandler();
          }}
        >
          Connect wallet
        </Button>
      </div>

      <div className="total-container">
          <Statistic 
            totalSupply={100}
            minted={count}
          />
      </div>
      {
        showUpload && 
        <div className="main" >
       Upload image to Mint your NFT: <input type="file" onChange={saveToIpfs} />
      </div>
        // <UploadModal />
      }
      
      <h1 className="title"> Movies Now Playing </h1>
      <div className='container'>
      {data
        .map((element) => (
          <MediaCard
            key={element.id}
            movieId={element.id}
            title={element.title}
            imageUrl={element.poster_path}
            backUrl={element.backdrop_path}
            toNext={()=> history.push(`/film/${element.id}`)}
            downLoad={downLoad}
            isMinted={element.isMinted}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieContainer;
