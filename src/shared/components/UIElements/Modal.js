import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Button from './Button';
import './Modal.css';

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick} />,
    document.getElementById('backdrop')
  );
};

const ModalOverlay = (props) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <header className="modal-header">
        <h2>{props.header}</h2>
      </header>
      <div className="modal-content">{props.children}</div>
      <footer className={props.errorModal ? 'modal-footer' : 'two-buttons'}>
        {props.errorModal ? null : (
          <Button className="modal-button" onClick={props.onSecondButtonClick}>
            {props.cancelButtonText}
          </Button>
        )}
        <Button className="modal-button" onClick={props.onButtonClick}>
          {props.buttonText || 'ok'}
        </Button>
      </footer>
    </div>,
    document.getElementById('overlays')
  );
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onClick} />},
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        classNames="modal"
        timeout={200}
      >
        <ModalOverlay key="transition-group-content" {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
