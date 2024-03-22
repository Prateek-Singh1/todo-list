import React, { useState } from 'react';
import './Cards.css';
import { DeleteIcon } from '../../assets/svg';

const Cards = ({
    title = "title",
    label = "label",
    onDelete,
    noTitleClicked,
    onItemDelete,
    onArchive,
    onChange,
    onclick
}) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredItem(index);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    return (
        <section id='card' className='card-wrapper'>
            {title ?
                <div className='card-title' onClick={noTitleClicked}>{title}</div>
                :
                <></>
            }
            <div className='card-content'>
                <div className='card-item-list'>
                    <div className='card-content-details'>
                        {Array.isArray(label) ? (
                            label.map((item, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={item.content}
                                            checked={item.isChecked}
                                            onChange={() => onChange(index)}
                                            onClick={onclick}
                                        />
                                        <label>{item.content}</label>
                                    </div>
                                    {hoveredItem === index && (
                                        <div className='delete-btn' onClick={() => onItemDelete(index)}>
                                            <DeleteIcon />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className='card-option-button'>
                    <button className='btn' style={{ background: "#f96d00", color: "white" }} onClick={onDelete}>Delete</button>
                    <button className='btn' style={{ background: "#f2f2f2" }} onClick={onArchive}>Archive </button>
                </div>
            </div>
        </section>
    );
};

export default Cards;
