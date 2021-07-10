import {Switch, Route} from 'react-router-dom'
import './App.css';
import LongPolling from './LongPolling';
import EventSourcing from './EventSourcing';
import WebSct from './WebSct';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/long-polling" component={LongPolling}/>
        <Route path="/event-source" component={EventSourcing}/>
        <Route path="/web-socket" component={WebSct}/>
      </Switch>
    </div>
  );
}

export default App;
