import { Container } from "@mui/material";

export default function Rules() {
  return (
    <Container>
      <h1>Rules</h1>
      <p>
        The Nuzlocke challenge is inspired by the{" "}
        <a href="https://bulbapedia.bulbagarden.net/wiki/Nuzlocke_Challenge">
          Pokemon challenge of the same name
        </a>
        .<br></br>It is a set of rules for playing League of Legends that
        imposes a greater challenge than standard play. It is similar to{" "}
        <a href="https://www.ultimate-bravery.net/">Ultimate Bravery</a>
      </p>
      <h2>1. You must play the champion that you have rolled</h2>
      <h2>
        2. When you lose a game, the champion you were playing gets removed from
        the pool and sent to the graveyard, and you must roll another champion
      </h2>
      <h2>
        3. If you get a penta kill, you can choose to bring back one champion
        from the graveyard
      </h2>
      <h2>4. Once you run out of champions, you lose the game</h2>
    </Container>
  );
}
