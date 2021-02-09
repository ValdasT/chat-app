import React, { useState, memo, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import CustomButton from '../CustomButtons/Button/CustomButton'
import { BiXCircle, BiErrorCircle, BiCheckCircle, } from 'react-icons/bi'
import './Modal.scss';

const Modal = ({
    modalInfo,
    removeModal
}) => {
    const [showModal, setShowModal] = useState(true);

    const onClose = () => {
        setShowModal(!showModal)
        setTimeout(() => {
            if (modalInfo.onClose) {
                modalInfo.onClose();
            }
            removeModal(modalInfo.id)
        }, 300)
    }

    const onConfirm = () => {
        setShowModal(!showModal)
        setTimeout(() => {
            if (modalInfo.onConfirm) {
                modalInfo.onConfirm();
            }
            removeModal(modalInfo.id)
        }, 300)
    }

    const showIcon = (type) => {
        switch (type) {
            case 'error':
                return (
                    <div className='modal-icon-box'>
                        <div style={{ color: '#b60303' }} className='modal-icon'> <BiXCircle /></div>
                    </div>
                );
            case 'warn':
                return (
                    <div className='modal-icon-box'>
                        <div style={{ color: '#ec9208' }} className='modal-icon'> <BiErrorCircle /></div>
                    </div>);
            case 'confirm':
                return (
                    <div className='modal-icon-box'>
                        <div style={{ color: '#00c134' }} className='modal-icon'> <BiCheckCircle /></div>
                    </div>);
            default: return null
        }
    }

    return (
        <Fragment>
            <div className="modal-bg" onClick={() => onClose()}></div>
            <CSSTransition
                unmountOnExit
                in={showModal}
                timeout={{ appear: 0, enter: 0, exit: 300 }}
                classNames='roll'
                appear
            >
                <div >
                    <div className={modalInfo.type && modalInfo.type === 'confirm' ? 'modal-enter modal-content'
                        : 'modal-enter-error modal-content'}>
                        {modalInfo.type ?
                            showIcon(modalInfo.type) : null
                        }
                        <header>
                            <h2>{modalInfo.name}</h2>
                        </header>
                        <article className="content">
                            <div>{modalInfo.body}</div>
                        </article>
                        <footer>
                            {modalInfo.onConfirm ?
                                <CustomButton onClick={() => onConfirm()}>
                                    {modalInfo.onConfirmBtn ? modalInfo.onConfirmBtn : 'Ok'}</CustomButton> : null
                            }
                            <CustomButton onClick={() => onClose()}> {modalInfo.onCloseBtn ? modalInfo.onCloseBtn : 'Close'}</CustomButton>
                        </footer>
                    </div>
                </div>
            </CSSTransition>
        </Fragment>
    );
};

export default memo(Modal);