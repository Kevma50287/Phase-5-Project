import React from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import FunctionButton from "../Buttons/FunctionButton";
import './BasicModal.scss'

const BasicModal = ({show, setShow, title='Enter title prop', message='Enter message prop', navigateTo=false, reload=false}) => {
  const navigate = useNavigate()
  const handleClose = () => {
    setShow(false);
    if (navigateTo){
      navigate(`${navigateTo}`)
    }
    if (reload){
      window.location.reload()
    }
  };
  return (
    <>

      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <FunctionButton title='CLOSE' clickAction={handleClose}/>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BasicModal;
