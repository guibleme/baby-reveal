
import './App.css'
import CountdownTimer from './CountdownTimer';
import Voting from './Voting';
import { Container, Header, Progress } from 'semantic-ui-react'

function App() {
  const targetDate = '2024-10-06T00:00:00';
  const targetDateProgress = 40;

  return (
    <Container fluid className="App">
      <CountdownTimer targetDate={targetDate} />
      <Progress percent={targetDateProgress} color='yellow' indicating />
      <div style={{height: '80px'}}></div>
      <Voting />
    </Container>
  );
}

export default App;
