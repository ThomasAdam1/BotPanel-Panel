import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputTitle from './InputTitle';

export class LongText extends Component {

    renderDescription = () => {
        if (this.props.settings.html) {
            return <div dangerouslySetInnerHTML={{ __html: this.props.settings.description }}></div>;
        } else {
            return <p>{this.props.settings.description}</p>;
        }
    };

    renderOptions = () => {
        var options = [];
        this.props.settings.options.map((option, index) => {
            options.push(<option value={option.value}>{option.label}</option>);
        });
        return options;
    };

    render() {
        return (
            <>
                <div className={`bg-menu-color rounded-lg p-6 w-full`}>
                    <div class="">
                        <InputTitle settings={this.props.settings} />

                        <div className="section-content-header mb-2">
                            {this.renderDescription()}
                        </div>
                        <div className='w-full'>
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text">{this.props.settings.label}</span>
                                </div>
                                <select value={this.props.value} onChange={(e) => {
                                    this.props.change(e.target.value);
                                }} class="select select-bordered w-full">
                                    <option disabled selected>Pick one</option>
                                    {this.renderOptions()}
                                </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(LongText);