import React from 'react'
import './Modal.css'
import { CloseIcon } from '../../assets/svg'

const Modal = ({ children, onClose }) => {
    return (
        <section id='modal-layout' className='modal-wrapper'>
            <div className='modal-container'>
                <div className='modal-close-icon' onClick={onClose}>
                    <CloseIcon />
                </div>
                {children}
            </div>
        </section>
    )
}

export default Modal