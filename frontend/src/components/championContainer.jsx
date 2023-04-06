import React from "react";
import Champion from "./champion";

const baseUrl = "http://localhost:8000";

export default class ChampionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { champions: {}, currentVersion: null };
  }
  render() {
    const { champions } = this.state;
    return (
      <div class="container is-flex is-flex-wrap-wrap is-flex-direction-row">
        {Object.keys(champions).map((champ) => {
          return (
            <Champion
              name={champions[champ].name}
              key={champ}
              imageUrl={this.getChampionImageUrl(champ)}
            ></Champion>
          );
        })}
      </div>
    );
  }
  getChampions() {
    fetch(`${baseUrl}/champions`)
      .then((r) => r.json())
      .then((d) => {
        this.setState({ champions: d.data });
      });
  }
  getLatestVersion() {
    fetch(`${baseUrl}/version`)
      .then((r) => r.text())
      .then(JSON.parse)
      .then((d) => this.setState({ currentVersion: d }));
  }
  getChampionImageUrl(champion) {
    const { currentVersion, champions } = this.state;
    if (currentVersion == null || champions == null) {
      return null;
    }

    const championImageName = champions[champion].image.full;

    return championImageName == null
      ? null
      : `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${championImageName}`;
  }
  componentDidMount() {
    this.getChampions();
    this.getLatestVersion();
  }
}
