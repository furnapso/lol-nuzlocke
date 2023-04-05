import React from "react";

export class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enabled: true };
  }

  render() {
    const { name } = this.props;
    return (
      <div class="box champion is-clickable">
        <p class="is-size-5">{name}</p>
      </div>
    );
  }
}
