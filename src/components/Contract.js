import React, { Component } from 'react';
import moment from 'moment';
import './Contract.css';
import { Link } from 'react-router-dom';

class Contract extends Component {
  render() {
    let now = moment.now();
    let expired = moment(this.props.contract.date_expired);
    let timeLeft = moment.duration(expired.diff(now)).humanize(true);
    let itemName = 'Expired';
    if (this.props.type !== 'courier') {
      const itemsPath = `/contract/${this.props.contract.contract_id}/items`;
      if (moment.duration(expired.diff(now)) <= 0) {
        itemName = 'Expired';
      }
      else if (this.props.contract.info.items.length > 1) {
        itemName = <Link to={itemsPath}>[Multiple Items]</Link>;
      } 
      else {
        itemName = <Link to={itemsPath}>{this.props.contract.info.firstItem.name}</Link>;
      }
    }
    
    if (this.props.contract.info.startSystem.name.toLowerCase().includes(this.props.searchText.toLowerCase()) ||
        this.props.contract.info.endSystem.name.toLowerCase().includes(this.props.searchText.toLowerCase())) {
      const characterPath = `/character/${this.props.contract.issuer_id}`;
  
      if (this.props.type === 'item_exchange' && this.props.contract.type === 'item_exchange') {
          return (
            <tr>
              <td>{this.props.contract.contract_id}</td>
              <td>{ itemName }</td>
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
              <td>{this.props.contract.contract_id}</td>
              <td>{ itemName }</td>
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
            <td>{this.props.contract.contract_id}</td>
            <td>{this.props.contract.info.startSystem.name}</td>
            <td>{this.props.contract.info.endSystem.name}</td>
            <td>{this.props.contract.volume}</td>
            <td>{this.wordify(this.props.contract.reward)}</td>
            <td>{this.wordify(this.props.contract.collateral)}</td>
            <td>{this.props.contract.info.jumps === undefined ? 0 : this.props.contract.info.jumps.length}</td>
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
