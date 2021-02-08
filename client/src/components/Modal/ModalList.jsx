import React, { memo, useContext, Fragment } from 'react';
import Modal from './Modal';
import './Modal.scss';
import { GlobalContext } from '../../context/GlobalState';

const ModalList = () => {
    const { modalsArray, removeModal } = useContext(GlobalContext);

    return (
        <Fragment>
            {modalsArray.map(modalInfo => (
                <Modal key={modalInfo.id} modalInfo={modalInfo} removeModal={removeModal} />
            ))}
        </Fragment>

    );
};

export default memo(ModalList);