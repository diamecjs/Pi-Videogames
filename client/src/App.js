import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import VideogameCreate from "./components/VideogameCreate"
import Details from './components/Details';
import axios from "axios";

axios.defaults.baseURL = "https://pi-videogames-production-69b8.up.railway.app/"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route  exact path="/home" component={Home} />
          <Route path='/videogames' component={VideogameCreate}/>
          <Route path="/details/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;