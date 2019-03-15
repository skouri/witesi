import React, { Component } from 'react';
import ESI from '../ESI';
import { Table } from 'react-bootstrap';
import Item from './Item';

class ItemsList extends Component {
  constructor() {
    super();
    this.state = { 
      items: []
    };
  }

  async componentDidMount() {
    let contractId = this.props.match.params.id;
    let items = await ESI.getContractItemList(contractId, 1 /* TODO */);
    for (const item of items) {
      let type = await ESI.getType(item.type_id);
      item.info = {};
      item.info.type = type;
    }

    this.setState({ items });
  }

  render() {
    let items = [];
    this.state.items.forEach( 
      (item, index) => {
        items.push( 
          <Item key={index} item={item} />
        );
      }
    );

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Name</th>
              <th>Volume</th>
              <th>Packaged Volume</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            { items }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ItemsList;
