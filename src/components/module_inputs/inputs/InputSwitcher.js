import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Toggle from '../elements/Toggle';
import Embed from '../../elements/Embed';
// import TextArea from '../elements/TextArea';
import InputTitle from './InputTitle';
export class ChannelSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
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
                <div className={`${this.props.settings.premium && !this.props.premium ? "opacity-75 pointer-events-none" : ""} ${!this.props.slot ? "section-content-normal" : "mb-15"}`}>
                    <div class="">
                        <InputTitle settings={this.props.settings} />

                        <div className="section-content-header mb-2">
                            {this.renderDescription()}
                        </div>
                        <div style={{ width: "100%", marginRight: "20px" }}>
                            <div className="justify-space-between">
                                <h3>{this.props.settings.label || "Message"}</h3>
                                <div className="section-content-title justify-space-between">
                                    <span style={{ marginInlineEnd: "12px" }}>{this.props.value.embed ? "Embed" : "Plain Text"}</span>
                                    <input className='toggle toggle-primary toggle-lg' value={'embed' in this.props.value ? true : false} update={(value) => {
                                        if (value) {
                                            this.props.change({ embed: {} });
                                        } else {
                                            this.props.change({ text: "" });
                                        }
                                    }} type="toggle"></input>
                                </div>
                            </div>

                            {this.props.value.embed ? <Embed value={this.props.value.embed} update={(value) => {
                                this.props.change({ embed: value });
                            }}></Embed> : <textarea value={this.props.value.text} onChange={value => {
                                this.props.change({ text: value });
                            }}></textarea>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSelect);