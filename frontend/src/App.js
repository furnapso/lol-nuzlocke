import "bulma/css/bulma.css";
import "./App.css";
import { ChampionContainer } from "./champions.js";

function App() {
  return (
    <div>
      <nav class="navbar">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">Home</a>
          </div>
        </div>
      </nav>
      <section class="section">
        <div class="section">
          <h1 class="title">LoL Nuzlocke</h1>
          <p class="subtitle">Play the League of Legends Nuzlocke Challenge!</p>
        </div>
        <div class="container">
          <ChampionContainer></ChampionContainer>
        </div>
      </section>
    </div>
  );
}

export default App;
