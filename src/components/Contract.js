import React, { Component } from 'react';
import ESI from '../ESI';
import moment from 'moment';
import './Contract.css';
import { Container, Row, Col } from 'react-bootstrap';

class Contract extends Component {
  constructor() {
    super();
    this.state = { 
      issuer: {},
      station: {},
      system: {},
      items: [],
      firstItem: {}
    };
  }

  async componentDidMount() {
    // TODO Assuming a station for now. Could be a citadel. See ContractList.js.
    let station = await ESI.getStation(this.props.details.end_location_id);
    let system = await ESI.getSystem(station.system_id);
    
    let items = [];
    let firstItem = {};
    if (this.props.details.type === 'item_exchange' || this.props.details.type === 'auction') {
        items = await ESI.getContractItemList(this.props.details.contract_id, 1 /* TODO */);
        firstItem = await ESI.getType(items[0].type_id);
    }

    let issuer = '';
    if (this.props.details.for_corporation) {
      issuer = await ESI.getCorporation(this.props.details.issuer_corporation_id);
    }
    else {
      issuer = await ESI.getCharacter(this.props.details.issuer_id);
    }
    this.setState({ 
      issuer: issuer,
      station: station,
      system: system, 
      items: items,
      firstItem: firstItem
     });
  }

  render() {
    let now = moment.now();
    let expired = moment(this.props.details.date_expired);
    let timeLeft = moment.duration(expired.diff(now)).humanize(true);
    
    if (this.props.details.type === 'item_exchange') {
      return (
        <div className="Contract">
          <Container>
            <Row>
              <Col>{this.state.items.length > 1 ? '[Multiple Items]' : this.state.firstItem.name }</Col>
              <Col>{this.state.system.name}</Col>
              <Col>{this.wordify(this.props.details.price)}</Col>
              {/* TODO <Col>Jumps TBD</Col> */}
              <Col>{ timeLeft }</Col>
              <Col>{this.state.issuer.name}</Col>
              <Col>{this.props.details.date_issued}</Col>
              <Col>{this.props.details.title}</Col>
            </Row>
          </Container>
        </div>
      );
    }
    else {
      return (
        <div className="Contract"></div>
      );
    }
  }

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

export default Contract;
