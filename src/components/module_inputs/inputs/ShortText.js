import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputTitle from './InputTitle';

export class ShortText extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {

    }

    renderDescription = () => {
        if (this.props.settings.html) {
            return <div dangerouslySetInnerHTML={{ __html: this.props.settings.description }}></div>;
        } else {
            return <p>{this.props.settings.description}</p>;
        }
    };
    render() {
        return (
            <>
                <div className={`bg-menu-color rounded-lg p-6 w-full`}>
                    <div class="w-full">
                        <InputTitle settings={this.props.settings} />
                        <div className="section-content-header mb-2">
                            {this.renderDescription()}
                        </div>
                        <div className={`long-input ${this.props.showIcon ? 'long-input-error' : ''}`}>

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">{this.props.settings.label}</span>
                                </div>
                                <input
                                    required
                                    type={this.props.settings.inputType || "text"}
                                    value={this.props.value}
                                    step={1}
                                    disabled={this.props.settings.premium && !this.props.premium}
                                    maxLength={this.props.settings.maxLength}
                                    className="input input-bordered w-full "
                                    min={this.props.settings?.minValue}
                                    max={this.props.settings?.maxValue}
                                    placeholder={this.props.settings.placeholder || ""}
                                    onChange={(e) => {
                                        var value = e.target.value;
                                        if (this.props.settings.inputType == "number") {
                                            console.log(value);

                                            if (value > this.props.settings.maxValue) {
                                                value = this.props.settings.maxValue;
                                            } else if (value < this.props.settings.minValue) {
                                                value = this.props.settings.minValue;
                                            }

                                            if (this.props.settings.allowDecimals == false) {
                                                value = Math.floor(value);
                                            }



                                            if (value === "") {
                                                value = this.props.settings.defaultValue;
                                            }
                                        }

                                        this.props.change(value);
                                    }}
                                >
                                </input>
                            </label>




                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    premium: state.data.premium
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShortText);;