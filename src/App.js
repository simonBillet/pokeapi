import React from 'react';
import './App.scss';
import {Accueil} from "./features/documents/Accueil";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {PokeListe} from "./features/documents/PokeListe";
import {PokemonType} from "./features/documents/PokemonType";
import {Favoris} from "./features/documents/Favoris";

function App() {
  return (
  <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link class="nav-link" to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link class="nav-link" to="/poke-liste">Poké liste</Link>
          </li>
          <li className="nav-item">
            <Link class="nav-link" to="/pokemon-type">Pokémon par type</Link>
          </li>
          <li className="nav-item">
            <Link class="nav-link" to="/mes-favoris">Mes favoris</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Accueil />
        </Route>
        <Route path="/poke-liste">
          <PokeListe />
        </Route>
        <Route path="/pokemon-type">
          <PokemonType/>
        </Route>
        <Route path="/mes-favoris">
          <Favoris/>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
