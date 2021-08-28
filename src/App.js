import React, { useState } from 'react';
import axios from "axios";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [inpt, setInpt] = useState("");
  const [resdatalocation, setResdatalocation] = useState([]);
  const [resdatacurrent, setResdatacurrent] = useState([]);


  const [restemp, setRestemp] = useState("--");
  const [rescity, setRescity] = useState("City");
  const [resregion, setResregion] = useState("");
  const [conditext, setConditext] = useState("---------");
  const [resdate, setResdate] = useState("");
  const [reswind, setReswind] = useState("--");
  const [rescloud, setRescloud] = useState("--");
  const [reshumidity, setReshumidity] = useState("--");
  const [resco, setResco] = useState("--");
  const [imagelink, setImageLink] = useState("https://cdn.weatherapi.com/weather/64x64/day/116.png");


  const onsearchhandler = (e) => {
    e.preventDefault();

    console.log("Search Successful")

    const url = "http://api.weatherapi.com/v1/current.json?key=642ceafd1a094b1189655952212608&q=" + inpt + "&aqi=yes";
   

    axios
      .get(url)
      .then((response) => {
        setResdatalocation(response.data.location);
        setResdatacurrent(response.data.current);

        setRestemp(response.data.current.temp_c);
        setRescity(response.data.location.name);
        setResregion(response.data.location.region);
        setImageLink(response.data.current.condition.icon);
        setConditext(response.data.current.condition.text);
        setResdate(response.data.location.localtime);
        setReswind(response.data.current.wind_kph);
        setRescloud(response.data.current.cloud);
        setReshumidity(response.data.current.humidity);
        setResco(response.data.current.air_quality.co);


      })
      .catch((err) => {
        console.log(err);
        alert("Some Error Occurred")
      });

  }



  return (
    <>
      <div className="fullfont">



        <nav className="navbar navbar-light ">
          <div className="container-fluid">
            <span className="navbar-brand mb-1 fs-4 mx-auto fw-bold ">For Weather</span>
          </div>
        </nav>



        <div className="col-lg-6 col-md-10 col-sm-10 col-xs-4 container justify-content-center   ">

          <div className="shadow  mb-5  rounded">
            <div className="card">
              <div className="card-body">


                <form onSubmit={onsearchhandler} >
                  <div className="container">
                    <div className="row no-gutters mt-2 align-items-center">
                      <div className="col col-md-10 col-sm-10 col-xs-10">
                        <input className="form-control border-secondary rounded-pill pr-5 " type="search" value={inpt} placeholder="City Name"
                          onChange={(event) => setInpt(event.target.value)}
                        />
                      </div>
                      <div className="col-auto">
                        <button className="btn btn-outline-light text-dark border-0 rounded-pill ml-n5" type="button" onClick={onsearchhandler} >
                          <i className="fa fa-search fa-2x"> </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <hr />


                <div className="mt-2">

                  <div className="container">
                    <div className="row">
                      <div className="d-flex justify-content-around">
                        <div className="col ">
                          <img src={imagelink} alt="barcoad " />
                          <h6 className="mx-auto"> {conditext}</h6>
                        </div>
                        <div className="col mt-3 pb-0">
                          {/* <h2>24.6 *C</h2>
                      <h7 className="mt-1">Nagpur</h7> */}

                          <figure>
                            <blockquote className="blockquote">
                              <h2>{restemp} °C</h2>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                              {rescity}
                            </figcaption>
                          </figure>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="m-3" >
                    <h6> {resdate} </h6>
                    <h6> <span className="fw-bold" > Wind : </span> {reswind} Km/h</h6>
                    <h6> <span className="fw-bold" > Cloud : </span> {rescloud} </h6>
                    <h6> <span className="fw-bold" > Humidity : </span> {reshumidity} %</h6>
                    <h6> <span className="fw-bold" > CO  : </span> {resco} </h6>
                    <h6> <span className="fw-bold" > Air Quality Index : </span> -- AQI</h6>
                    <hr />
                    <h6> <span className="fw-bold" > Region : </span> {resregion} , {resdatalocation.country} </h6>
                    <h6> <span className="fw-bold" >Location : </span> {resdatalocation.lat} , {resdatalocation.lon}</h6>
                  </div>




                </div>

              </div>
            </div>
          </div>

        </div>


      </div>

    </>


  );
}

export default App;
