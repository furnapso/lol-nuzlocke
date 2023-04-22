import { Card, CardContent } from "@mui/material";
import { Component } from "react";

export default class Champion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, portraitUrl } = this.props;
    return (
      <Card>
        <CardContent>
          <h3>{name}</h3>
          <img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/11.png" />
        </CardContent>
      </Card>
    );
  }
}
