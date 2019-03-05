import React, { Component } from 'react';
import moment from 'moment';
import './Contract.css';
import { Link } from 'react-router-dom';

class Contract extends Component {
  render() {
    let now = moment.now();
    let expired = moment(this.props.contract.date_expired);
    let timeLeft = moment.duration(expired.diff(now)).humanize(true);
    
    if (this.props.contract.info.startSystem.name.toLowerCase().includes(this.props.searchText.toLowerCase()) ||
        this.props.contract.info.endSystem.name.toLowerCase().includes(this.props.searchText.toLowerCase())) {
      const contractPath = `/contract/${this.props.contract.contract_id}`;
      const characterPath = `/character/${this.props.contract.issuer_id}`;
  
      if (this.props.type === 'item_exchange' && this.props.contract.type === 'item_exchange') {
          return (
            <tr>
              <td><Link to={contractPath}>{this.props.contract.info.items.length > 1 ? '[Multiple Items]' : this.props.contract.info.firstItem.name }</Link></td>
              <td>{this.props.contract.info.endSystem.name}</td>
              <td>{this.wordify(this.props.contract.price)}</td>
              {/* TODO <td>Jumps TBD</td> */}
              <td>{ timeLeft }</td>
              <td><Link to={characterPath}>{this.props.contract.info.issuer.name}</Link></td>
              <td>{this.props.contract.date_issued}</td>
              <td>{this.props.contract.title}</td>
            </tr>
          );
      }
      else if (this.props.type === 'auction' && this.props.contract.type === 'auction') {
        return (
          
            <tr>
              <td><Link to={contractPath}>{this.props.contract.info.items.length > 1 ? '[Multiple Items]' : this.props.contract.info.firstItem.name }</Link></td>
              <td>{this.props.contract.info.endSystem.name}</td>
              <td>{this.wordify(this.props.contract.price)}</td>
              <td>{this.wordify(this.props.contract.buyout)}</td>
              <td>{this.props.contract.info.bids.length}</td>
              {/* TODO <td>Jumps TBD</td> */}
              <td>{ timeLeft }</td>
              <td><Link to={characterPath}>{this.props.contract.info.issuer.name}</Link></td>
              <td>{this.props.contract.date_issued}</td>
              <td>{this.props.contract.title}</td>
            </tr>
          
        );
      }
      else if (this.props.type === 'courier' && this.props.contract.type === 'courier') {
        return (
          <tr>
            <td>{this.props.contract.info.startSystem.name}</td>
            <td>{this.props.contract.info.endSystem.name}</td>
            <td>{this.props.contract.volume}</td>
            <td>{this.wordify(this.props.contract.reward)}</td>
            <td>{this.wordify(this.props.contract.collateral)}</td>
            <td>{this.props.contract.info.jumps.length}</td>
            {/* TODO <td>Jumps TBD</td> */}
            <td>{ timeLeft }</td>
            <td><Link to={characterPath}>{this.props.contract.info.issuer.name}</Link></td>
            <td>{this.props.contract.date_issued}</td>
            <td>{this.props.contract.title}</td>
          </tr>
        );
      }
      else {
        return (
          <tr></tr>
        );
      }
    
    }
    else {
      return (
        <tr></tr>
      );
    }
  }

  // Stolen from https://stackoverflow.com/a/36734774
  wordify(value) {
    // Nine Zeroes for Billions
    return Math.abs(Number(value)) >= 1.0e+9
      ? Math.abs(Number(value)) / 1.0e+9 + " billion"
      // Six Zeroes for Millions 
      : Math.abs(Number(value)) >= 1.0e+6
      ? Math.abs(Number(value)) / 1.0e+6 + " million"
      // Three Zeroes for Thousands
      : Math.abs(Number(value)) >= 1.0e+3
      ? Math.abs(Number(value)) / 1.0e+3 + " thousand"
      : Math.abs(Number(value));
  }
}

Contract.defaultProps = {
  searchText: ''
}

export default Contract;
