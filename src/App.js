import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import logo from './images/logo.png';
import india from './images/india.svg';
import logoNic from './images/nic_logo.png';
import logoMinistry from './images/Min_logo.png'
import './App.css';
import Navigation from "./nav";
import { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { ArrowLeftCircle, ArrowRightCircle, Shop,Book, FileExcel, Postcard, Folder, Calculator, Rainbow, PeopleFill, Speaker, PcDisplay, GeoFill, Bank,Fingerprint, Printer} from 'react-bootstrap-icons';
// import { XYChart } from "@amcharts/amcharts4/charts";
import Charts from "./containers/xyChart";
import PieChart from "./containers/pieChart";
// import Chart from "./containers/Chart";

function App() {
  const [posEnabled, setPosEnabled] = useState([]);
  const [stateAllocation, setStateAllocation] = useState([]);
  const [centralAllocation, setCentralAllocation] = useState([]);
  const [FairPriceShops, setFairPriceShops] = useState([]);
  const [Beneficiaries, setBeneficiaries] = useState([]);
  const [rationCards, setRationCards] = useState([]);
  const [rationCardAAY, setRationCardAAY] = useState([]);
  const [rationCardPHH, setRationCardPHH] = useState([]);
  const [BeneficiariesAAY, setBeneficiariesAAY] = useState([]);
  const [BeneficiariesPHH, setBeneficiariesPHH] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios("http://impds.nic.in/fps/Dashboard/Details")
    //   .then((response) => {
    //     console.log("Data: ",response);

    //     setPosEnabled(response.data.posEnabled);
    //     setStateAllocation(response.data.stateAllocation);
    //     setCentralAllocation(response.data.centralAllocation);
    //     setFairPriceShops(response.data.fairPriceShops);
    //     setBeneficiaries(response.data.Beneficiaries);
    //     setRationCards(response.data.rationCards);

    //     setError(null);
    //   })
    //   .catch(setError);

      // Axios New Api
 //http://10.242.177.221/apionorcs/
      
      var stateArray = [];
      var data = '';

      var config = {
        method: 'get',
              //  url: 'https://impds.nic.in/apionorcs/getDashbordRCDetailonorc',
               url: 'http://localhost:4000/getAllData',
        headers: { 
          month: "4", 
          year: "2024", 
          userAuthentication: "NIC,nic@123"
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        window.localStorage.setItem("allData", JSON.stringify(response.data));
        const allData = response.data.data;
        console.log("Response: ", allData);
        const allStates = [...new Set(allData.map(item => item.state_name))];
        stateArray.push(allStates);
        window.localStorage.setItem("states", JSON.stringify(allStates));
        console.log("Campus: ",allStates);
        /* Vars */
        let totalCard = 0;
        let totalAAY = 0;
        let totalPHH = 0;
        let totalBenificiery = 0;
        for(var i=0; i<response.data.length; i++){
          totalCard = totalCard+(response.data[i].rc_count_aay1 + response.data[i].rc_count_phh1);
          totalAAY = totalAAY+(response.data[i].rc_count_aay1);
          totalPHH = totalPHH+(response.data[i].rc_count_phh1);
          totalBenificiery = totalBenificiery+(response.data[i].rcm_count_aay1 + response.data[i].rcm_count_phh1);
        }
        // setPosEnabled(response.data.posEnabled);
        // setStateAllocation(response.data.stateAllocation);
        // setCentralAllocation(response.data.centralAllocation);
        // setFairPriceShops(response.data.fairPriceShops);
        setBeneficiaries(totalBenificiery);
        setRationCards(totalCard);
        setRationCardAAY(totalAAY);
        setRationCardPHH(totalPHH);
        /* Vars */
      })
      .catch(function (error) {
        
        console.log(error);
      });

      // Axios New Api

  }, []);


    //var headers = {stateCode: "28", userAuthentication: "NIC,nic@123"};
    // axios("http://impds.nic.in/IVR_Impds/getDistrictlist", { headers: { 'stateCode': "28", 'userAuthentication': "NIC,nic@123" } })
    // .then((res) => {
    //   console.log("Response: ",res);
    // }).catch((err) => { });



  return (
    <div className="App m-0">
      <header className="page-header">
        <div className="row m-0">
          <div className="col-md-4 py-2">
            <img src={logo}></img>
          </div>

          <div className="col-md-8 text-end pull-right">
            <img src={logoMinistry}></img> 

            {/* <ul className="topNavigation">
              <li>
                <a href="javascript:void(0)" className="menuItem">
                  <Shop />
                  <span>Home</span>
                </a>
              </li>

              <li>
                <a href="https://impds.nic.in/fps/" target="_blank" className="menuItem">
                  <div className="iconBg">
                    <Book />
                  </div>
                  <span>Reports</span>
                </a>
              </li>
              
              <li>
                <a href="javascript:void(0)" className="menuItem">
                  <Folder />
                  <span>Login</span>
                </a>
              </li>
              <li>
                <a href="https://annavitran.nic.in/AVL/welcome" target="_blank" className="menuItem">
                  <Calculator />
                  <span>Annavitran</span>
                </a>
              </li>
              <li>
                <a href="https://impds.nic.in/portal" target="_blank" className="menuItem">
                  <Rainbow />
                  <span>Impds</span>
                </a>
              </li>
              <li>
                <a href="https://impds.nic.in/portal" target="_blank" className="menuItem">
                  <Speaker />
                  <span>D.B.T.</span>
                </a>
              </li>
              <li>
                <a href="https://impds.nic.in/portal" target="_blank" className="menuItem">
                  <PcDisplay />
                  <span>Learning Management System</span>
                </a>
              </li> 

            </ul>*/}

          </div>
        </div>
      </header>
      <div className="mainContent">
        <Navigation /> 
        <div className="width-auto m-0 p-0">
          <div className="row m-0 p-0">
            <div className="col-md-12">
              <div className="row p-2">
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-prim py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h3>{(rationCards)}</h3></div>
                          <div className="box-number">
                          {/* <h5>{(rationCards)}</h5> */}
                          <h5>Total Ration Cards</h5>

                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-7 left-side">
                             <h6>AAY:  {(rationCardAAY)}</h6>
                            <h6>PHH: {(rationCardPHH)}</h6>
                            {/* <ArrowRightCircle /> */}
                          </div>
                          <div className="col-md-4 right-side postcard-icon">
                          <Postcard />
                          </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-dan py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h3>{(Beneficiaries)}</h3></div>
                          <div className="box-number">
                          <h5>Total Beneficiaries</h5>
                          </div>
                          <div className="row">
                          <div className="col-md-7 left-side">
                          <h6>AAY:  {(BeneficiariesAAY)}</h6>
                          <h6>PHH:  {(BeneficiariesPHH)}</h6>
                            {/* <ArrowRightCircle /> */}
                          </div>
                          <div className="col-md-4 right-side person-icon">
                          <PeopleFill />
                          </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-green py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h3>19,44,49,477</h3></div>
                          <div className="box-number">
                          <h5>Aadhaar Seeded RCs</h5></div>
                          <div className="row">
                            <div className="col-md-7 left-side">
                              <h6>AAY:  8,60,60,627</h6>
                              <h6>PHH:  70,56,14,720</h6>
                              {/* <ArrowRightCircle /> */}
                            </div>
                            <div className="col-md-4 right-side fingerprint-icon">
                              <Fingerprint />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-prim py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h3>75,17,87,096</h3></div>
                          <div  className="box-number">
                          <h5>Aadhaar Seeded Benef.</h5></div>
                          <div className="row">
                          <div className="col-md-7 left-side">
                          <h6>AAY:  8,60,60,627</h6>
                          <h6>PHH:  70,56,14,720</h6>
                            {/* <ArrowRightCircle /> */}
                          </div>
                          <div className="col-md-4 right-side postcard-icon">
                          <Fingerprint />
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-dan py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h3>9,23,62,089</h3></div>
                          <div className="box-number"><h5>Mobile No. Seeded RCs</h5></div>
                          <div className="row">
                          <div className="col-md-7 left-side">
                          <h6>AAY:  8,60,60,627</h6>
                          <h6>PHH:  70,56,14,720</h6>
                            {/* <ArrowRightCircle /> */}
                          </div>
                          <div className="col-md-4 right-side person-icon">
                          <Calculator />
                          </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-green py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h3>4,75,79,900</h3></div>
                          <div  className="box-number"><h5>Bank A/C Seeded RCs</h5></div>
                          <div className="row">
                            <div className="col-md-7 left-side">
                              <h6>AAY:  8,60,60,627</h6>
                              <h6>PHH:  70,56,14,720</h6>
                              {/* <ArrowRightCircle /> */}
                            </div>
                            <div className="col-md-4 right-side fingerprint-icon">
                              <Bank />
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
            <div className="col-md-12">
              <div className="row p-3">
              <div className="col-md-4 py-2 px-4">
                  <div className="row">
                    <div className="col-md-12 text-center box-main height660">
                      {/* <img src={india} /> */}
                      <div id="live-map" className="live-map"></div>
                        <div className="district-live-map align-items-center">
                            <a className="map-link"><ArrowLeftCircle /></a>
                            <div className="district-map align-items-center"></div>
                        </div>
                    </div>

                  </div>
                </div>
                <div className="col-md-8 py-2">
                <div className="row">
                <div className="col-md-4">
                  <div className="bg-purple px-3 mx-2 py-2">
                    <div className=" text-center box-topic mt-3">
                      <h4>Total Fair Price Shops</h4>
                      <h4 className="box-number">5,39,714</h4>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="bubble-text">
                        <h6>Under Panchayat:  8,60,60,627</h6>
                        <h6>Co-op. Societies:  82,670</h6>
                       
                        <ArrowRightCircle />
                      </div>
                      <div className="bubble-icon shop-icon">
                        <Shop />
                      </div>
                    </div>
                  </div>
                </div>

                
                 
                    {/* Column 1 */}
                    <div className="col-md-4">
                      <div className="bg-sec px-3 mx-3 py-2">
                        <div className="box-topic text-center mt-3">
                          <h4>GIS Mapped FPSs</h4>
                          <h4 className="box-number">2,11,693</h4>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                      <div className="bubble-text">
                        <h6>Under Panchayat:  8,60,60,627</h6>
                        <h6>Co-op. Societies:  82,670</h6>
                       
                        <ArrowRightCircle />
                      </div>
                      <div className="bubble-icon map-icon">
                        <GeoFill />
                      </div>
                    </div>
                      </div>
                    </div>
                    {/* Column 1 */}
                    {/* Column 2 */}
                   <div className="col-md-4">
                    <div className="bg-aqua px-3 mx-3 py-2">
                        <div className="box-topic text-center mt-3">
                          <h4>Count of ePOS FPSs</h4>
                          <h4 className="box-number">4,88,832</h4>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                      <div className="bubble-text">
                        <h6>Under Panchayat:  8,60,60,627</h6>
                        <h6>Co-op. Societies:  82,670</h6>
                       
                        <ArrowRightCircle />
                      </div>
                      <div className="py-3 text-center printer-icon">
                        <Printer />
                      </div>
                    </div>
                      
                      </div>
                    </div>
                    {/* Column 2 */}
               
                

                {/* <div className="col-md-3 bg-sec px-3 mx-3 py-2">
                    
                        <div className=" text-center">
                          <div className="box-topic"><h4>GIS Mapped FPSs</h4></div>
                          <h4 className="box-number">2,11,693</h4>
                          <div className="col-md-12 py-3 text-center map-icon">
                              <GeoFill />
                          </div>
                          
                        </div>
                        <ArrowRightCircle />
                     
                </div> */}
                {/* <div className="col-md-3 bg-aqua px-3 py-2 mx-3">
                <div className=" text-center">
                          <div className="box-topic"><h4>Count of ePOS supplied to FPSs</h4></div>
                          <h4 className="box-number">4,88,832</h4>
                          <div className="col-md-12 py-3 text-center printer-icon">
                              <Printer />
                          </div>
                          
                        </div>
                        <ArrowRightCircle />
                </div> */}
                </div>

                <div className="row p-2">
                <div className="col-md-12 box-main px-3 py-2">
                <table className="table table-striped table-bordered tables-scroll">
                          <thead className="bg-green text-center">
                            <tr>
                              <th colSpan={4}>NUMBER OF TRANSACTION</th>
                               </tr>
                            <tr>
                              <th>Aadhaar Authenticated</th>
                              <th>Other Mode Authenticated</th>
                              <th>Non Authenticated</th>
                              <th>Total Transaction</th>
                              </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>74,813,479</td>
                              <td>2,10,517</td>
                              <td>2,142,588</td>
                              <td>77,166,584</td>
                            </tr>
                            
                            
                          </tbody>
                  </table>
                </div>
                </div>
                <div className="row p-2">
                <div className="col-md-12 box-main px-3 py-2">
                <table className="table table-striped table-bordered tables-scroll">
                          <thead className="bg-prim text-center">
                            <tr>
                              <th colSpan={5}>NUMBER OF TRANSACTED RATION CARD</th>
                               </tr>
                            <tr>
                              <th>NFSA Ration Card Type</th>
                              <th>Regular</th>
                              <th>Intra State</th>
                              <th>Inter State</th>
                              <th>Total</th>
                              </tr>
                          </thead>
                          <tbody>
                            <tr>
                            <td>Priority Household (PHH)</td>
                              <td>3,733</td>
                              <td>13,034</td>
                              <td>3,034</td>
                              <td>18,767</td>
                            </tr>
                            <tr>
                            <td>Antyodaya Anna Yojana (AAY)</td>
                              <td>3,733</td>
                              <td>13,034</td>
                              <td>3,034</td>
                              <td>18,767</td>
                            </tr>
                            
                            
                          </tbody>
                        </table>
                </div>
                {/* <div className="col-md-5 box-main px-3 mx-4 py-2">
                
                </div> */}
               
           
                  
                </div> 
                
                
                </div>
                <div className="col-md-4 py-2 px-4">
                  <div className="row">
                    <div className="col-md-12 text-center box-main">
                      <PieChart />
                    </div>
                  </div>
                </div>
                <div className="col-md-8 py-2 px-4">
                  <div className="row">
                    <div className="col-md-12 text-center box-main py-2">
                    <table className="table table-striped table-bordered tables-scroll">
                          <thead className="bg-dan text-center">
                            <tr>
                              <th colSpan={5}>DISTRIBUTED QUANTITY(In MT)</th>
                               </tr>
                            <tr>
                              <th>Commodity</th>
                              <th>Regular Txn</th>
                              <th>Intra state Txn</th>
                              <th>Inter State Txn</th>
                              <th>Total</th>
                              </tr>
                          </thead>
                          <tbody>
                            <tr>
                            <td>Wheat</td>
                              <td>3,56,932.25</td>
                              <td>27,026.49</td>
                              <td>84.52</td>
                              <td>384043.259</td>
                            </tr>
                            <tr>
                            <td>Rice</td>
                              <td>1,128,110.71</td>
                              <td>73,242.13</td>
                              <td>132.18</td>
                              <td>1201485.018</td>
                            </tr>
                            <tr>
                            <td>Coarse Grains</td>
                              <td>32,866.64	</td>
                              <td>4,517.18</td>
                              <td>0</td>
                              <td>37383.818</td>
                            </tr>
                            
                            
                          </tbody>
                          <tfoot className="bg-secondary text-white">
												<tr>
													<td key="h_total">Total</td>
  											        									
												        <td><span> 1,517,909.59</span></td>
														<td><span> 104,785.8</span></td>
												        <td><span> 216.7</span></td>
														<td><span>1622912.095</span></td>
													
												</tr>
											</tfoot>
                        </table>
                    </div>
                  </div>
                </div>
                

               
                

                {/* <div className="col-md-12 py-2 px-4">
                  <div className="row">
                    <div className="col-md-12 text-center bg-sec">Column 1</div>
                  </div>
                </div> */}


              </div>

            </div>



          </div>
        </div>
      </div>

      <footer className="footer-bg text-center">
        Copyright 2022 National Informatics Center
      </footer>

    </div>

  );
}

export default App;
