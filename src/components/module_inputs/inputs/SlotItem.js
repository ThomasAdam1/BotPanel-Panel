import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputSwitcher from './InputSwitcher';
import RoleSelect from './RoleSelect';
import MultiRoleSelect from './MultiRoleSelect';
import MultiChannelSelect from './MultiChannelSelect';
import MultiWordAdd from './MultiWordAdd';
import CustomColorPicker from './CustomColorPicker';
import LongText from './LongText';
import ModuleSelect from './ModuleSelect';
import ModuleToggle from './ModuleToggle';
import ChannelSelect from './ChannelSelect';
import ShortText from '../inputs/ShortText';

export class SlotItem extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }
    componentDidMount() {
        if (this.props.slot != undefined) {
            Object.keys(this.props.slot.settings).forEach((key) => {
                this.setState({ [key]: this.props.slot.settings[key] });
            });
        } else {
            this.props.settings.inputs.forEach((input) => {
                var object = {};
                if (input.type.includes("multi")) {

                    object = {
                        value: input.defaultValue != undefined ? input.defaultValue : [],
                        id: input.id,
                        name: input.name,
                        type: input.type,
                    };
                } else if (input.type == "slot") {
                    object = {
                        value: input.defaultValue != undefined ? input.defaultValue : [],
                        id: input.id,
                        name: input.name,
                        type: input.type,
                        inputs: input.inputs
                    };
                } else {
                    object = {
                        value: input.defaultValue != undefined ? input.defaultValue : "",
                        id: input.id,
                        name: input.name,
                        type: input.type,
                    };
                }

                this.setState({ [input.id]: object });
            });
        }
    }

    addSlot = () => {
        // Go through each input, if doesn't exist in state use default value

        var state = { ...this.state };
        this.props.settings.inputs.forEach((input) => {
            if (state[input.id].value == undefined) {
                if (input.required) {
                    state.error = `Please enter a value for "${input.title}"`;
                    this.setState(state);
                    return;
                }
                state[input.id].value = input.defaultValue;
            }
        }
        );

        // Generate random slot ID
        if (this.props.index == "new") {
            var id = Math.random().toString(36).substring(7);
            state.slot_id = id;

            if (this.props.settings.slot_limit != undefined || this.props.settings.slot_premium_limit) {
                if (!this.props.premium && this.props.settings.slot_limit <= this.props.slot_count) {
                    return;
                } else if (this.props.premium && this.props.settings.slot_premium_limit <= this.props.slot_count) {
                    return;
                }
            }


            this.props.settings.inputs.forEach((input) => {
                var object = {};
                if (input.type.includes("multi")) {

                    object = {
                        value: input.defaultValue != undefined ? input.defaultValue : [],
                        id: input.id,
                        name: input.name,
                        type: input.type,
                    };
                } else if (input.type == "slot") {
                    object = {
                        value: input.defaultValue != undefined ? input.defaultValue : [],
                        id: input.id,
                        name: input.name,
                        type: input.type,
                        inputs: input.inputs
                    };
                } else {
                    object = {
                        value: input.defaultValue != undefined ? input.defaultValue : "",
                        id: input.id,
                        name: input.name,
                        type: input.type,
                    };
                }

                this.setState({ [input.id]: object });
            });
        }


        this.props.addSlot(state);

    };
    renderInputs = (id) => {

        var sectionInputs = [];

        sectionInputs.push(this.props.settings.inputs.map((input, index) => {
            var value = input.defaultValue;
            if (this.state[input.id] !== undefined) {
                value = this.state[input.id].value;
            }

            // Check for SHOW object in input
            if (input.show) {
                var show = input.show;
                var passed = false;

                for (var key in this.state) {
                    var showValue = show.value;

                    if (typeof showValue == "object") {
                        if (show.id == key && showValue.includes(this.state[key].value)) {
                            passed = true;
                        }
                    } else {
                        if (show.id == key && this.state[key].value == show.value) {
                            passed = true;
                        }
                    }

                }


                if (!passed) return;


            }
            switch (input.type) {
                case "short":
                    return <ShortText value={value} slot={true} settings={input} change={(value) => {
                        // console.log('value');
                        var state = { ...this.state };
                        state[input.id].value = value;
                        this.setState(state);
                    }} />;
                case "long":
                    return <LongText slot={true} value={value} settings={input} change={(value) => {
                        // console.log('value', this.state);
                        var state = { ...this.state };
                        state[input.id].value = value;
                        this.setState(state);
                    }} />;
                case "select":
                    return <ModuleSelect slot={true} value={value} settings={input} change={(value) => {
                        // console.log('value');
                        var state = { ...this.state };
                        state[input.id].value = value;
                        this.setState(state);
                    }} />;
                case "toggle":
                    return <ModuleToggle slot={true} change={(value) => {
                        var state = { ...this.state };
                        state[input.id].value = value;
                        this.setState(state);
                    }} value={value} settings={input} />;
                case "channel_select":
                    return <ChannelSelect slot={true} change={(value) => {
                        var state = { ...this.state };
                        state[input.id].value = value;
                        this.setState(state);
                    }} value={value} settings={input} />;
                case "role_select":
                    return <RoleSelect slot={true} change={(value) => {
                        var state = { ...this.state };
                        state[input.id].value = value;
                        this.setState(state);
                    }} value={value} settings={input} />;

                case "input_switch":
                    return <InputSwitcher slot={true} value={value} settings={input}
                        change={(value) => {
                            var state = { ...this.state };
                            state[input.id].value = value;
                            this.setState(state);
                        }}

                    />;
                case "multi_role_select":
                    return <MultiRoleSelect slot={true} value={value} settings={input}
                        change={(value) => {
                            var state = { ...this.state };
                            state[input.id].value = value;
                            this.setState(state);
                        }}

                    />;

                case "multi_channel_select":
                    return <MultiChannelSelect slot={true} value={value} settings={input}
                        change={(value) => {
                            var state = { ...this.state };
                            state[input.id].value = value;
                            this.setState(state);
                        }}

                    />;

                case "word_add_input":
                    return <MultiWordAdd slot={true} value={value} settings={input}
                        change={(value) => {
                            var state = { ...this.state };
                            state[input.id].value = value;
                            this.setState(state);
                        }}

                    />;

                case "color":
                    return <CustomColorPicker slot={true} value={value} settings={input}
                        change={(value) => {
                            var state = { ...this.state };
                            state[input.id].value = value;
                            this.setState(state);
                        }}

                    />;
                default:
                    return <ShortText slot={true} value={value} settings={input} />;
            }
        }));

        var inputs = sectionInputs;

        inputs.forEach((input, index) => {
            if (!input) {
                inputs.splice(index, 1);
            }
        });


        return (
            <>
                {
                    inputs
                }

            </>
        );



    };

    addWebhook = () => {

    };

    render() {
        return (
            <div className="">
                <span style={{ color: "red", fontWeight: "600" }}>
                    {this.state.error}
                </span>

                <hr class="slashcommand-hr" />

                <div>
                    {/* Render Slots */}
                    {this.renderInputs('new')}
                </div>

                <hr class="slashcommand-hr" />
                <div style={{ display: "flex" }}>
                    <div style={{ marginLeft: "auto" }}>
                        {this.props.index != "new" ? (
                            <button
                                style={{ marginRight: "15px" }}
                                onClick={() => {
                                    this.props.deleteSlot(this.props.index);
                                }}
                                className="btn btn-gray mt-15 mr-15"
                                type="button"
                            >
                                Delete
                            </button>
                        ) : null}
                        <button className="btn btn-red mt-15" onClick={() => {
                            this.addSlot();
                        }}>

                            {this.props.index == "new" ? "Add" : "Edit"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    premium: state.data.premium
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SlotItem);