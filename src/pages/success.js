import React, { useState, useEffect} from "react"
// import { Link } from "gatsby"

import LayoutNoScroll from "../components/layout-no-scroll"
import SEO from "../components/seo"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ShortBanner from '../components/banners/short-banner'
import solutionHero from '../images/backgrounds/img-solution-dark-min.jpg'
import { ethers } from "ethers"
import firebase from "gatsby-plugin-firebase"
import "firebase/firestore"
import app from "firebase/app"

const getValidate = async (sessionId2) => {
  return await fetch("/.netlify/functions/validateCheckoutSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ 'sessionId': sessionId2})
  })
}
const metamaskSendCoins = async (amount) => {
  if (typeof window.ethereum !== 'undefined') {
    const connected = await window.ethereum.enable()
    if ( connected )
    {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let privateKey = `0x${process.env.GATSBY_PRIVATE_WALLET_KEY}`;
      let wallet = new ethers.Wallet(privateKey,provider);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const send = async () => {

        var contractAddress = process.env.GATSBY_STRIPE_CONTRACT_ADDRESS;
        var contractAbi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"Snapshot","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SNAPSHOT_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"image","type":"string"}],"name":"_setCMImage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"url","type":"string"}],"name":"_setCMURL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"snapshotId","type":"uint256"}],"name":"balanceOfAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cmContractType","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cmImage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cmURL","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"snapshot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"snapshotId","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        var contract = new ethers.Contract(contractAddress, contractAbi, wallet);

        var numberOfTokens = ethers.utils.parseUnits(amount,8);
        console.log("amount ", amount);
        console.log("numberOfTokens ", numberOfTokens);
        console.log("account ", account);


        // Send tokens
        try{
            let response = await contract.transfer(account, numberOfTokens);
            console.log(response);
            return true;
        } 
        catch(e)
        {
          return e;
        }
      };

      return await send();
    }
    return false;
  }
  return false;
}

const ContactUsPage = () => {

  const [name, setName] = useState('');
  const [refresh, setRefresh] = useState(true);
  const db = firebase.firestore();

  let state_get = false;
  useEffect(() => {
    if(!refresh){
      return;
    }
    else{
      if (typeof window !== 'undefined' && !state_get) {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let sessionId = urlParams.get("sessionId");
        setName("Your transaction is in progress, please wait.");
        getValidate(sessionId).then( async (res) => {
          const session = await res.json();
          const dataFire = db.collection('wallet').doc(sessionId);
          const doc = await dataFire.get();
          let data = doc.data();
          console.log(data, doc);

          if (session.session.payment_status == "unpaid")
          setName("An error occurred. The payment status is 'Un paid', please try again later or contact the administrator.");
          else
          {
            if(data && res.status == 200){
              if(data.state == 'onProcess')
              {
                db.collection('wallet').doc(sessionId).set(data);
                const transactStatus = await metamaskSendCoins(data.amount.toString());
                console.log(transactStatus);
					 let today = new Date().toLocaleString();
                if(transactStatus == true){
                  data.state = 'claimed';
                  data.date_claimed = today;
                  db.collection('wallet').doc(sessionId).set(data);
                  setName(`Your ${parseInt(data.amount) > 1 ? data.amount+' coins': 'coin'} has been successfully added to your wallet.`);
                }
                else {
                  if(transactStatus.error != undefined )
                  setName(`An error occurred - ${transactStatus.error.error.message}. Please try again later or contact the administrator.`);
                  else{
                    console.log(transactStatus);
                    setName("An error occurred, please contact the administrator.");
                  }
                }
              }
              else
              setName(`Your ${parseInt(data.amount) > 1 ? data.amount+' coins': 'coin'} has already been added to your wallet.`);
            }
            else
            setName("An error occurred, please contact the administrator.");
          }
        });
      }
      setRefresh(false);
    }
    return () => state_get = true;
  }, [refresh]);






  return (<LayoutNoScroll>
    <SEO title="Transaction success" />

    {/* Hero splash row */}
    <ShortBanner
    bgImage={solutionHero}
    >
    <h1 className="text-gold font-secondary fw-700">{name}</h1>
    </ShortBanner>

    <Container fluid className="bg-dark-slate sub-page-padding" style={{minHeight: "38.2vh", maxHeight: "40.8vh"}}>
    <Container>
    <Row>
    <Col md="6" lg="8" className="col-12 mx-auto">
    </Col>
    </Row>
    </Container>
    </Container>
    </LayoutNoScroll>)
  }

  export default ContactUsPage
