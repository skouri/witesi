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
      system: {}
    };
  }

  async componentDidMount() {
    // TODO Assuming a station for now. Could be a citadel. See ContractList.js.
    let station = await ESI.getStation(this.props.details.end_location_id);
    let system = await ESI.getSystem(station.system_id);
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
      system: system
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
              <Col>{this.props.details.title}</Col>{/* TODO Eve client display item name or [Multiple Items] */}
              <Col>{this.state.system.name}</Col>
              <Col>{this.props.details.price}</Col>
              {/* TODO <Col>Jumps TBD</Col> */}
              <Col>{ timeLeft }</Col>
              <Col>{this.state.issuer.name}</Col>
              <Col>{this.props.details.date_issued}</Col>
              {/* TODO <Col>Info by Issuer?</Col> */}
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
}

export default Contract;
