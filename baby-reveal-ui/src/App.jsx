import './App.css'
import CountdownTimer from './CountdownTimer';
import Voting from './Voting';
import {Progress} from 'semantic-ui-react'
import Background from "./Background.jsx";

function App() {
    const targetDate = '2024-10-06T00:00:00';
    const targetDateProgress = 40;

    return (
        <div className="app-container">
            <div className="App">
                <CountdownTimer targetDate={targetDate}/>
                <Progress percent={targetDateProgress} color='yellow' indicating/>
                <div style={{height: '80px'}}></div>
                <Voting/>
            </div>
            <Background />
        </div>
    );
}

export default App;
