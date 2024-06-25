import React, { Component } from "react";
import { connect } from "react-redux";

export class Button extends Component {
  renderClasses = () => {
    var classList = [];

    // Size = this.props.size
    if (this.props.size == "sm") {
      classList.push("btn-sm");
    } else if (this.props.size == "md") {
      classList.push("btn-md");
    } else if (this.props.size == "lg") {
      classList.push("btn-lg");
    }
    // Add this.props.className to classList

    return classList.join(" ");
  };

  renderColor = () => {
    var style = {};
    if (this.props.color) {
      if (this.props.color == "primary") {
        style.backgroundColor = this.props.color_settings.primary;
      }
    }

    return style;
  };

  render() {
    return (
      <button
        disabled={this.props.disabled ? true : false}
        style={this.renderColor()}
        onClick={(e) => {
          this.props.onClick(e);
        }}
        className={`btn  text-white ${this.props.className
          } ${this.renderClasses()}`}
      >
        {this.props.children}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  color_settings: state.data.bot.color_settings,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
