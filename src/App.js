import React, { Component } from 'react';
import ContractList from './components/ContractList';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import ESI from './ESI';
import Loading from './components/Loading';
import Search from './components/Search';
import CharacterSearch from './components/CharacterSearch';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      type: 'auction',
      modalShow: false,
      esiStatus: '',
      esiContractIndex: 0,
      esiContractTotal: 0,
      searchText: '',
      characterId: ''
    };
  }

  setEsiStatus = (value, index, total) => {
    this.setState( { esiContractIndex: index, esiStatus: value, esiContractTotal: total } );
  }

  handleSearch = (text) => { 
    this.setState( { searchText: text } );
  }

  handleCharacterSearch = async (text) => {
    let response = await ESI.searchCharacter(text);
    if (response.characters !== undefined && response.characters.length === 1) {
      let id = response.characters[0].id;
      this.setState( { characterId: id } );
    }
    else {
      // TODO Popup saying not found.
    }
  }

  async componentDidMount() {
    // Note: 10000002 is the "Forge" region which contains the "Jita" star system.
    // This is where the majority of trade occurs, and thus will likely return the most data.
    // Having tried this, it was a very bad idea. This amount of data is something you would want to
    // pre-load and cache heavily.
    // Using 10000001 which is the "Derelik" region. Less data, but useful for testing app.
    if (ESI.contracts.length === 0) {
      this.setState({ 
        modalShow: true,
      });

      ESI.contracts = await ESI.getAllContractInfo(10000001, 1 /* TODO */, this.setEsiStatus);

      this.setState({ 
        type: 'auction', 
        modalShow: false,
        esiStatus: '',
        esiContractIndex: 0,
        esiContractTotal: ESI.contracts.length,
        searchText: ''
      });
    }
    else {
      this.setState({ 
        modalShow: false,
      });
    }
  }

  render() {
    if (this.state.characterId !== undefined && this.state.characterId !== '') {
      let redirectTo = '/character/' + this.state.characterId;
      return <Redirect push to={ redirectTo } />
    }

    return (
      <div className="App">
        <Loading
          show={this.state.modalShow}
          loadingInfo={this.state.esiStatus}
          loadingIndex={this.state.esiContractIndex}
          loadingTotal={this.state.esiContractTotal}
        />
        <Container>
          <Row>
            <Col>
              <ButtonToolbar>
                <ToggleButtonGroup name='type' toggle defaultValue={this.state.type}>
                  <ToggleButton type="radio" value='item_exchange' name="radio" onClick={() => this.setState( {type:'item_exchange'} )}>Exchange</ToggleButton>
                  <ToggleButton type="radio" value='auction' name="radio" onClick={() => this.setState( {type: 'auction'} )}>Auction</ToggleButton>
                  <ToggleButton type="radio" value='courier' name="radio" onClick={() => this.setState( {type: 'courier'} )}>Courier</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Col>
            <Col>
              <CharacterSearch handleCharacterSearch={ this.handleCharacterSearch }></CharacterSearch>
            </Col>
            <Col>
              <Search handleSearch={ this.handleSearch }></Search>
            </Col>
          </Row>
        </Container>
        <ContractList /* TODO */ page='1' searchText={this.state.searchText} contracts={ESI.contracts} type={this.state.type}></ContractList>
      </div>
    );
  }
}

export default App;
