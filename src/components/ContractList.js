import React, { Component } from 'react';
import ESI from '../ESI';
import Contract from './Contract';
import { Table } from 'react-bootstrap';
import './ContractList.css';

class ContractList extends Component {
  constructor() {
    super();
    this.state = {
      contracts: []
    };
  }

  async componentDidMount() {
    let contracts = await ESI.getContracts(this.props.regionId, 1 /* TODO */);
    this.setState({ 
      contracts: contracts
    });
  }

  render() {
    let contracts = [];
    this.state.contracts.forEach( (contract) => {
        // TODO: A citadel can be returned instead of a station, and it has an ID like 1022875242907
        // which is greater than an int32. Not sure how to handle these yet.
        if (contract.type === this.props.type) {
          if (contract.start_location_id < 2147483647 &&
              contract.end_location_id < 2147483647) {
            contracts.push( 
              <Contract key={contract.contract_id} details={contract} type={this.props.type}></Contract>
            );
          }
          else { 
            // TODO Is this a citadel?
          }
        }
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
        <Table striped bordered hover size="sm">
        {headers}
          <tbody>
            {contracts}
          </tbody>
        </Table>
    );
  }
}

export default ContractList;
