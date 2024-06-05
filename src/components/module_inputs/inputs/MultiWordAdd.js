import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoleAdd from '../../elements/RoleAdd';
import InputTitle from './InputTitle';

export class MultiWordAdd extends Component {
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
            word: ""
        };
    }

    render() {
        return (
            <>
                <div className={`bg-menu-color rounded-lg p-6 w-full`}>
                    <div class="">
                        <InputTitle settings={this.props.settings} refresh={true} />

                        <div className="section-content-header mb-2">
                            {this.renderDescription()}
                        </div>

                        <div className="flex flex-row items-center mb-15">
                            <div class="long-input economy-roles-input">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    var value = [...this.props.value];
                                    value.push(this.state.word);
                                    this.props.change(value);
                                    this.setState({ word: "" });
                                }}>
                                    <label className="form-control w-48 ">
                                        <div className="label">
                                            <span className="label-text">{this.props.settings.label}</span>
                                        </div>
                                        <input type="text" className='input input-bordered' disabled={this.props.settings.limit && this.props.value.length == this.props.settings.limit ? true : false} value={this.state.word} onChange={(e) => { this.setState({ word: e.target.value }); }} name="bad_word" type="text" />
                                    </label>
                                </form>
                            </div>

                            <div className="economy-roles-container w-full mt-[36px] ml-3">
                                <RoleAdd option="badwords" update={(words) => {
                                    this.props.change(words);
                                }} type="words" dropdown={false} items={this.props.value}></RoleAdd>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MultiWordAdd);