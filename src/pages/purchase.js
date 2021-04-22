import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Modal } from 'react-bootstrap';

import getSpotPrice from '../api/gold';

import factor from '../configs/factor';

// import scrollTo from 'gatsby-plugin-smoothscroll';

// import Layout from "../components/layout"
import LayoutNoScroll from "../components/layout-no-scroll"
// import Image from "../components/image"
import SEO from "../components/seo"

// components import
import InputNumber from 'rc-input-number';
import SignatureCanvas from 'react-signature-canvas'

// stripe
import getStripe from '../utils/stripejs'

import H3Underlined from "../components/elements/h3-underlined"

import IntroCard from "../components/cards/intro-card"
import ValidationInfoCard from "../components/cards/validation-info-card"
import PackageDealRow from "../components/cards/package-deal-row"
// Images (this feels wrong)
// import coinShadow from '../images/logo-mygold-min.png'

import ShortBanner from '../components/banners/short-banner'
// import splashHero from '../images/backgrounds/img-hero-min.jpg'
import solutionHero from '../images/backgrounds/img-solution-dark-min.jpg'
import firebase from "gatsby-plugin-firebase"
import "firebase/firestore"
import app from "firebase/app"


const format = (num) => {
  try {
    const value = parseFloat(num);
    return value.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', });
  } catch {
    return null;
  }
}

const metamaskConnect = async () => {
  try{
    if (typeof window.ethereum !== 'undefined') {
      const connected = await window.ethereum.enable();
      if (connected) {
        try{
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          return account;
        }
        catch(e){
          return false;
        }
      }
      else
      return false;
    }
    return false;
  }
  catch(e){
    return "rejected";
  }
}

const metamaskAdd = async () => {
  const tokenAddress = process.env.GATSBY_TOKEN_ADDRESS;
  const tokenSymbol = process.env.GATSBY_TOKEN_SYMBOL;
  const tokenDecimals = 18;
  const tokenImage = `${process.env.GATSBY_APP_URL}/static/${process.env.GATSBY_TOKEN_IMG}`;

  try {
    if (typeof window.ethereum !== 'undefined') {
      const wasAdded = await window.ethereum.request({
        method: 'metamask_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
				decimals: 8
          },
        },
      });
      return wasAdded;
    }
  } catch (error) {
    return false;
  }
}

