import React, { Component } from 'react';
import Contract from './Contract';
import './ContractList.css';

class ContractList extends Component {
  constructor() {
    super();
  }

  render() {
    let details = {
      "collateral": 0,
      "contract_id": 141731750,
      "date_expired": "2019-02-20T20:41:08Z",
      "date_issued": "2019-01-23T20:41:08Z",
      "days_to_complete": 0,
      "end_location_id": 60012301,
      "issuer_corporation_id": 98525792,
      "issuer_id": 1975735226,
      "price": 8000000,
      "reward": 0,
      "start_location_id": 60012301,
      "title": "Cloaked Exequror Cruiser",
      "type": "item_exchange",
      "volume": 113000
    };
    return (
      <div className="ContractList">
        <Contract details={details}></Contract>
      </div>
    );
  }
}

export default ContractList;
