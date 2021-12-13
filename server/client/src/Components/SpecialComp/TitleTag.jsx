import React, { Component } from "react";
import "../SpecialComp/TitleTag.css";

class TitleTag extends Component {
  render() {
    return (
      <h1
        style={{
          textAlign: this.props.textAlign,
          marginLeft: this.props.marginLeft,
          marginRight: this.props.marginRight,
          borderBottom: this.props.borderBottom,
          paddingBottom: this.props.paddingBottom,
          paddingLeft: this.props.paddingLeft,
          paddingRight: this.props.paddingRight,
        }}
        className="title-tag-h1"
        data-text="back in black"
      >
        {this.props.title}
      </h1>
    );
  }
}

export default TitleTag;
