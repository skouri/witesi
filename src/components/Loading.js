import React from 'react';
import { Modal, ModalFooter, ProgressBar } from 'react-bootstrap';

class Loading extends React.Component {
    render() {
      return (
        <Modal
          show={this.props.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Loading... {this.props.loadingIndex} / {this.props.loadingTotal }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.loadingInfo}
            <ProgressBar animated now={100 * this.props.loadingIndex / this.props.loadingTotal} />
          </Modal.Body>
          <ModalFooter>
            {/* I wanted this here, but it wasn't showing up for some reason. */}
            {/* <ProgressBar now={100 * this.props.loadingIndex / this.props.loadingTotal} /> */}
          </ModalFooter>
        </Modal>
      );
    }
  }

export default Loading;