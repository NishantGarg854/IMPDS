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
import './App.css';
import Navigation from "./nav";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRightCircle, Shop, BookFill, Truck, Calculator, Rainbow, Person } from 'react-bootstrap-icons';
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

  const [error, setError] = useState(null);

  const [noOfRationCards, setNoOfRationCards] = useState([]);

  /*
  Request.Method.GET
    @Override
                    public void onResponse(JSONArray response) {
                        districts.clear();
                        // Display the first 500 characters of the response string.
                        System.out.println("Response is: " + response.toString());
                        JSONObject jsonObject;
                        IdValue item;
                        for (int i = 0; i < response.length(); i++) {
                            try {
                                jsonObject = response.getJSONObject(i);
                                System.out.println("jsonObject is: " + jsonObject.toString());
                                item = new IdValue(jsonObject.getString("Districtcode"), jsonObject.getString("Districtname"));
                                districts.add(item);

                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                        }


                    }
  */
  const config = {
    headers: {
      month: "8",
      year: "2022",
      userAuthentication: "NIC,nic@123"
    }
  };

  const url = "http://impds.nic.in/apionorcs/getDashbordRCDetailonorc";

  /*
  const data = {
    name: "Jake Taper",
    email: "taperjake@gmail.com"
  }

  */
 // const data1=null;

  

  useEffect(() => {

    var rcNos=0;

    axios("http://impds.nic.in/fps/Dashboard/Details")
      .then((response) => {
        // console.log(response);

        setPosEnabled(response.data.posEnabled);
        setStateAllocation(response.data.stateAllocation);
        setCentralAllocation(response.data.centralAllocation);
        setFairPriceShops(response.data.fairPriceShops);
        setBeneficiaries(response.data.Beneficiaries);
        setRationCards(response.data.rationCards);

        setError(null);
      })
      .catch(setError);


     

    axios.get(url, config)
      .then(res => {
        //json parsing
        console.log(typeof res);
       var strJson=JSON.parse(res.data);
       alert(strJson);
        const data1 = strJson.map((item) => {

          return {

            "srlno": item.srlno,
            "mmonth": item.mmonth,
            "myear": item.myear,
            "state_name": item.state_name,
            "district_name": item.district_name,
            "state_code": item.state_code,
            "district_code": item.district_code,
            "fps_count1": item.fps_count1,
            "hof_mobile_seeded1": item.hof_mobile_seeded1,
            "ben_mobile_seeded1": item.ben_mobile_seeded1,
            "hof_uid_aay1": item.hof_uid_aay1,
            "hof_uid_oth1": item.hof_uid_oth1,
            "hof_uid_phh1": item.hof_uid_phh1,
            "ben_uid_aay1": item.ben_uid_aay1,
            "ben_uid_oth1": item.ben_uid_oth1,
            "ben_uid_phh1": item.ben_uid_phh1,
            "rcm_count_aay1": item.rcm_count_aay1,
            "rcm_count_oth1": item.rcm_count_oth1,
            "rcm_count_phh1": item.rcm_count_phh1,
            "rc_count_aay1": item.rc_count_aay1,
            "rc_count_oth1": item.rc_count_oth1,
            "rc_count_phh1": item.rc_count_phh1,
            "rationcard_seeded_aay1": item.rationcard_seeded_aay1,
            "rationcard_seeded_phh1": item.rationcard_seeded_phh1
            
          }
        
         // const [noOfRationCards, setNoOfRationCards] = useState([]);
         rcNos=rcNos+item.ben_uid_aay1;

         // alert(item.rationcard_seeded_phh1);
        })
       
        console.log("Your new array of modified objects here", data1);
      
      })
      .catch(err => { console.log('Google api calendar error', err) });

      //const [noOfRationCards, setNoOfRationCards] = useState([]);

      
      //setNoOfRationCards(data1);



alert(rcNos);


  }, []);


  return (
    <div className="App m-0">
      <header className="page-header">
        <div className="row m-0">
          <div className="col-md-4 py-2">
            <img src={logo}></img>
          </div>

          <div className="col-md-8 text-end pull-right">
            {/* <img src={logoNic}></img>  */}

            <ul className="topNavigation">

              <li>
                <a href="https://impds.nic.in/fps/" target="_blank" className="menuItem">
                  <div className="iconBg">
                    <Shop />
                  </div>
                  <span>Fair Price Shop</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="menuItem">
                  <BookFill />
                  <span>Ration Card</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="menuItem">
                  <Truck />
                  <span>Allocation</span>
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

            </ul>

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
                          <div className="box-topic"><h4>Fair Price Shops</h4></div>
                          <div className="number">
                            {(FairPriceShops)}

                          </div>
                          <div className="indicator">
                            <span className="text">Till 03 Nov </span>
                            <ArrowRightCircle />
                          </div>
                        </div>
                        <i className="bi bi-clipboard-data-fill cart"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-dan py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h4>Ration Cards</h4></div>
                          <div className="number">
                            {(rationCards)}
                          </div>
                          <div className="indicator">
                            <span className="text">Till 03 Nov </span>
                            <ArrowRightCircle />

                          </div>
                        </div>
                        <i className="bi bi-clipboard-data-fill cart"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-green py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h4>POS enabled FPS</h4></div>
                          <div className="number"> {(posEnabled)}</div>
                          <div className="indicator">
                            <span className="text">Till 03 Nov </span>
                            <ArrowRightCircle />
                          </div>
                        </div>
                        <i className="bi bi-clipboard-data-fill cart"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-prim py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h4>Beneficiaries</h4></div>
                          <div className="number"> {(Beneficiaries)}</div>
                          <div className="indicator">
                            <span className="text">Total Foodgrains Counts </span>
                            <ArrowRightCircle />
                          </div>
                        </div>
                        <i className="bi bi-clipboard-data-fill cart"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-dan py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h4>Central Allocation</h4></div>
                          <div className="number"> {(centralAllocation)}</div>
                          <div className="indicator">
                            <span className="text">Till 03 Nov </span>
                            <ArrowRightCircle />
                          </div>
                        </div>
                        <i className="bi bi-clipboard-data-fill cart"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 px-3 py-2">
                  <div className="row m-0">
                    <div className=" text-center bg-green py-3">
                      <div className="box">
                        <div className="left-side">
                          <div className="box-topic"><h4>State Allocation</h4></div>
                          <div className="number"> {(stateAllocation)}</div>
                          <div className="indicator">
                            <span className="text">Till 03 Nov </span>
                            <ArrowRightCircle />
                          </div>
                        </div>
                        <i className="bi bi-clipboard-data-fill cart"></i>
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
                    <div className="col-md-12 text-center box-main"><img src={india} /></div>

                  </div>
                </div>
                <div className="col-md-8 py-2 px-4">
                  <div className="row">
                    <div className="col-md-12 text-center box-main py-2 height400">
                      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="home" title="Home">
                          lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                          dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet
                        </Tab>
                        <Tab eventKey="contact" title="Contact" disabled>
                          lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet lorem ipsum dolor set amet
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12 text-center box-main">
                      <div className="box-border my-4">
                        <span className="box-heading">Number of Transaction</span>
                        <table className="table table-striped table-bordered">
                          <thead className="bg-secondary text-white">
                            <tr>
                              <th>NFSA Ration Card Type</th>
                              <th>Regular</th>
                              <th>Intra State</th>
                              <th>Inter State</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                         
                           
                          </tbody>
                        </table>
                      </div>
                    </div>
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
                    <div className="col-md-12 text-center box-main"><Charts /></div>
                  </div>
                </div>

                <div className="col-md-12 py-2 px-4">
                  <div className="row">
                    <div className="col-md-12 text-center bg-sec">Column 1</div>
                  </div>
                </div>


              </div>

            </div>



          </div>
        </div>
      </div>

      <footer className="footer-bg text-center">
        Copyright 2022 National Informatics center
      </footer>

    </div>

  );
}

export default App;
