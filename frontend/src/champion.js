import React from "react";

export class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enabled: true };
  }

  render() {
    const { name, imageUrl } = this.props;
    return (
      <div class="box champion is-clickable is-flex is-justify-content-space-around is-flex-direction-column is-align-items-center">
        <p class="is-size-6">{name}</p>
        <figure class="image is-64x64">
          <img src={imageUrl} />
        </figure>
      </div>
    );
  }
}
