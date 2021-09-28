import React from 'react'
import { Modal, Button} from 'react-bootstrap'

/**
* @author
* @function Modal
**/

export const newModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.submitData}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default newModal