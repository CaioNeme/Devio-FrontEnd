import React from 'react';
import styled from 'styled-components';

function Modal({ isOpen, closeModal, children }): React.ReactElement {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Backdrop onClick={closeModal} />
      <ModalWrapper>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        {children}
      </ModalWrapper>
    </>
  );
}

export default Modal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 999;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const CloseButton = styled.span`
  float: right;
  cursor: pointer;

  color: grey;
`;
