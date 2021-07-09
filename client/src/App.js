import {Switch, Route} from 'react-router-dom'
import './App.css';
import LongPolling from './LongPolling';
import EventSourcing from './EventSourcing';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/long-polling" component={LongPolling}/>
        <Route path="/event-source" component={EventSourcing}/>
      </Switch>
    </div>
  );
}

export default App;
