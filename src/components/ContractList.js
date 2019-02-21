import React, { Component } from 'react';
import ESI from '../ESI';
import Contract from './Contract';
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
          if (contract.end_location_id < 2147483647) {
            contracts.push( 
              <li><Contract key={contract.contract_id} details={contract} type={this.props.type}></Contract></li>
            );
          }
          else { 
            // TODO Is this a citadel?
          }
        }
      }
    );
    console.log("contracts.length = " + contracts.length);
    return (
      <div className="ContractList">
        <ul>
          {contracts}
        </ul>
      </div>
    );
  }
}

export default ContractList;