const float_price = () => {
  const metal = 'XAU';
  const currency = 'AUD';

  return getSpotPrice(metal, currency, Date()).then((response) => {
    return response.data ? response.data.price: 0;
  });
};
const getPriceValue = (floatPrice) => {
  return (factor.GATSBY_USE_FLOAT === 'true' ? floatPrice : parseFloat(factor.GATSBY_BASE_PRICE))*factor.GATSBY_SCALING_FACTOR
}
const PurchasePage = () => {
  const [floatPrice, setFloatPrice] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [wallet, setWallet] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [packageSelected, setPackageSelected] = useState('');
  const [freeCoins, setFreeCoins] = useState(0);
  const [metaConnected, setMetaConnected] = useState(true);
  const [modalError, setModalError] = useState(false);

  const [coins, setCoins] = useState(50);
  const [payable, setPayable] = useState(0);

  const handleCloseModalMeta = () => setMetaConnected(true);
  const handleCloseModalError = () => setModalError(false);
  const [refreshGet, setRefreshGet] = useState(true);
  const [refreshToken, setRefreshToken] = useState(true);
  const [tokenWasAdded, setTokenWasAdded] = useState(false);


  const db = firebase.firestore();
  let price_set = false;


  useEffect(() => {
    if(!refresh || factor.GATSBY_USE_FLOAT === 'false'){
      return;
    }
    else{

		float_price().then((res) => {
			if(!price_set) {
				setFloatPrice(res);
				refreshPackage(res);
				setRefresh(false);
			}
		})
    }
    return () => price_set = true;
  }, [refresh]);

  useEffect(() => {
    if(!refresh){
      setTimeout(() => {
        if(!price_set){
			refreshPackage();
          setRefresh(true);
          setRefreshGet(true);
        }
      }, 600000);
    }
    return () => price_set = false;
  }, [refresh]);

  let state_get = false;
  useEffect(() => {
    if(!refreshGet && !refresh){
      return;
    }
    else{
		if(!state_get){
			refreshPackage();
			setRefreshGet(false);
		}
    }
    return () => state_get = true;
	}, [refreshGet]);
  useEffect(() => {

    metamaskConnect().then(async (res) =>{
      setMetaConnected(res != false? true : false);
      const wasAdd = await metamaskAdd();
      setTokenWasAdded(wasAdd);
    });
	}, [refreshToken]);
	const setPackageDetails = (coins,freeCoins,packSelected,priveValue = 0) => {
		priveValue = floatPrice != 0 ? floatPrice: priveValue;
		const price = getPriceValue(priveValue);
		const calculatedPayable = coins * price;
		setCoins(coins);
		setPayable(calculatedPayable);
		setFreeCoins(freeCoins);
		setPackageSelected(packSelected);
	}
	const refreshPackage = (priveValue = 0) => {
		if (typeof window !== 'undefined') {
			let queryString = window.location.search;
			let urlParams = new URLSearchParams(queryString);
			let packSelected = urlParams.get("package");
			switch (packSelected) {
				case "1":
				setPackageDetails(100,0,packSelected,priveValue);
				break;
				case "2":
				setPackageDetails(1000,100,packSelected,priveValue);
				break;
				case "3":
				setPackageDetails(5000,500,packSelected,priveValue);
				break;
				case "4":
				setPackageDetails(10000,1000,packSelected,priveValue);
				break;
				default:
        setPackageDetails(coins,0,null,priveValue);
				break;
      }
    }
	}

	const handleCoins = (e) => {
		const price = getPriceValue(floatPrice);
		const calculatedPayable = e * price;
		setPayable(calculatedPayable);
		setCoins(e);
		switch (e) {
			case 100:
			setPackageDetails(100,0,"1");
			break;
			case 1000:
			setPackageDetails(1000,100,"2");
			break;
			case 5000:
			setPackageDetails(5000,500,"3");
			break;
			case 10000:
			setPackageDetails(10000,1000,"4");
			break;
			default:
			setPackageSelected(null);
			setFreeCoins(0);
			break;
		}
	}

	const handlePayable = (e) => {
		const price = getPriceValue(floatPrice);
		const calculatedCoins = e / price;
		switch (calculatedCoins) {
			case 100:
			setPackageDetails(100,0,"0");
			break;
			case 1000:
			setPackageDetails(1000,100,"1");
			break;
			case 5000:
			setPackageDetails(5000,500,"2");
			break;
			case 10000:
			setPackageDetails(10000,1000,"3");
			break;
			default:
			setPackageSelected(null);
			setFreeCoins(0);
			break;
		}
		if(calculatedCoins > 10000){
			setCoins(10000);
			setPayable(10000*price);
			setPackageDetails(10000,1000,"3");
		}
		else
		{
      if(calculatedCoins < 50){
        setCoins(50);
			  setPayable(50*price);
      }
      else
      {
        setCoins(calculatedCoins);
			  setPayable(e);
      }

		}
	}

  const redirectToCheckout = async (event) => {
    event.preventDefault();
	 let element = event.target;
	 const metaConnected = await metamaskConnect();
    if (metaConnected != false && metaConnected != "rejected")
    {
      if (tokenWasAdded != true) {
        const wasAdd = await metamaskAdd();
        setTokenWasAdded(wasAdd);
      }
      setMetaConnected(true);
      if(payable != 0)
      {
        const stripe = await getStripe();
        const response = await fetch("/.netlify/functions/createCheckoutSession", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ 'payable': payable })
        })
        const session = await response.json();
        let today = new Date().toLocaleString();
        const data = {
          date: today,
          price: payable,
          amount: (coins+freeCoins).toString(),
          state: 'onProcess' // onProcess, paid, claimed
        };
        await db.collection('wallet').doc(session.id).set(data);
			let formData = new FormData(element);
			fetch('/purchase', {
				method: 'POST',
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams(formData).toString()
			}).then(() => console.log('Form successfully submitted')).catch((error) =>
				alert(error));
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          console.log(result.error.message);
        }
      }
      else
      setModalError(true);

    }
    else
    {
      if (metaConnected != "rejected")
      setMetaConnected(false);

    }
  }

  const formatPrice = (amount, currency) => {
    let price = (amount / 100).toFixed(2)
    let numberFormat = new Intl.NumberFormat(["en-AU"], {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
    })
    return numberFormat.format(price)
  }

  let sigPad = {};

  return (
    <LayoutNoScroll>
      <SEO title="Purchase" />

      {/* Hero splash row */}
      <ShortBanner
        bgImage={solutionHero}
      >
        <h1 className="text-gold font-secondary fw-700">Secure your 11::11 Tokens now</h1>
        <p className="text-gold mb-0">Become a 11::11 Token affiliate</p>
      </ShortBanner>

      {/* Form Row */}
      <Container
        fluid
        className="bg-dark-slate purchase-row"
      >
        <Container>
          <Row>
            <Col md="6" lg="8" className="col-12 mx-auto">
              <H3Underlined
                h3Text={"Your details"}
              ></H3Underlined>

              <form onSubmit={redirectToCheckout} className="purchase-form" name="purchaseForm" id="purchaseForm" method="POST" netlify="true" netlify-honeypot="bot-field">
					 <input type="hidden" name="bot-field" />
					 <input type="hidden" name="form-name" value="purchaseForm"></input>

                <div className="d-flex flex-column purchase-form-wrap">

                  <div className="d-flex flex-column flex-md-row align-items-center">
                    <label>Applicant name</label>
                    <input type="text" name="name" required defaultValue={name}/>
                  </div>

                  <div className="d-flex flex-column flex-md-row align-items-center">
                    <label>Phone Number</label>
                    <input type="text" name="phone" required defaultValue={phone}/>
                  </div>

                  <div className="d-flex flex-column flex-md-row align-items-center">
                    <label>Email Address</label>
                    <input type="email" name="email" required defaultValue={email}/>
                  </div>

                  <div className="d-flex flex-column flex-md-row align-items-center">
                    <label>Driver License / Passport</label>
                    <input type="text" name="document" required defaultValue={document}/>
                  </div>

                  <div className="d-flex flex-column flex-md-row align-items-center">
                    <label>Wallet Number</label>
                    <input type="text" name="phone" defaultValue={wallet}/>
                  </div>

                  <div className="d-flex flex-column flex-md-row sm-group align-items-center">
                    <label>Address Line 1</label>
                    <input type="text" name="line1" required defaultValue={line1}/>
                  </div>

                  <div className="d-flex flex-column flex-md-row sm-group align-items-center">
                    <label>Address Line 2</label>
                    <input type="text" name="line2" defaultValue={line2}/>
                  </div>

                  <div className="d-flex flex-column flex-md-row sm-group align-items-center">
                    <label>City</label>
                    <input type="text" name="city" required defaultValue={city}/>
                  </div>

                  <div className="d-flex flex-column flex-md-row sm-group align-items-center">
                    <label>State</label>
                    <select name="state[]" required defaultValue={state}>
                      <option value="nsw">New South Wales</option>
                      <option value="qld">Queensland</option>
                      <option value="sa">South Australia</option>
                      <option value="tas">Tasmania</option>
                      <option value="vic">Victoria</option>
                      <option value="wa">Western Australia</option>
                      <option value="o">Other</option>
                    </select>
                  </div>

                  <div className="d-flex flex-column flex-md-row sm-group mb-5 align-items-center">
                    <label>Country</label>
                    <select name="country[]" required defaultValue={country}>
                      <option value="aus">Australia</option>
                      <option value="usa">United States</option>
                      <option value="AFG">Afghanistan</option>
                      <option value="ALA">Aland Islands</option>
                      <option value="ALB">Albania</option>
                      <option value="DZA">Algeria</option>
                      <option value="ASM">American Samoa</option>
                      <option value="AND">Andorra</option>
                      <option value="AGO">Angola</option>
                      <option value="AIA">Anguilla</option>
                      <option value="ATA">Antarctica</option>
                      <option value="ATG">Antigua and Barbuda</option>
                      <option value="ARG">Argentina</option>
                      <option value="ARM">Armenia</option>
                      <option value="ABW">Aruba</option>
                      <option value="AUT">Austria</option>
                      <option value="AZE">Azerbaijan</option>
                      <option value="BHS">Bahamas</option>
                      <option value="BHR">Bahrain</option>
                      <option value="BGD">Bangladesh</option>
                      <option value="BRB">Barbados</option>
                      <option value="BLR">Belarus</option>
                      <option value="BEL">Belgium</option>
                      <option value="BLZ">Belize</option>
                      <option value="BEN">Benin</option>
                      <option value="BMU">Bermuda</option>
                      <option value="BTN">Bhutan</option>
                      <option value="BOL">Bolivia, Plurinational State of</option>
                      <option value="BES">Bonaire, Sint Eustatius and Saba</option>
                      <option value="BIH">Bosnia and Herzegovina</option>
                      <option value="BWA">Botswana</option>
                      <option value="BVT">Bouvet Island</option>
                      <option value="BRA">Brazil</option>
                      <option value="IOT">British Indian Ocean Territory</option>
                      <option value="BRN">Brunei Darussalam</option>
                      <option value="BGR">Bulgaria</option>
                      <option value="BFA">Burkina Faso</option>
                      <option value="BDI">Burundi</option>
                      <option value="KHM">Cambodia</option>
                      <option value="CMR">Cameroon</option>
                      <option value="CAN">Canada</option>
                      <option value="CPV">Cape Verde</option>
                      <option value="CYM">Cayman Islands</option>
                      <option value="CAF">Central African Republic</option>
                      <option value="TCD">Chad</option>
                      <option value="CHL">Chile</option>
                      <option value="CHN">China</option>
                      <option value="CXR">Christmas Island</option>
                      <option value="CCK">Cocos (Keeling) Islands</option>
                      <option value="COL">Colombia</option>
                      <option value="COM">Comoros</option>
                      <option value="COG">Congo</option>
                      <option value="COD">Congo, the Democratic Republic of the</option>
                      <option value="COK">Cook Islands</option>
                      <option value="CRI">Costa Rica</option>
                      <option value="CIV">Côte d'Ivoire</option>
                      <option value="HRV">Croatia</option>
                      <option value="CUB">Cuba</option>
                      <option value="CUW">Curaçao</option>
                      <option value="CYP">Cyprus</option>
                      <option value="CZE">Czech Republic</option>
                      <option value="DNK">Denmark</option>
                      <option value="DJI">Djibouti</option>
                      <option value="DMA">Dominica</option>
                      <option value="DOM">Dominican Republic</option>
                      <option value="ECU">Ecuador</option>
                      <option value="EGY">Egypt</option>
                      <option value="SLV">El Salvador</option>
                      <option value="GNQ">Equatorial Guinea</option>
                      <option value="ERI">Eritrea</option>
                      <option value="EST">Estonia</option>
                      <option value="ETH">Ethiopia</option>
                      <option value="FLK">Falkland Islands (Malvinas)</option>
                      <option value="FRO">Faroe Islands</option>
                      <option value="FJI">Fiji</option>
                      <option value="FIN">Finland</option>
                      <option value="FRA">France</option>
                      <option value="GUF">French Guiana</option>
                      <option value="PYF">French Polynesia</option>
                      <option value="ATF">French Southern Territories</option>
                      <option value="GAB">Gabon</option>
                      <option value="GMB">Gambia</option>
                      <option value="GEO">Georgia</option>
                      <option value="DEU">Germany</option>
                      <option value="GHA">Ghana</option>
                      <option value="GIB">Gibraltar</option>
                      <option value="GRC">Greece</option>
                      <option value="GRL">Greenland</option>
                      <option value="GRD">Grenada</option>
                      <option value="GLP">Guadeloupe</option>
                      <option value="GUM">Guam</option>
                      <option value="GTM">Guatemala</option>
                      <option value="GGY">Guernsey</option>
                      <option value="GIN">Guinea</option>
                      <option value="GNB">Guinea-Bissau</option>
                      <option value="GUY">Guyana</option>
                      <option value="HTI">Haiti</option>
                      <option value="HMD">Heard Island and McDonald Islands</option>
                      <option value="VAT">Holy See (Vatican City State)</option>
                      <option value="HND">Honduras</option>
                      <option value="HKG">Hong Kong</option>
                      <option value="HUN">Hungary</option>
                      <option value="ISL">Iceland</option>
                      <option value="IND">India</option>
                      <option value="IDN">Indonesia</option>
                      <option value="IRN">Iran, Islamic Republic of</option>
                      <option value="IRQ">Iraq</option>
                      <option value="IRL">Ireland</option>
                      <option value="IMN">Isle of Man</option>
                      <option value="ISR">Israel</option>
                      <option value="ITA">Italy</option>
                      <option value="JAM">Jamaica</option>
                      <option value="JPN">Japan</option>
                      <option value="JEY">Jersey</option>
                      <option value="JOR">Jordan</option>
                      <option value="KAZ">Kazakhstan</option>
                      <option value="KEN">Kenya</option>
                      <option value="KIR">Kiribati</option>
                      <option value="PRK">Korea, Democratic People's Republic of</option>
                      <option value="KOR">Korea, Republic of</option>
                      <option value="KWT">Kuwait</option>
                      <option value="KGZ">Kyrgyzstan</option>
                      <option value="LAO">Lao People's Democratic Republic</option>
                      <option value="LVA">Latvia</option>
                      <option value="LBN">Lebanon</option>
                      <option value="LSO">Lesotho</option>
                      <option value="LBR">Liberia</option>
                      <option value="LBY">Libya</option>
                      <option value="LIE">Liechtenstein</option>
                      <option value="LTU">Lithuania</option>
                      <option value="LUX">Luxembourg</option>
                      <option value="MAC">Macao</option>
                      <option value="MKD">Macedonia, the former Yugoslav Republic of</option>
                      <option value="MDG">Madagascar</option>
                      <option value="MWI">Malawi</option>
                      <option value="MYS">Malaysia</option>
                      <option value="MDV">Maldives</option>
                      <option value="MLI">Mali</option>
                      <option value="MLT">Malta</option>
                      <option value="MHL">Marshall Islands</option>
                      <option value="MTQ">Martinique</option>
                      <option value="MRT">Mauritania</option>
                      <option value="MUS">Mauritius</option>
                      <option value="MYT">Mayotte</option>
                      <option value="MEX">Mexico</option>
                      <option value="FSM">Micronesia, Federated States of</option>
                      <option value="MDA">Moldova, Republic of</option>
                      <option value="MCO">Monaco</option>
                      <option value="MNG">Mongolia</option>
                      <option value="MNE">Montenegro</option>
                      <option value="MSR">Montserrat</option>
                      <option value="MAR">Morocco</option>
                      <option value="MOZ">Mozambique</option>
                      <option value="MMR">Myanmar</option>
                      <option value="NAM">Namibia</option>
                      <option value="NRU">Nauru</option>
                      <option value="NPL">Nepal</option>
                      <option value="NLD">Netherlands</option>
                      <option value="NCL">New Caledonia</option>
                      <option value="NZL">New Zealand</option>
                      <option value="NIC">Nicaragua</option>
                      <option value="NER">Niger</option>
                      <option value="NGA">Nigeria</option>
                      <option value="NIU">Niue</option>
                      <option value="NFK">Norfolk Island</option>
                      <option value="MNP">Northern Mariana Islands</option>
                      <option value="NOR">Norway</option>
                      <option value="OMN">Oman</option>
                      <option value="PAK">Pakistan</option>
                      <option value="PLW">Palau</option>
                      <option value="PSE">Palestinian Territory, Occupied</option>
                      <option value="PAN">Panama</option>
                      <option value="PNG">Papua New Guinea</option>
                      <option value="PRY">Paraguay</option>
                      <option value="PER">Peru</option>
                      <option value="PHL">Philippines</option>
                      <option value="PCN">Pitcairn</option>
                      <option value="POL">Poland</option>
                      <option value="PRT">Portugal</option>
                      <option value="PRI">Puerto Rico</option>
                      <option value="QAT">Qatar</option>
                      <option value="REU">Réunion</option>
                      <option value="ROU">Romania</option>
                      <option value="RUS">Russian Federation</option>
                      <option value="RWA">Rwanda</option>
                      <option value="BLM">Saint Barthélemy</option>
                      <option value="SHN">Saint Helena, Ascension and Tristan da Cunha</option>
                      <option value="KNA">Saint Kitts and Nevis</option>
                      <option value="LCA">Saint Lucia</option>
                      <option value="MAF">Saint Martin (French part)</option>
                      <option value="SPM">Saint Pierre and Miquelon</option>
                      <option value="VCT">Saint Vincent and the Grenadines</option>
                      <option value="WSM">Samoa</option>
                      <option value="SMR">San Marino</option>
                      <option value="STP">Sao Tome and Principe</option>
                      <option value="SAU">Saudi Arabia</option>
                      <option value="SEN">Senegal</option>
                      <option value="SRB">Serbia</option>
                      <option value="SYC">Seychelles</option>
                      <option value="SLE">Sierra Leone</option>
                      <option value="SGP">Singapore</option>
                      <option value="SXM">Sint Maarten (Dutch part)</option>
                      <option value="SVK">Slovakia</option>
                      <option value="SVN">Slovenia</option>
                      <option value="SLB">Solomon Islands</option>
                      <option value="SOM">Somalia</option>
                      <option value="ZAF">South Africa</option>
                      <option value="SGS">South Georgia and the South Sandwich Islands</option>
                      <option value="SSD">South Sudan</option>
                      <option value="ESP">Spain</option>
                      <option value="LKA">Sri Lanka</option>
                      <option value="SDN">Sudan</option>
                      <option value="SUR">Suriname</option>
                      <option value="SJM">Svalbard and Jan Mayen</option>
                      <option value="SWZ">Swaziland</option>
                      <option value="SWE">Sweden</option>
                      <option value="CHE">Switzerland</option>
                      <option value="SYR">Syrian Arab Republic</option>
                      <option value="TWN">Taiwan, Province of China</option>
                      <option value="TJK">Tajikistan</option>
                      <option value="TZA">Tanzania, United Republic of</option>
                      <option value="THA">Thailand</option>
                      <option value="TLS">Timor-Leste</option>
                      <option value="TGO">Togo</option>
                      <option value="TKL">Tokelau</option>
                      <option value="TON">Tonga</option>
                      <option value="TTO">Trinidad and Tobago</option>
                      <option value="TUN">Tunisia</option>
                      <option value="TUR">Turkey</option>
                      <option value="TKM">Turkmenistan</option>
                      <option value="TCA">Turks and Caicos Islands</option>
                      <option value="TUV">Tuvalu</option>
                      <option value="UGA">Uganda</option>
                      <option value="UKR">Ukraine</option>
                      <option value="ARE">United Arab Emirates</option>
                      <option value="GBR">United Kingdom</option>
                      <option value="UMI">United States Minor Outlying Islands</option>
                      <option value="URY">Uruguay</option>
                      <option value="UZB">Uzbekistan</option>
                      <option value="VUT">Vanuatu</option>
                      <option value="VEN">Venezuela, Bolivarian Republic of</option>
                      <option value="VNM">Viet Nam</option>
                      <option value="VGB">Virgin Islands, British</option>
                      <option value="VIR">Virgin Islands, U.S.</option>
                      <option value="WLF">Wallis and Futuna</option>
                      <option value="ESH">Western Sahara</option>
                      <option value="YEM">Yemen</option>
                      <option value="ZMB">Zambia</option>
                      <option value="ZWE">Zimbabwe</option>
                      <option value="o">Other</option>
                    </select>
                  </div>

                  <h3>Tokens to purchase</h3>
                  <div
                      style={{
                          marginTop: 10,
                          marginBottom: 20,
                          width: 50,
                          height: 1,
                          backgroundColor: "#ff543e",
                      }}
                  ></div>
						{
							packageSelected != null ?
							<div className="row">
							<div className="mb-5 mb-lg-0 col-12 col-lg-6 d-flex col flex-column">
								<label className="mb-3">Package Selected</label>
								<p className="font-white mb-2" style={{fontSize: 32}}><strong>Package {packageSelected}</strong></p>
							</div>

							<div className="col-12 col-lg-6 d-flex col flex-column">
								<label className="mb-3">Free Coins</label>
								<p className="font-white mb-2" style={{fontSize: 32}}><strong>{freeCoins}</strong></p>
							</div>
							</div>
							: null
						}
                  <div className="row">
                    <div className="mb-5 mb-lg-0 col-12 col-lg-6 d-flex col flex-column">
                      <label className="mb-3">Number of coins</label>
                      <InputNumber
                        className="purchase-qty-input"
                        defaultValue={0}
                        min={50}
                        max={10000}
                        step={1}
                        value={coins}
                        name="coins"
                        onChange={handleCoins}
                      />
                    </div>

                    <div className="col-12 col-lg-6 d-flex col flex-column">
                      <label className="mb-3">Total Payable</label>
                      <InputNumber
                        className="purchase-qty-input"
                        defaultValue={0}
                        min={0}
                        formatter={format}
                        step={1}
                        value={payable}
                        name="payable"
                        onChange={handlePayable}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 d-flex flex-column">
                      <label className="mb-3">Signature</label>
                      <div style={{height: 300}}>
                        <SignatureCanvas
                          penColor='black'
                          backgroundColor='white'
                          canvasProps={{ className: 'sigCanvas' }}
                          ref={(ref) => { sigPad = ref }}
                        />
                      </div>

                      <div className="d-flex justify-content-end">
                        <button
                          className="mt-1 text-white btn-text text-underline"
                          type="button"
                          onClick={() => sigPad.clear() }
                        >Clear signature</button>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex purchase-terms-wrap">
                    <input
                      type="checkbox"
                      id="agreetoterms"
                      name="agreetoterms"
                      value="TermsAccepted"
                      required
                    />
                    <label>I declare that I have read the <Link className="is-underlined font-white fw-700 hover-white" to="/">Information Sheet </Link>and <Link className="is-underlined font-white fw-700 hover-white" to="/">Terms and Conditions</Link> documents and understand to my full capacity.</label>
                  </div>

                  <button className="w-100 primary-btn" type="submit">
                    Buy Today
                  </button>
                </div>
              </form>


              <Modal
                contentClassName="mg-modal"
                size="lg"
                centered
                id="#metaNoConnected"
                show={!metaConnected}
                onHide={()=>{handleCloseModalMeta()}}
              >
                <Modal.Header>
                  <div className="w-100 d-flex justify-content-between">
                    <h3 style={{color: 'white', lineHeight: "26px",}}>Please install Metamask to proceed</h3>
                    <button className="btn-text text-white" onClick={()=>{handleCloseModalMeta()}}>
                      <i className="fas fa-times text-white"></i>
                    </button>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <iframe src="https://metamask.io/" width="100%" height="700vh"></iframe>
                </Modal.Body>
                <Modal.Footer className="bg-dark-slate text-center"  style={{borderTop: '0px black', paddingTop: '0px', paddingBottom: '0.75rem'}}>
                <button className="primary-btn" onClick={()=>{handleCloseModalMeta()}}>
                Completed
                  </button>
                </Modal.Footer>
              </Modal>


              {/* Error modal */}
              <Modal id="#error" show={modalError} onHide={()=>{handleCloseModalError()}}>
                <Modal.Header closeButton> <h3 style={{color: 'black'}}>Total payable cannot be 0</h3></Modal.Header>
                <Modal.Body> Please modify the number of coins or total payable first!</Modal.Body>
              </Modal>


            </Col>
          </Row>
        </Container>
      </Container>

    </LayoutNoScroll>
    )
  }


  export default PurchasePage
