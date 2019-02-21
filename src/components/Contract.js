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
      startStation: {},
      endStation: {},
      startSystem: {},
      endSystem: {},
      items: [],
      firstItem: {},
      jumps: [],
      bids: []
    };
  }

  async componentDidMount() {
    // TODO Assuming a station for now. Could be a citadel. See ContractList.js.
    let endStation = await ESI.getStation(this.props.details.end_location_id);
    let endSystem = await ESI.getSystem(endStation.system_id);

    let startStation = await ESI.getStation(this.props.details.start_location_id);
    let startSystem = await ESI.getSystem(startStation.system_id);

    let items = [];
    let firstItem = {};
    if (this.props.details.type === 'item_exchange' || this.props.details.type === 'auction') {
        items = await ESI.getContractItemList(this.props.details.contract_id, 1 /* TODO */);
        firstItem = await ESI.getType(items[0].type_id);
    }

    let jumps = [];
    if (this.props.details.type === 'courier') {
        jumps = await ESI.getRoute(startSystem.system_id, endSystem.system_id);
    }

    let bids = [];
    if (this.props.details.type === 'auction') {
      bids = await ESI.getBids(this.props.details.contract_id, 1); // TODO Total bids (all pages).
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
      endStation: endStation,
      startStation: startStation,
      endSystem: endSystem, 
      startSystem: startSystem,
      items: items,
      firstItem: firstItem,
      jumps: jumps,
      bids: bids
     });
  }

  render() {
    let now = moment.now();
    let expired = moment(this.props.details.date_expired);
    let timeLeft = moment.duration(expired.diff(now)).humanize(true);
    
    if (this.props.type === 'item_exchange' && this.props.details.type === 'item_exchange') {
      return (
        <div className="Contract">
          <Container>
            <Row>
              <Col>{this.state.items.length > 1 ? '[Multiple Items]' : this.state.firstItem.name }</Col>
              <Col>{this.state.endSystem.name}</Col>
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
    else if (this.props.type === 'auction' && this.props.details.type === 'auction') {
      return (
        <div className="Contract">
          <Container>
            <Row>
              <Col>{this.state.items.length > 1 ? '[Multiple Items]' : this.state.firstItem.name }</Col>
              <Col>{this.state.endSystem.name}</Col>
              <Col>{this.wordify(this.props.details.price)}</Col>
              <Col>{this.wordify(this.props.details.buyout)}</Col>
              <Col>{this.state.bids.length}</Col>
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
    else if (this.props.type === 'courier' && this.props.details.type === 'courier') {
      return (
        <div className="Contract">
          <Container>
            <Row>
              <Col>{this.state.startSystem.name}</Col>
              <Col>{this.state.endSystem.name}</Col>
              <Col>{this.props.details.volume}</Col>
              <Col>{this.wordify(this.props.details.reward)}</Col>
              <Col>{this.wordify(this.props.details.collateral)}</Col>
              <Col>{this.state.jumps.length}</Col>
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

export default Contract;
