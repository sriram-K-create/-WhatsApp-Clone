import '../css/App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {BrowserRouter as Router,  Switch , Route} from "react-router-dom";
import Login from "./Login";
import { useStateValue } from '../StateProvider';
function App() {

  const [{user} , dispatch] = useStateValue(null)


  return (
    <div className="App">
      {user ? (
      <div class = "app__body">
        <Router>
          <Sidebar/>
          <Switch>
            <Route path = "/rooms/:roomId">
              <Chat/>
            </Route>

            <Route path = "/">
            </Route>
          </Switch>
        </Router>
      </div>)
      :
      (<Login />)}
    </div>
  );
}

export default App;
