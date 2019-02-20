import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      regions: [] 
    };
  }

  async componentDidMount() {
    let regions = await this.getRegionList();

    for (const regionId of regions) {
      let region = await this.getRegion(regionId);
      this.setState( { regions: [...this.state.regions, region] } );
    };
  }

  async getRegionList() {
    try {
      const response = await fetch(`https://esi.evetech.net/latest/universe/regions/?datasource=tranquility`);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    }
    catch (error) {
      console.log(error);
    }
  }

  async getRegion(regionId) {
    console.log('getRegion(' + regionId + ')');
    try {
      const response = await fetch(`https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility&language=en-us`);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
