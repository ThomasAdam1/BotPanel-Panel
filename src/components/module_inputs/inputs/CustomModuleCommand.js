import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toggle from '../elements/Toggle';
import { setSelected, setBuilderSlotId, setBuilderModuleId, setBotModule, setElements, setBuilderIndex, setBuilderMode } from "../../../actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faFileImport, faCode, faCodeBranch, faEnvelope, faEye, faHashtag, faMouse, faMousePointer, faPaperPlane, faReply, faReplyAll, faSortNumericDown, faTextHeight, faUser, faUserMinus, faUserPlus, faUsers, faQuestion, faHourglass, faComment, faComments, faCommentSlash, faUserSlash, faUserTimes, faUserFriends, faUsersSlash, faPercent, faGripVertical, faHammer, faTrash, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';
import history from "../../../history.js";
import buildExistingCommand from '../commandbuilder/buildExistingCommand';
import LZString from 'lz-string';
import { ACTION_TYPES, CUSTOM_EVENTS } from '../../../variables';
import server from '../../../api/server.js';
export class CustomModuleCommand extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    commandBuilder = async () => {
        // Is a module command AND no compressed_tree, compressed_actions or actions
        var command = { ...this.props.command };
        if (this.props.command.actions_hash && this.props.custom_module && (!this.props.command.compressed_tree || !this.props.command.compressed_actions || !this.props.command.actions)) {
            var command_details = await server.post("/modules/interaction/", {
                actions_hash: this.props.command.actions_hash
            });
            if (command_details.data) {
                command[command_details.data.type] = command_details.data.tree;
            }

        }

        // console.log(command);
        // return;

        var data = {
            title: command.name,
            description: command.description,
            data: {
                ephemeral: false,
                permissions: {
                    allowed_roles: [{ name: '@everyone', id: 'everyone' }],
                    banned_roles: [],
                    banned_channels: [],
                    banned_users: [],
                    required_permissions: []
                },
                cooldown: command.cooldown,
                handleErrors: command.handleErrors,
                errors: command.errors,
            }
        };

