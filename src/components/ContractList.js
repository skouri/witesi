import React, { Component } from 'react';
import Contract from './Contract';
import { Table } from 'react-bootstrap';
import './ContractList.css';

class ContractList extends Component {
  render() {
    let contracts = [];
    this.props.contracts.forEach( (contract, index) => {
        contracts.push( 
          <Contract key={contract.contract_id} contract={contract} type={this.props.type}></Contract>
        );
      }
    );

    let headers = '';
    if (this.props.type === 'item_exchange') {
      headers = 
        <thead>
          <tr>
            <th>Contract</th>
            <th>Location</th>
            <th>Price</th>
            <th>Time Left</th>
            <th>Issuer</th>
            <th>Created</th>
            <th>Info by Issuer</th>
          </tr>
        </thead>
    }
    else if (this.props.type === 'auction') {
      headers = 
        <thead>
          <tr>
            <th>Contract</th>
            <th>Location</th>
            <th>Price</th>
            <th>Buyout</th>
            <th>Bids</th>
            <th>Time Left</th>
            <th>Issuer</th>
            <th>Created</th>
            <th>Info by Issuer</th>
          </tr>
        </thead>
    }
    else if (this.props.type === 'courier') {
      headers = 
        <thead>
          <tr>
            <th>Pick Up</th>
            <th>Drop Off</th>
            <th>Volume</th>
            <th>Reward</th>
            <th>Collateral</th>
            <th>Route</th>
            <th>Time Left</th>
            <th>Issuer</th>
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
