import "bulma/css/bulma.css";
import "./App.css";
import { ChampionContainer } from "./champions.js";

function App() {
  return (
    <section class="section">
      <div class="container">
        <h1 class="title">LoL Nuzlocke</h1>
        <p class="subtitle">Play the League of Legends Nuzlocke Challenge!</p>
      </div>
      <div class="container">
        <ChampionContainer></ChampionContainer>
      </div>
    </section>
  );
}

export default App;