        var components = {
            Guild: true,
            Channel: true,
            User: true,
            Member: true,
            Interaction: true,
        };
        if (this.props.mode == "event") {
            data = {
                event: true,
                enabled: true,
                data: {
                    name: "",
                    type: "",
                }
            };

            components = {
                Guild: true,
                Channel: true,
            };
        }
        if (this.props.edit != true) {
            var elements = [
                {
                    id: 'root',
                    type: 'root',

                    data: data,
                    // target:"3",
                    draggable: false,
                    position: { x: 250, y: 250 },
                },
            ];
            if (this.props.mode != "event") {
                var errorElements = await buildExistingCommand({
                    options: [],
                    actions: [{

                        nodeID: "action_3_6d1a_9853",
                        embed: {
                            color: "#FF0000",
                            description: "{error_reason}",
                            title: ":x: {error_message}",
                            footer: "{error_block}"
                        },
                        emojis: [],
                        target: { reply: true },
                        type: "embed"
                    }
                    ]
                }, 'command', true);
                elements.push(...errorElements);
            } else {
                elements.push({
                    id: "error_handler",
                    type: "error",
                    position: {
                        x: 850,
                        y: 0
                    },
                    draggable: false,
                    data: {
                        node_options: {
                            title: "Error Handler",
                            description: "Handle errors that occur during the event execution",
                            icon: faExclamationTriangle
                        },
                        data: {}
                    }
                });
            }
            // console.log(elements, 'ELEMENTS ', this.props.mode);
            this.props.setElements(elements);
            this.props.setBuilderMode({
                mode: this.props.mode == "event" ? "event" : "command",
                components: components
            });
            this.props.setSelected(null);
            this.props.setBuilderIndex(null);
            history.push("/dashboard/builder");
        } else {
            // this.buildExistingCommand()
            if (this.props.mode == "event") {

                var errorElements = [];
                var event_options = CUSTOM_EVENTS.find(event => event.value == command.type);
                components = event_options.components;

                var eventState = { ...command };
                var builtElements = [];
                if ('compressed_tree' in eventState && eventState.compressed_tree != null) {
                    var compressedString = LZString.decompressFromBase64(command.compressed_tree);
                    var tree = JSON.parse(compressedString);
                    builtElements = tree;
                } else if ('compressed_actions' in eventState && eventState.compressed_actions != null) {
                    var compressedString = LZString.decompressFromBase64(command.compressed_actions);
                    var actions = JSON.parse(compressedString);
                    eventState.actions = actions;
                    builtElements = await buildExistingCommand(eventState, 'event', false);
                    errorElements = await buildExistingCommand({
                        options: [],
                        actions: command.errors
                    }, 'event', true);
                }

                // if (this.props.beta) {
                builtElements = builtElements.concat(errorElements);
                // }

                this.props.setBuilderIndex(this.props.index);
                if (command.module_id) {
                    this.props.setBuilderModuleId(command.module_id);
                }

                if (command.slot_id) {
                    this.props.setBuilderSlotId(command.slot_id);
                }
                this.props.setElements(builtElements);
                this.props.setBuilderMode({
                    mode: this.props.mode == "event" ? "event" : "command",
                    components: components
                });

                this.props.setSelected(null);
                history.push("/dashboard/builder");
            } else {
                var errorElements = [];

                var commandState = { ...command };
                var builtElements = [];
                if ('compressed_tree' in commandState && commandState.compressed_tree != null) {
                    var compressedString = LZString.decompressFromBase64(command.compressed_tree);
                    var tree = JSON.parse(compressedString);
                    builtElements = tree;
                } else if ('compressed_actions' in commandState && commandState.compressed_actions != null) {
                    var compressedString = LZString.decompressFromBase64(command.compressed_actions);
                    var actions = JSON.parse(compressedString);
                    // console.log(actions, 'ACTIONS');
                    commandState.actions = actions;
                    builtElements = await buildExistingCommand(commandState, "command", false);
                    errorElements = await buildExistingCommand({
                        options: [],
                        actions: command.errors
                    }, 'command', true);

                }

                // if (this.props.beta) {
                builtElements = builtElements.concat(errorElements);
                // }
                this.props.setBuilderIndex(this.props.index);
                if (command.module_id) {
                    this.props.setBuilderModuleId(command.module_id);
                }

                if (command.slot_id) {
                    this.props.setBuilderSlotId(command.slot_id);
                }
                this.props.setElements(builtElements);
                this.props.setBuilderMode({
                    mode: this.props.mode == "event" ? "event" : "command",
                    components: {
                        Guild: true,
                        Channel: true,
                        User: true,
                        Member: true,
                        Interaction: true,
                    }
                });
                this.props.setSelected(null);
                history.push("/dashboard/builder");
            }

        }
    };

    renderDescription = () => {
        var description = "";
        var eventOptions = CUSTOM_EVENTS.find(x => x.value == this.props.command.type);
        if (eventOptions) {
            description = eventOptions.label;
        }
        return description;
    };
    render() {
        return (
            <div className='col-xl-6'>

                <div
                    className="command"
                    onClick={(e) => {
                        this.commandBuilder(e);
                    }}
                >



                    {this.props.command.module_edited ? <div onClick={(e) => {
                        e.stopPropagation();
                        this.props.deleteCommand();
                    }} className="absolute hover:cursor-pointer w-6 h-6 bg-red rounded-full flex justify-center align-center right-2 top-3 ">
                        {/* /                        x */}
                        <FontAwesomeIcon
                            icon={faTimes}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.props.deleteCommand();
                            }}
                        ></FontAwesomeIcon>
                    </div> : null}
                    <div
                        className="command-info"
                        onClick={(e) => {
                            this.commandBuilder(e);
                        }}
                    >



                        <div className='flex'>
                            <h3
                                className=''
                                onClick={(e) => {
                                    this.commandBuilder(e);
                                }}
                            >
                                {this.props.mode == "command" ? "/" : ""}{this.props.command.name || (this.props.mode == "event" ? this.props.command.type : "")}

                            </h3>
                            {this.props.command.module_edited ? <span className='premium-badge rounded-sm ml-2 text-sm'>Edited</span> : null}

                        </div>
                        <span
                            onClick={(e) => {
                                this.commandBuilder(e);
                            }}
                        >
                            {this.props.mode == "command" ? this.props.command.description : this.renderDescription()}
                        </span>
                    </div>

                    <div className="command-options justify-center" onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        {this.props.showToggle != false ? (
                            <div className="command-option">

                                <Toggle
                                    value={this.props.command.enabled != false ? true : false}
                                    update={(value) => {
                                        this.props.toggleCommand(value);
                                    }}
                                ></Toggle>
                            </div>
                        ) : null}

                        {this.props.custom_command == true ?
                            <div className="command-option">
                                <button className="btn btn-red" onClick={(e) => { this.setState({ openCC: true }); }}>Edit</button>
                            </div> : null}


                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    slash: state.data.bot.commands.slash,
    custom_events: state.data.bot.commands.custom_events,
    premium: state.data.premium,
    bot: state.data.bot,
    user: state.data.user,
    beta: state.data.beta,
    moduleSettings: state.data.bot.commands.moduleSettings
});

const mapDispatchToProps = {
    setBotModule,
    setBuilderIndex,
    setBuilderModuleId,
    setElements,
    setSelected,
    setBuilderSlotId,
    setBuilderMode
};


export default connect(mapStateToProps, mapDispatchToProps)(CustomModuleCommand);;;