import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ChromePicker } from "react-color";
import InputTitle from './InputTitle';
export class CustomColorPicker extends Component {
    renderDescription = () => {
        if (this.props.settings.html) {
            return <div dangerouslySetInnerHTML={{ __html: this.props.settings.description }}></div>;
        } else {
            return <p>{this.props.settings.description}</p>;
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            word: "",
            showColorPicker: false
        };

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ showColorPicker: false });
        }
    }

    componentDidMount() {
        // Set embed id to random text
        this.setState({ embed_id: Math.random().toString(36).substring(7) });
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    renderColorPicker = (colorPickerKey, color) => {
        if (this.state.showColorPicker) {
            return (
                <div
                    className=""
                    style={{ zIndex: "2", position: "absolute", right: "150px" }}
                >

                    <ChromePicker
                        color={color}
                        onChangeComplete={(color) => {
                            this.props.change(color.hex);
                        }}
                    ></ChromePicker>
                </div>
            );
        } else {
            return null;
        }
    };
    render() {
        return (
            <>


                <div className={`bg-menu-color rounded-lg flex items-center p-6 w-full`}>
                    <div>
                        <InputTitle settings={this.props.settings} />
                        <div className="section-content-header">
                            {this.renderDescription()}
                        </div>
                    </div>

                    <div style={{ marginLeft: "auto" }}>
                        <div className="levels-color-picker" ref={this.setWrapperRef}>
                            <div
                                class="w-20 h-20 rounded-lg cursor-pointer flex items-center justify-center"
                                style={{
                                    backgroundColor: this.props.value
                                }}
                                onClick={(e) => {
                                    this.setState({ showColorPicker: true });
                                }}
                            >
                                <i class="bi bi-eyedropper"></i>
                            </div>
                            {this.renderColorPicker(
                                `main`,
                                this.props.value
                            )}
                        </div>
                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    premium: state.data.premium
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomColorPicker);