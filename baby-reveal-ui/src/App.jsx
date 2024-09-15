import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import CountdownTimer from './CountdownTimer';
import { Button } from 'semantic-ui-react';
import Voting from './Voting';
import Background from "./Background.jsx";

function App() {
    const { i18n } = useTranslation();
    const targetDate = new Date('2024-09-28T15:00:00');
    const baseStartDate = new Date('2023-09-15T00:00:00');

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
                <CountdownTimer targetDate={targetDate} />
                <div style={{ height: '80px' }}></div>
                <Voting />
            </div>
            <Background />
        </div>
    );
}

export default App;
