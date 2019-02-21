import React, { Component } from 'react';
import ContractList from './components/ContractList';
import ESI from './ESI';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      regions: [] 
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

  render() {
    return (
      <div className="App">
        <ContractList regionId='10000001' /* TODO */ page='1' type='auction'></ContractList>
      </div>
    );
  }
}

export default App;
