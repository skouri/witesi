import React from 'react';
import { Modal } from 'react-bootstrap';

class Loading extends React.Component {
    render() {
      return (
        <Modal
          {...this.props.show}
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
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      );
    }
  }

export default Loading;