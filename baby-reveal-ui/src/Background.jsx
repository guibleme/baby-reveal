// src/Background.js
import React from 'react';
import Circle from './Circle';
import ballon1 from './assets/balao_rosa.png'; // Import your SVG file
import balloon2 from './assets/balao_azul.png'; // Import your SVG file

const Background = () => {
    const circles = Array.from({length: 5}).map((_, index) => {
        const left = Math.random() * 100; // Random position from 0% to 100%
        const delay = Math.random() * 20; // Random delay from 0s to 10s
        return <Circle key={index} left={left} delay={delay}
                       svg={<img style={{width: '50px', height: '50px'}} src={ballon1} alt="balooon SVG"/>}/>;
    });

    const circles2 = Array.from({length: 5}).map((_, index) => {
        const left = Math.random() * 100; // Random position from 0% to 100%
        const delay = Math.random() * 20; // Random delay from 0s to 10s
        return <Circle key={index} left={left} delay={delay}
                       svg={<img style={{width: '50px', height: '50px'}} src={balloon2} alt="balooon SVG"/>}/>;
    });

    return (
        <div className="background">
            {circles}
            {circles2}
            {/*<img style={{width: '100vw', position: "absolute", bottom: 0}} src={cloudFooter} alt="White clouds"/>*/}
        </div>);
};

export default Background;
