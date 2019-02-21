import React, { Component } from 'react';
import ContractList from './components/ContractList';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import ESI from './ESI';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      regions: [],
      type: 'auction' 
    };
  }

  async componentDidMount() {
    let regions = await ESI.getRegionList();

    let tempRegions = [];
    for (const regionId of regions) {
      let region = await ESI.getRegion(regionId);
      tempRegions.push(region);
    };
    this.setState( { regions: tempRegions } );
  }
  // TODO defaultChecked now working.
  render() {
    return (
      <div className="App">
        <ButtonToolbar>
          <ToggleButtonGroup name='type' toggle defaultValue={this.state.type}>
            <ToggleButton type="radio" value='item_exchange' name="radio" onClick={() => this.setState( {type:'item_exchange'} )}>Exchange</ToggleButton>
            <ToggleButton type="radio" value='auction' name="radio" onClick={() => this.setState( {type: 'auction'} )}>Auction</ToggleButton>
            <ToggleButton type="radio" value='courier' name="radio" onClick={() => this.setState( {type: 'courier'} )}>Courier</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        <ContractList regionId='10000001' /* TODO */ page='1' type={this.state.type}></ContractList>
      </div>
    );
  }
}

export default App;
