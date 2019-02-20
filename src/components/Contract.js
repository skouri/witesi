import React, { Component } from 'react';
import ESI from '../ESI';
import moment from 'moment';
import './Contract.css';
import { Container, Row, Col } from 'react-bootstrap';

class Contract extends Component {
  constructor() {
    super();
    this.state = { 
      character: {},
      station: {},
      system: {}
    };
  }

  async componentDidMount() {
    console.log("CDM start");
    let station = await ESI.getStation(this.props.details.end_location_id);
    let system = await ESI.getSystem(station.system_id);
    let character = await ESI.getCharacter(this.props.details.issuer_id);
    this.setState({ 
      character: character,
      station: station,
      system: system
     });
  }

  render() {
    let now = moment.now();
    let expired = moment(this.props.details.date_expired);
    let timeLeft = moment.duration(expired.diff(now)).humanize(true);
    return (
      <div className="Contract">
        <Container>
          <Row>
            <Col>{this.props.details.title}</Col>
            <Col>{this.state.system.name}</Col>
            <Col>{this.props.details.price}</Col>
            {/* TODO <Col>Jumps TBD</Col> */}
            <Col>{ timeLeft }</Col>
            <Col>{this.state.character.name}</Col>
            <Col>{this.props.details.date_issued}</Col>
            {/* TODO <Col>Info by Issuer?</Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Contract;
