import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import CountdownTimer from './CountdownTimer';
import { Button, Image } from 'semantic-ui-react';
import Voting from './Voting';
import Background from "./Background.jsx";
import moment from 'moment-timezone';

import headerImagePt from './assets/cha-revelacao.png';
import headerImageEn from './assets/gender-reveal.png';
import cloudBlue from "./assets/blue-cloud.png";
import cloudPink from "./assets/pink-cloud.png";
import bearBlue from "./assets/bear-blue.png";
import bearPink from "./assets/bear-pink.png"; // Import your SVG file

function App() {
    const { i18n } = useTranslation();
    const language = i18n.language;

    // Convert targetDate and baseStartDate to the desired timezone
    const targetDate = moment.tz('2024-09-28T15:00:00', 'America/New_York').toDate(); // EST
    const baseStartDate = moment.tz('2023-09-15T00:00:00', 'America/New_York').toDate(); // EST

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="app-container">
            <div className="App">
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                    <Button basic color='red' onClick={() => changeLanguage('en')}>🇨🇦</Button>
                    <Button basic color='green' onClick={() => changeLanguage('pt')}>🇧🇷</Button>
                </div>
                <Image src={language === 'en' ? headerImageEn : headerImagePt} size='large' style={{
                    alignSelf: 'center',
                    height: '160px'
                }} />
                <CountdownTimer targetDate={targetDate} />
                <div style={{ height: '80px' }}></div>
                <Voting />
            </div>
            <div className='footer'>
                <img style={{
                    right: '-10rem',
                    width: '30vh',
                    position: 'absolute',
                    bottom: '0',
                    zIndex: '2',
                    transform: 'scale(-1, 1)',
                    objectFit: 'cover',
                }} src={cloudBlue} alt="Blue cloud" />
                <img style={{
                    left: '-10rem',
                    width: '30vh',
                    position: 'absolute',
                    bottom: '0',
                    zIndex: '2',
                    transform: 'scale(-1, 1)',
                    objectFit: 'cover',
                }} src={cloudPink} alt="Pink cloud" />
                <img style={{ right: '-4rem', width: '20vh', position: "absolute", bottom: '0', zIndex: 3 }}
                     src={bearBlue} alt="Blue bear" />
                <img style={{ left: '-7rem', width: '20vh', position: "absolute", bottom: '0', zIndex: 23 }}
                     src={bearPink}
                     alt="Pink bear" />
            </div>

            <Background />
        </div>
    );
}

export default App;
