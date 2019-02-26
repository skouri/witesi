import React, { Component } from 'react';
import ContractList from './components/ContractList';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import ESI from './ESI';
import Loading from './components/Loading';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      contracts: [],
      regions: [],
      type: 'auction',
      modalShow: true,
      esiStatus: '',
      esiContractIndex: 0,
      esiContractTotal: 0
    };
  }

  setEsiStatus = (value, index, total) => {
    this.setState( { esiContractIndex: index, esiStatus: value, esiContractTotal: total } );
  }

  async componentDidMount() {
    let regions = await ESI.getRegionList();

    let tempRegions = [];
    for (const regionId of regions) {
      let region = await ESI.getRegion(regionId);
      tempRegions.push(region);
    };

    // Note: 10000002 is the "Forge" region which contains the "Jita" star system.
    // This is where the majority of trade occurs, and thus will likely return the most data.
    // Having tried this, it was a very bad idea. This amount of data is something you would want to
    // pre-load and cache heavily.
    // Using 10000001 which is the "Derelik" region. Less data, but useful for testing app.
    let contracts = await ESI.getAllContractInfo(10000001, 1 /* TODO */, this.setEsiStatus);

    this.setState({ 
      regions: tempRegions,
      contracts: contracts,
      type: 'auction', 
      modalShow: false,
      esiStatus: '',
      esiContractIndex: 0,
      esiContractTotal: contracts.length
    });
  }

  render() {
    return (
      <div className="App">
        <Loading
          show={this.state.modalShow}
          loadingInfo={this.state.esiStatus}
          loadingIndex={this.state.esiContractIndex}
          loadingTotal={this.state.esiContractTotal}
        />
        <ButtonToolbar>
          <ToggleButtonGroup name='type' toggle defaultValue={this.state.type}>
            <ToggleButton type="radio" value='item_exchange' name="radio" onClick={() => this.setState( {type:'item_exchange'} )}>Exchange</ToggleButton>
            <ToggleButton type="radio" value='auction' name="radio" onClick={() => this.setState( {type: 'auction'} )}>Auction</ToggleButton>
            <ToggleButton type="radio" value='courier' name="radio" onClick={() => this.setState( {type: 'courier'} )}>Courier</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        <ContractList /* TODO */ page='1' contracts={this.state.contracts} type={this.state.type}></ContractList>
      </div>
    );
  }
}

export default App;
