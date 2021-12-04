import React, { Component } from "react";
import "../SpecialComp/TitleTag.css";

class TitleTag extends Component {
  render() {
    return (
      <h1 className="title-tag-h1" data-text="back in black">
        {this.props.title}
      </h1>
    );
  }
}

export default TitleTag;
