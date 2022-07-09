// import { Component } from 'react';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { GrClose } from 'react-icons/gr';
import { Overlay, ModalStyled, BtnClose } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

// export class Modal extends Component {
// static propTypes = {
//   onClick: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
export function Modal({ onClose, children, prevChildren, nextChildren }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
      // this.props.onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
      // this.props.onClose();
    }
  };

  // render() {
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      {/* <ModalStyled>{this.props.children}</ModalStyled> */}
      <ModalStyled>{children}</ModalStyled>
      <BtnClose type="button" onClick={onClose}>
        <GrClose style={{ width: 30, height: 30, margin: 0 }} />
      </BtnClose>
    </Overlay>,
    modalRoot
  );
  // }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};


