import React, { Component } from 'react';
import './Contract.css';

class Item extends Component {
  render() {
    return (
      <tr key={this.props.index}>
        <td>{ this.props.item.quantity }</td>
        <td>{ this.props.item.info.type.name }</td>
        <td>{ this.props.item.info.type.volume }</td>
        <td>{ this.props.item.info.type.packaged_volume }</td>
        <td>{ this.props.item.info.type.description }</td>
      </tr>
    );
  }
}

export default Item;
