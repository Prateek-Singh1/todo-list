import React, { useEffect, useState } from 'react';
import Modal from '../../common/modal';

const ArchiveItems = ({ onClose }) => {
    const [archivedItems, setArchivedItems] = useState([]);

    useEffect(() => {
        const archivedItemsFromLocalStorage = JSON.parse(localStorage.getItem('archivedTodos')) || [];
        setArchivedItems(archivedItemsFromLocalStorage);
    }, []);

    return (
        <Modal onClose={onClose}>
            <div>
                <h2>Archived Items</h2>
                {archivedItems.length !== 0 ?
                    archivedItems.map((item, index) => (
                        <div key={index}>
                            <strong>Title:</strong> {item.title}, <strong>Description:</strong> {item.description}
                        </div>
                    ))
                    :
                    <>
                        No Archive
                    </>
                }
            </div>
        </Modal>
    );
};

export default ArchiveItems;
