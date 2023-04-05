import React from "react";
import { Champion } from "./champion";

export class ChampionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { champions: {} };
  }
  render() {
    const { champions } = this.state;
    return (
      <div class="container is-flex is-flex-wrap-wrap is-flex-direction-row is-clearfix">
        {Object.keys(champions).map((key) => {
          return <Champion name={champions[key].name} key={key}></Champion>;
        })}
      </div>
    );
  }
  getChampions() {
    fetch("http://localhost:8000/champions")
      .then((r) => r.json())
      .then((d) => {
        this.setState({ champions: d.data });
      });
  }
  componentDidMount() {
    this.getChampions();
  }
}
