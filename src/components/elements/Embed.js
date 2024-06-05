import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import Style from 'style-it';

import { ChromePicker } from 'react-color';

export class Embed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "#1e1f22",
            showColorPicker: false,
            embed_id: ""
        };

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    componentDidMount() {
        // Set embed id to random text
        this.setState({ embed_id: Math.random().toString(36).substring(7) });
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps, prevState) {
        // let sheets = document.styleSheets;
        // let selector = `#${this.state.embed_id}::before`;
        // console.log(this.props.value.color, 'COLOR HERE2');
        // for (let sheet of sheets) {
        //     if (sheet.href != null && sheet.href.startsWith(window.location.origin)) {
        //         for (let rule of sheet.cssRules) {
        //             if (rule.selectorText === selector) {
        //                 var color = '#22194D';
        //                 if (this.props.value.color != undefined) {
        //                     color = this.props.value.color;
        //                     rule.style["background"] = color;
        //                 }

        //             }
        //         }
        //     }
        // }
    }


    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ showColorPicker: false });
        }
    }

    handleColorChange = (color) => {
        // console.log(color);
        this.embedChange(color.hex, "color");
    };

    renderColorPicker = () => {
        if (this.state.showColorPicker) {
            return (
                <div className="color-picker-container">
                    <ChromePicker color={this.props.value.color || "#1e1f22"} onChangeComplete={this.handleColorChange}></ChromePicker>
                </div>
            );
        } else {
            return;
        }
    };

    textAreaChange = (value) => {
        //   console.log(value)
        if (this.props.value.description == undefined || this.props.value.description.length < 2000) {
            const embed = { ...this.props.value };
            embed.description = value;
            this.props.update(embed);
        } else {
            const embed = { ...this.props.value };
            embed.description = value.substring(0, 2000);
            this.props.update(embed);
        }
    };


    embedChange = (value, type) => {
        const embed = { ...this.props.value };
        embed[type] = value;
        this.props.update(embed);
    };


    render() {
        return (
            <>
                <Style>
                    {`
          ::before {
            background: ${this.props.value.color || "#1e1f22"};
          }
        `}
                    <div className="embed-container" >
                        <div className="embed" id={this.state.embed_id}>
                            <div className="embed-content">
                                <div className="embed-author">
                                    <input maxLength={"2024"} disabled={this.props.disabled == true ? true : false} value={this.props.value.author || ""} onChange={(e) => { this.embedChange(e.target.value, "author"); }} type="text" placeholder="Author" style={{ width: "68%" }}></input>
                                    <input maxLength={"2024"} disabled={this.props.disabled == true ? true : false} value={this.props.value.thumbnail || ""} onChange={(e) => { this.embedChange(e.target.value, "thumbnail"); }} type="text" placeholder="Thumbnail URL" style={{ width: "30%", float: "right" }}></input>
                                </div>

                                <div className="embed-title">
                                    <input maxLength={"2024"} disabled={this.props.disabled == true ? true : false} value={this.props.value.title} onChange={(e) => { this.embedChange(e.target.value, "title"); }} type="text" placeholder="Title"></input>
                                </div>
                                <div className="embed-description">
                                    <textarea extra_classNames={this.props.commandSaveFailed == true ? "command-required" : ""} slash={this.props.slash} slash_options={this.props.options} required={this.props.required || false} variableEditor={this.props.variableEditor} disabled={this.props.disabled == true ? true : false} value={this.props.value.description} onChange={this.textAreaChange} placeholder="Content*"></textarea>
                                </div>

                                <div className="embed-title">
                                    <input maxLength={"2024"} disabled={this.props.disabled == true ? true : false} value={this.props.value.image || ""} onChange={(e) => { this.embedChange(e.target.value, "image"); }} type="text" placeholder="Image URL"></input>
                                </div>

                                <div className="embed-footer">
                                    <input maxLength={"2024"} disabled={this.props.disabled == true ? true : false} type="text" value={this.props.value.footer || ""} onChange={(e) => { this.embedChange(e.target.value, "footer"); }} placeholder="Footer" style={{ width: "100%" }}></input>
                                    <input maxLength={"2024"} disabled={this.props.disabled == true ? true : false} type="text" value={this.props.value.color || ""} onChange={(e) => { this.embedChange(e.target.value, "color"); }} placeholder="Color Hex" style={{ width: "49%" }}></input>
                                    <input maxLength={"2024"} disabled={this.props.disabled == true ? true : false} type="text" value={this.props.value.link || ""} onChange={(e) => { this.embedChange(e.target.value, "link"); }} placeholder="Embed URL" style={{ width: "49%", float: "right" }}></input>

                                </div>
                            </div>

                            <div className="embed-color-picker" ref={this.setWrapperRef}>
                                <span>Color</span>
                                <div className="justify-content">
                                    <div onClick={(e) => { this.setState({ showColorPicker: !this.state.showColorPicker }); }} className="embed-color-picker-selected" style={{ backgroundColor: this.props.value.color || "#1e1f22" }}>
                                        <i class="bi bi-eyedropper" style={{ color: "#fff" }}></i>
                                    </div>
                                </div>
                                {this.renderColorPicker()}
                            </div>
                        </div>
                    </div>
                </Style>
            </>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};
Embed.propTypes = {
    children: PropTypes.element.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Embed);
