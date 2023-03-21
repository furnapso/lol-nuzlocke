import React from "react";

export class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enabled: true };
  }

  render() {
    const { name } = this.props;
    return (
      <div class="box champion">
        <p class="subtitle">{name}</p>
      </div>
    );
  }
}
