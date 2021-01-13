import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FavoritesList from "./components/FavoritesList";
import { AppContext } from "./AppContext";
import { useState } from "react";

function App() {
  const [currentCity, setCurrentCity] = useState();
  
  const appContextValue = {
    currentCity,
    setCurrentCity
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/favorites" exact>
              <FavoritesList />
            </Route>
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
