// src/Circle.js
import React from 'react';
import './Circle.css';

const Circle = ({ left, delay, svg }) => {
    return (
        <div className="circle" style={{ left: `${left}%`, animationDelay: `${delay}s` }}>
            {svg}
        </div>
    );
};

export default Circle;
