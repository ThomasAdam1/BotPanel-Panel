import React, { Component } from "react";
import { connect } from "react-redux";
// import Toggle from '../elements/Toggle';
import InputTitle from "./InputTitle";

export class ModuleToggle extends Component {
  renderDescription = () => {
    if (this.props.settings.html) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: this.props.settings.description }}
        ></div>
      );
    } else {
      return <p>{this.props.settings.description}</p>;
    }
  };

  render() {
    return (
      <div className={`bg-menu-color rounded-lg p-6 w-full flex items-center`}>
        {" "}
        <div>
          <InputTitle settings={this.props.settings} />
          <div className="section-content-header">
            {this.renderDescription()}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <input
            value={this.props.value == "true" ? true : false}
            onChange={(e) => {
              console.log(!e.target.value, !this.props.value, "VALUE DIFF");
              this.props.change(!this.props.value);
            }}
            type="checkbox"
            class="toggle toggle-primary toggle-lg"
            checked={this.props.value}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  premium: state.data.premium,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleToggle);
