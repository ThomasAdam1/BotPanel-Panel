import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Toggle extends Component {

    renderClasses = () => {
        var classList = [];

        // Size = this.props.size
        if (this.props.size == "sm") {
            classList.push("toggle-sm");
        } else if (this.props.size == "md") {
            classList.push("toggle-md");
        } else if (this.props.size == "lg") {
            classList.push("toggle-lg");
        }
        // Add this.props.className to classList

        return classList.join(" ");
    };

    renderColor = () => {
        var style = {};
        if (this.props.color) {
            if (this.props.color == "primary" && this.props.value) {
                style.backgroundColor = this.props.color_settings.primary;
                style.borderColor = this.props.color_settings.primary;
            }
        }

        return style;
    };

    render() {
        return (
            <input
                value={this.props.value}
                onChange={(e) => {
                    this.props.onChange(!this.props.value);
                    e.stopPropagation();
                }}
                style={this.renderColor()}
                type="checkbox"
                class={`toggle ${this.renderClasses()}`}
                checked={this.props.value}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    color_settings: state.data.bot.color_settings,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);