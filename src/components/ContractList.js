import React, { Component } from 'react';
import Contract from './Contract';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import './ContractList.css';

class ContractList extends Component {
  constructor() {
    super();
    this.state = { 
      sortBy: '',
      sortOrder: 1
    };
  }

  mysort = (event) => {
    let sortOrder = 1;
    if (this.state.sortBy === event.target.innerHTML) sortOrder = -this.state.sortOrder;
    this.setState( { sortOrder: sortOrder, sortBy: event.target.innerHTML } );
  }

  render() {
    let contracts = [];
    let sortedContracts = this.props.contracts;
    switch (this.state.sortBy) {
      case 'Time Left':
        sortedContracts = this.props.contracts.sort( (a,b) => { 
          let now = moment.now();
          let expiredA = moment(a.date_expired);
          let expiredB = moment(b.date_expired);
          let timeLeftA = moment.duration(expiredA.diff(now))
          let timeLeftB = moment.duration(expiredB.diff(now))
          return this.state.sortOrder * (timeLeftA - timeLeftB); 
        });
        break;
      case 'Issuer':
        sortedContracts = this.props.contracts.sort( (a,b) => { 
          return this.state.sortOrder * a.info.issuer.name.localeCompare(b.info.issuer.name);
        });
        break;
      default:
        // However the server returns the data to us.
        break;
    }
    sortedContracts.forEach( (contract, index) => {
        contracts.push( 
          <Contract key={contract.contract_id} contract={contract} searchText={this.props.searchText} type={this.props.type}></Contract>
        );
      }
    );

    let headers = '';
    if (this.props.type === 'item_exchange') {
      headers = 
        <thead>
          <tr>
            <th>ID</th>
            <th>Contract</th>
            <th>Location</th>
            <th>Price</th>
            <th onClick={this.mysort}>Time Left</th>
            <th onClick={this.mysort}>Issuer</th>
            <th>Created</th>
            <th>Info by Issuer</th>
          </tr>
        </thead>
    }
    else if (this.props.type === 'auction') {
      headers = 
        <thead>
          <tr>
            <th>ID</th>
            <th>Contract</th>
            <th>Location</th>
            <th>Price</th>
            <th>Buyout</th>
            <th>Bids</th>
            <th onClick={this.mysort}>Time Left</th>
            <th onClick={this.mysort}>Issuer</th>
            <th>Created</th>
            <th>Info by Issuer</th>
          </tr>
        </thead>
    }
    else if (this.props.type === 'courier') {
      headers = 
        <thead>
          <tr>
            <th>ID</th>
            <th>Pick Up</th>
            <th>Drop Off</th>
            <th>Volume</th>
            <th>Reward</th>
            <th>Collateral</th>
            <th>Route</th>
            <th onClick={this.mysort}>Time Left</th>
            <th onClick={this.mysort}>Issuer</th>
            <th>Created</th>
            <th>Info by Issuer</th>
          </tr>
        </thead>
    }

    return (
        <Table bordered hover size="sm">
        {headers}
          <tbody>
            {contracts}
          </tbody>
        </Table>
    );
  }
}

export default ContractList;
