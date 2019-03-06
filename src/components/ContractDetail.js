import React, { Component } from 'react';

class ContractDetail extends Component {
  render() {
      return (
        <div>Contract ID: {this.props.match.params.id}</div>
      );
  }
}

export default ContractDetail;
