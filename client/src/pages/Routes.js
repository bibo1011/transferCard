import React from 'react';
import BARTmap from '../assets/BART-System-Map-API.png'

// using useState
// const Routes = () => {
// const [name, setName] = useState('')
// }

class Routes extends React.Component {
  state = {
    name: '',
    direction: '',
    num_stns: '',
  }

  handleChange = (event) => {
    const routeId = event.target.value;
    fetch('http://api.bart.gov/api/route.aspx?cmd=routeinfo&route=' + routeId + '&key=MW9S-E7SL-26DU-VV8V&json=y')
      .then(response => response.json())
      .then(response => {
        let { name, direction, num_stns } = response.root.routes.route;
        // let  station  = JSON.stringify(response.root.routes.route.config.station)
        // .replace(/"/g, " ")
        // .replace(/[\[\]']+/g, " ")
        // .replace(/,/g, " ")
        console.log(response)

        this.setState({
          name, direction, num_stns
        })

        // using useState()
        // setName(name);

      });
  }
  
  render() {
    const { name, direction, num_stns } = this.state;


    return (
    <div className="container-map">
      <div >
        <img className="bartmap" src={BARTmap} alt="map"/>
      </div>
          
      <div className="container route-container">
        <div className="custom-select">
          <select onChange={this.handleChange}>
            <option value="" disabled selected>Choose your route</option>
            <option value="1">ANTC-SFIA</option>
            <option value="2">SFIA-ANTC</option>
            <option value="3">BERY-RICH</option>
            <option value="4">RICH-BERY</option>
            <option value="5">BERY-DALY </option>
            <option value="6">DALY-BERY</option>
            <option value="7">RICH-MLBR</option>
            <option value="8">MLBR-RICH</option>
          </select>
        </div>
        
        <div className="result-container">
          <div className="row bg">
            <div className="col-6 result">
              <div className="route">
                <h1>Route: </h1>
                <h1>{name}</h1>
              </div>
              <div className="stations">
                <h3>Direction: {direction}</h3>
                <h3>Number of Stations: {num_stns}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Routes;