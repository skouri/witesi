import React, { Component } from 'react';
import ESI from '../ESI';
import './Contract.css';
import { Container, Row, Col } from 'react-bootstrap';

class Contract extends Component {
  constructor() {
    super();
    this.station = {};
    this.system = {};
  }

  async componentDidMount() {
    this.station = await ESI.getStation(this.props.details.end_location_id);
    this.system = await ESI.getSystem(this.station.system_id);
  }

  render() {
    return (
      <div className="Contract">
        <Container>
          <Row>
            <Col>{this.props.details.title}</Col>
            <Col>{this.system.name}</Col>
            <Col>{this.props.details.price}</Col>
            <Col>Jumps TBD</Col>
            <Col>Time Left TBD</Col>
            <Col>{this.props.issuer_id}</Col>
            <Col>{this.props.details.date_issued}</Col>
            <Col>Info by Issuer?</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Contract;
