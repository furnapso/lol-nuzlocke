import "bulma/css/bulma.css";
import ChampionContainer from "../components/champions.jsx";
import Navbar from "../components/navbar.jsx";

function Root() {
  return (
      <div>
        <Navbar />
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

export default Root;
