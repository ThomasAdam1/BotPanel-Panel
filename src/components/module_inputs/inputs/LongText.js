import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputTitle from './InputTitle';

export class LongText extends Component {

    renderDescription = () => {

        if (this.props.settings.html) {
            return <div dangerouslySetInnerHTML={{ __html: this.props.settings.description }}>
            </div>;
        } else {
            return <p>{this.props.settings.description}</p>;
        }
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
                        <div>

                            <label class="form-control">
                                <div class="label">
                                    <span class="label-text">{this.props.settings.label}</span>

                                </div>
                                <textarea
                                    onChange={(e) => {
                                        this.props.change(e.target.value);

                                    }}
                                    min={this.props.settings?.minValue}
                                    max={this.props.settings?.maxValue}
                                    class="textarea textarea-bordered h-24" value={this.props.value} placeholder={this.props.settings.placeholder}></textarea>
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