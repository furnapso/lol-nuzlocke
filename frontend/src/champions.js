import React from "react";
import { Champion } from "./champion";

export class ChampionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { champions: {} };
  }
  render() {
    const { champions } = this.state;
    const championComponents = Object.keys(champions).map((key) => {
      return <Champion name={key} key={key}></Champion>;
    });
    return <div class="container champions">{championComponents}</div>;
  }
  getChampions() {
    fetch("http://localhost:8000/champions")
      .then((r) => r.json())
      .then((d) => {
        console.log("Setting state to: ", d.data);
        this.setState({ champions: d.data });
      });
  }
  componentDidMount() {
    this.getChampions();
    console.log("Component did mount", this.state);
  }
}
