import React, { Component } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { connect } from 'react-redux';


import Dashboard from "../Dashboard";
// import CustomEventEditor from '../elements/CustomEventEditor';
import ModuleHeader from '../elements/ModuleHeader';
// import SectionHeader from '../elements/SectionHeader';
// import SlashCommand from '../elements/SlashCommand';
import LongText from '../module_inputs/inputs/LongText';
import ModuleSelect from '../module_inputs/inputs/ModuleSelect';
import ModuleToggle from '../module_inputs/inputs/ModuleToggle';
import ShortText from '../module_inputs/inputs/ShortText';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ChannelSelect from '../module_inputs/inputs/ChannelSelect';
// import ReactGA from 'react-ga';
import InputSwitcher from '../module_inputs/inputs/InputSwitcher';
import RoleSelect from '../module_inputs/inputs/RoleSelect';
import MultiRoleSelect from '../module_inputs/inputs/MultiRoleSelect';
import MultiChannelSelect from '../module_inputs/inputs/MultiChannelSelect';
import MultiWordAdd from '../module_inputs/inputs/MultiWordAdd';
import CustomColorPicker from '../module_inputs/inputs/CustomColorPicker';
// import CustomModuleCommand from '../module_inputs/inputs/CustomModuleCommand';
// import CustomSlots from '../module_inputs/inputs/CustomSlots';
// import PremiumSection from '../elements/PremiumSection';
// import server from '../../../api/server';
// import RippleLoader from '../elements/RippleLoader';
// import history from '../../../history';
import EmojiSelect from '../module_inputs/inputs/EmojiSelect';
import Button from "../elements/Button";
// import ModuleShop from '../module_inputs/inputs/ModuleShop';
import history from '../../utils/history';



export class CustomModule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            module: {},
            openModal: false,
            beta: false,
            loaded: false
        };
    }
    componentDidMount() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        this.setModule();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.modules.length != this.props.modules.length) {
            this.setModule();
        }

        if (this.state.module.id != this.props.match.params.module_id) {
            this.setModule();
            // Reload module page

        }
    }

    setModule = async () => {
        var module = this.props.modules.find(m => m.id === this.props.match.params.module_id);
        console.log(module, this.props.match.params);

        this.setState({
            module: module,
            loaded: true
        });
        // if (!module.sections) {
        //     // Get the module data from the API and set it
        //     var moduleData = await server.get(`/modules/data/${this.props.match.params.id}`);
        //     if (moduleData && moduleData.data) {

        //         this.setState({
        //             module: moduleData.data,
        //             loaded: true
        //         });
        //     } else {
        //         history.push('/dashboard/modules');
        //     }
        // }

    };



    renderSections = () => {
        var sections = [];
        var moduleSections = this.state.module.sections;
        if (this.props.moduleSettings[this.state.module.id] !== undefined) {
            moduleSections = this.props.moduleSettings[this.state.module.id].sections;
            // Check if the premium of this.props.moduleSettings[this.state.module.id] is different from this.state.module.premium
            if (this.props.moduleSettings[this.state.module.id].premium !== this.state.module.premium && this.state.module.premium == true) {
                console.log("DIFFERENT IN PREMIUM", this.props.moduleSettings[this.state.module.id].premium, this.state.module.premium);
                var module = { ...this.state.module };
                module.premium = this.props.moduleSettings[this.state.module.id].premium ? true : false;
                this.setState({ module: module });
            }
        }
        moduleSections.forEach(section => {
            var passed = true;
            if (section.module_section_id && this.props.moduleSettings[this.state.module.id]?.commands) {
                var commands = this.props.moduleSettings[this.state.module.id].commands;
                // console.log(commands, 'MODULE COMMANDS');
                commands.forEach(command => {
                    if (command.module_section_id === section.module_section_id && command.enabled == false) {
                        // console.log("MODULE COMMANDS 2");
                        passed = false;
                    }
                });

            }
            if (!passed) return;

            var sectionInputs = [];

            sectionInputs.push(
                section.inputs.map(input => {
                    var value = input.defaultValue;
                    if (this.props.moduleSettings[this.state.module.id] !== undefined && this.props.moduleSettings[this.state.module.id].settings[input.id] != undefined) {
                        // console.log("DONT SET VAUE SHJORT TEXT");
                        value = this.props.moduleSettings[this.state.module.id].settings[input.id].value;
                    }

                    // Check for SHOW object in input
                    if (input.show) {
                        var show = input.show;
                        var passed = false;
                        if (this.props.moduleSettings[this.state.module.id]?.settings[show.id] !== undefined) {
                            for (var key in this.props.moduleSettings[this.state.module.id].settings) {
                                var showValue = show.value;

                                if (typeof showValue == "object") {
                                    if (show.id == key && showValue.includes(this.props.moduleSettings[this.state.module.id].settings[key].value)) {
                                        passed = true;
                                    }
                                } else {
                                    if (show.id == key && this.props.moduleSettings[this.state.module.id].settings[key].value == show.value) {
                                        passed = true;
                                    }
                                }

                            }
                            if (!passed) return;
                        } else {
                            // Go through all the inputs of each section. Find the show id and check if its default value is equal to the show value
                            var sectionInputs = this.state.module.sections.find(section => section.inputs.find(input => input.id == show.id));

                            if (sectionInputs) {
                                var showInput = sectionInputs.inputs.find(input => input.id == show.id);
                                if (showInput.defaultValue != show.value) {
                                    return;
                                } else {
                                    passed = true;

                                }
                            }
                            if (!passed) return;
                        }

                    }
                    switch (input.type) {
                        case "short":
                            return <ShortText value={value} settings={input} change={(value) => {

                                var settings = { ...this.props.moduleSettings };
                                settings[this.state.module.id].settings[input.id].value = value;
                                this.props.setBotModule({
                                    module: "moduleSettings",
                                    module_data: settings,
                                });
                            }} />;
                        case "long":
                            return <LongText value={value} settings={input} change={(value) => {
                                var settings = { ...this.props.moduleSettings };
                                settings[this.state.module.id].settings[input.id].value = value;
                                this.props.setBotModule({
                                    module: "moduleSettings",
                                    module_data: settings,
                                });
                            }} />;
                        case "select":
                            return <ModuleSelect value={value} settings={input} change={(value) => {
                                var settings = { ...this.props.moduleSettings };
                                settings[this.state.module.id].settings[input.id].value = value;
                                this.props.setBotModule({
                                    module: "moduleSettings",
                                    module_data: settings,
                                });
                            }} />;
                        case "toggle":
                            return <ModuleToggle change={(value) => {
                                var settings = { ...this.props.moduleSettings };
                                settings[this.state.module.id].settings[input.id].value = value;
                                this.props.setBotModule({
                                    module: "moduleSettings",
                                    module_data: settings,
                                });
                            }} value={value} settings={input} />;
                        case "channel_select":
                            return <ChannelSelect change={(value) => {
                                var settings = { ...this.props.moduleSettings };
                                settings[this.state.module.id].settings[input.id].value = value;
                                this.props.setBotModule({
                                    module: "moduleSettings",
                                    module_data: settings,
                                });
                            }} value={value} settings={input} />;
                        case "role_select":
                            return <RoleSelect change={(value) => {
                                var settings = { ...this.props.moduleSettings };
                                settings[this.state.module.id].settings[input.id].value = value;
                                this.props.setBotModule({
                                    module: "moduleSettings",
                                    module_data: settings,
                                });
                            }} value={value} settings={input} />;
                        case "emoji_input":
                            return <EmojiSelect value={value} settings={input}
                                change={(value) => {
                                    var settings = { ...this.props.moduleSettings };
                                    settings[this.state.module.id].settings[input.id].value = value;
                                    this.props.setBotModule({
                                        module: "moduleSettings",
                                        module_data: settings,
                                    });
                                }}

                            />;

                        case "input_switch":
                            return <InputSwitcher value={value || { text: "" }} settings={input}
                                change={(value) => {
                                    var settings = { ...this.props.moduleSettings };
                                    settings[this.state.module.id].settings[input.id].value = value;
                                    this.props.setBotModule({
                                        module: "moduleSettings",
                                        module_data: settings,
                                    });
                                }}

                            />;
                        case "multi_role_select":
                            return <MultiRoleSelect value={value} settings={input}
                                change={(value) => {
                                    var settings = { ...this.props.moduleSettings };
                                    settings[this.state.module.id].settings[input.id].value = value;
                                    this.props.setBotModule({
                                        module: "moduleSettings",
                                        module_data: settings,
                                    });
                                }}

                            />;

                        case "multi_channel_select":
                            return <MultiChannelSelect value={value} settings={input}
                                change={(value) => {
                                    var settings = { ...this.props.moduleSettings };
                                    settings[this.state.module.id].settings[input.id].value = value;
                                    this.props.setBotModule({
                                        module: "moduleSettings",
                                        module_data: settings,
                                    });
                                }}

                            />;

                        case "word_add_input":
                            return <MultiWordAdd value={value} settings={input}
                                change={(value) => {
                                    var settings = { ...this.props.moduleSettings };
                                    settings[this.state.module.id].settings[input.id].value = value;
                                    this.props.setBotModule({
                                        module: "moduleSettings",
                                        module_data: settings,
                                    });
                                }}

                            />;

                        case "color":
                            return <CustomColorPicker value={value} settings={input}
                                change={(value) => {
                                    var settings = { ...this.props.moduleSettings };
                                    settings[this.state.module.id].settings[input.id].value = value;
                                    this.props.setBotModule({
                                        module: "moduleSettings",
                                        module_data: settings,
                                    });
                                }}

                            />;

                        case "shop":
                            console.log("SHOP VALUE", value, input, 'SHOP VALUE');
                            return <></>;
                        // return <ModuleShop onChange={(items) => {
                        //     var settings = { ...this.props.moduleSettings };
                        //     settings[this.state.module.id].settings[input.id].value = items;
                        //     this.props.setBotModule({
                        //         module: "moduleSettings",
                        //         module_data: settings,
                        //     });
                        // }} value={value} settings={input} />;
                        // case "slot":
                        //     return <CustomSlots value={value} settings={input}
                        //         addSlot={(slot, index) => {
                        //             // console.log('value', slot, index);
                        //             var settings = { ...this.props.moduleSettings };
                        //             if (input.slot_type == "event") {
                        //                 var slot_event = { ...input.slot_event };
                        //                 slot_event.slot_id = slot.slot_id;
                        //                 slot_event.input_id = input.id;
                        //                 slot_event.name = `${input.individual_slot_name} #${settings[this.state.module.id].settings[input.id].value.length + 1}`;


                        //                 if (index == "new") {
                        //                     settings[this.state.module.id].events.push(slot_event);

                        //                     // console.log(slot_event, 'SLOT EVENT');
                        //                     if ('custom_variables' in slot_event) {
                        //                         var custom_variables = slot_event.custom_variables;
                        //                         var existing_variables = { ...this.props.bot.commands.variables };

                        //                         custom_variables.forEach((variable) => {
                        //                             var variable_settings = existing_variables.variables.find((v) => v.reference == variable.reference);
                        //                             if (!variable_settings && variable) {
                        //                                 existing_variables.variables.push(variable);
                        //                             } else {
                        //                                 // Find index and update
                        //                                 var index = existing_variables.variables.findIndex((v) => v.reference == variable.reference);
                        //                                 existing_variables.variables[index] = variable;

                        //                             }
                        //                         });
                        //                         this.props.setBotModule(
                        //                             {
                        //                                 module: "variables",
                        //                                 module_data: existing_variables
                        //                             }
                        //                         );
                        //                     }


                        //                     if (slot_event.type == "timedEvent") {
                        //                         console.log("TIMED EVENT INSIDE");
                        //                         var timed_events = { ...this.props.bot.commands.timed_events };
                        //                         var existing_timed_event = timed_events.events.find((e) => e.id == slot_event.timer_id);
                        //                         if (!existing_timed_event && this.state.module.timed_events) {
                        //                             var timed_event = this.state.module.timed_events.find((e) => e.id == slot_event.timer_id);
                        //                             if (timed_event) {
                        //                                 timed_events.events.push(timed_event);
                        //                                 this.props.setBotModule(
                        //                                     {
                        //                                         module: "timed_events",
                        //                                         module_data: timed_events
                        //                                     }

                        //                                 );
                        //                             }

                        //                         }

                        //                     }
                        //                     settings[this.state.module.id].settings[input.id].value.push({
                        //                         settings: slot,
                        //                         // event: slot_event,
                        //                     });
                        //                 } else {
                        //                     settings[this.state.module.id].settings[input.id].value[index] = {
                        //                         settings: slot,
                        //                         // event: slot_event
                        //                     };
                        //                 }
                        //             } else if (input.slot_type == "value") {
                        //                 if (index == "new") {
                        //                     settings[this.state.module.id].settings[input.id].value.push({
                        //                         settings: slot,
                        //                     });
                        //                 } else {
                        //                     settings[this.state.module.id].settings[input.id].value[index] = {
                        //                         settings: slot,
                        //                     };
                        //                 }
                        //             }

                        //             // Go through settings and remove .event if it exists

                        //             settings[this.state.module.id].settings[input.id].value.forEach((slot, index) => {
                        //                 if (slot.event) {
                        //                     delete slot.event;
                        //                 }
                        //             });

                        //             this.props.setBotModule({
                        //                 module: "moduleSettings",
                        //                 module_data: settings,
                        //             });



                        //         }}

                        //         deleteSlot={(index) => {
                        //             // console.log('value', index);
                        //             var settings = { ...this.props.moduleSettings };
                        //             // Find corrosponding event
                        //             if (input.slot_type == "event") {
                        //                 var events = settings[this.state.module.id].events;
                        //                 var event_index = events.findIndex((event) => {
                        //                     return event.slot_id == settings[this.state.module.id].settings[input.id].value[index].settings?.slot_id;
                        //                 });

                        //                 if (event_index !== -1) {
                        //                     settings[this.state.module.id].events.splice(event_index, 1);
                        //                 }

                        //             }


                        //             settings[this.state.module.id].settings[input.id].value.splice(index, 1);
                        //             this.props.setBotModule({
                        //                 module: "moduleSettings",
                        //                 module_data: settings,
                        //             });
                        //         }}

                        //     />;
                        default:
                            return <ShortText value={value} settings={input} />;
                    }
                })
            );

            var inputs = sectionInputs[0];

            inputs.forEach((input, index) => {
                if (!input) {
                    inputs.splice(index, 1);
                }
            });

            // console.log('Inputs', inputs);




            if (inputs.length > 0) {
                sections.push(
                    <section className='gap-y-7 flex flex-col mt-5' premiumRequired={this.state.module.premium || section.premium == true ? true : false}>
                        <div>
                            <h3 className='text-white text-2xl font-bold'>{section.title}</h3>
                        </div>
                        {/* <SectionHeader docs={section.help ? true : false} docs_link={section.help ? section.help : false} pretitle={section.description} title={section.title} premiumRequired={section.premium} module={true} /> */}
                        {inputs}
                    </section>
                );
            }

        });

        return sections;
    };





    // renderCommands = () => {
    //     var commands = [];
    //     if (this.props.moduleSettings[this.state.module.id] !== undefined) {
    //         // console.log(this.props.moduleSettings[this.state.module.id].commands, 'HERE');
    //         this.props.moduleSettings[this.state.module.id].commands.forEach((command, index) => {
    //             if (command.event || !command.name || !command.description) {
    //                 return;
    //             }

    //             //   filter = filter.split(" ").join("-");
    //             //   if (this.state.filter == "" || (name.includes(filter) || description.includes(filter))) {
    //             // commands.push(
    //             //     <SlashCommand module={true} command={command} index={index}></SlashCommand>
    //             // );


    //             commands.push(
    //                 <CustomModuleCommand
    //                     deleteCommand={() => {
    //                         var settings = { ...this.props.moduleSettings };
    //                         settings[this.state.module.id].commands.splice(index, 1);
    //                         this.props.setBotModule({
    //                             module: "moduleSettings",
    //                             module_data: settings,
    //                         });

    //                     }}
    //                     custom_module={true} toggleCommand={(value) => {
    //                         var settings = { ...this.props.moduleSettings };
    //                         settings[this.state.module.id].commands[index].enabled = value;
    //                         this.props.setBotModule({
    //                             module: "moduleSettings",
    //                             module_data: settings,
    //                         });
    //                     }} edit={true} command={command} mode={"command"} index={index} />
    //             );
    //             //   }
    //             // commands.push(
    //             //     <SlashCommand command={command} index={index}></SlashCommand>
    //             // );
    //         });
    //     }
    //     else if (this.state.module != undefined) {
    //         this.state.module.commands.forEach((command, index) => {
    //             if (command.event || !command.name || !command.description) {
    //                 return;
    //             }

    //             //   filter = filter.split(" ").join("-");
    //             //   if (this.state.filter == "" || (name.includes(filter) || description.includes(filter))) {
    //             commands.push(
    //                 <CustomModuleCommand deleteCommand={() => {
    //                     var settings = { ...this.props.moduleSettings };
    //                     settings[this.state.module.id].commands.splice(index, 1);
    //                     this.props.setBotModule({
    //                         module: "moduleSettings",
    //                         module_data: settings,
    //                     });
    //                 }} custom_module={true} toggleCommand={(value) => {
    //                     var settings = { ...this.props.moduleSettings };
    //                     settings[this.state.module.id].commands[index].enabled = value;
    //                     this.props.setBotModule({
    //                         module: "moduleSettings",
    //                         module_data: settings,
    //                     });
    //                 }} edit={true} command={command} mode={"command"} index={index} />
    //             );
    //             //   }
    //             // commands.push(
    //             //   <SlashCommand command={command} index={index}></SlashCommand>
    //             // );
    //         });
    //     }
    //     if (commands.length > 0 || (this.state.module?.allowAddCommands && this.props.premium)) {
    //         return (<PremiumSection premiumRequired={this.state.module.premium ? true : false}>
    //             {/* <SectionHeader pretitle={`${this.state.module.name}`} title="Commands" /> */}
    //             <div>
    //                 <p class="section-pretitle">{this.state.module.name} </p>
    //                 <div className='flex items-center'>
    //                     <h2 class="section-title">Commands</h2>

    //                 </div>
    //             </div>

    //             <div className="row">
    //                 {commands}

    //                 {this.state.module?.allowAddCommands && this.props.premium ? this.renderAddCommand() : null}

    //             </div>
    //         </PremiumSection>);
    //     } else {
    //         return null;
    //     }

    // };

    // renderEvents = () => {
    //     var events = [];
    //     if (this.props.moduleSettings[this.state.module.id] !== undefined) {
    //         // console.log(this.props.moduleSettings[this.state.module.id].events, 'HERE');
    //         this.props.moduleSettings[this.state.module.id].events.forEach((command, index) => {


    //             //   filter = filter.split(" ").join("-");
    //             //   if (this.state.filter == "" || (name.includes(filter) || description.includes(filter))) {
    //             events.push(
    //                 <CustomModuleCommand deleteCommand={() => {
    //                     var settings = { ...this.props.moduleSettings };
    //                     settings[this.state.module.id].events.splice(index, 1);
    //                     this.props.setBotModule({
    //                         module: "moduleSettings",
    //                         module_data: settings,
    //                     });
    //                 }} custom_module={true} toggleCommand={(value) => {
    //                     var settings = { ...this.props.moduleSettings };
    //                     settings[this.state.module.id].events[index].enabled = value;
    //                     this.props.setBotModule({
    //                         module: "moduleSettings",
    //                         module_data: settings,
    //                     });
    //                 }} edit={true} command={command} mode={"event"} index={index} />
    //             );
    //             //   }
    //             // commands.push(
    //             //   <SlashCommand command={command} index={index}></SlashCommand>
    //             // );
    //         });
    //     }
    //     else if (this.state.module != undefined) {
    //         this.state.module.events.forEach((command, index) => {

    //             //   filter = filter.split(" ").join("-");
    //             //   if (this.state.filter == "" || (name.includes(filter) || description.includes(filter))) {
    //             events.push(
    //                 <CustomModuleCommand deleteCommand={() => {
    //                     var settings = { ...this.props.moduleSettings };
    //                     settings[this.state.module.id].events.splice(index, 1);
    //                     this.props.setBotModule({
    //                         module: "moduleSettings",
    //                         module_data: settings,
    //                     });
    //                 }} custom_module={true} toggleCommand={(value) => {
    //                     var settings = { ...this.props.moduleSettings };
    //                     settings[this.state.module.id].events[index].enabled = value;
    //                     this.props.setBotModule({
    //                         module: "moduleSettings",
    //                         module_data: settings,
    //                     });
    //                 }} edit={true} command={command} mode={"event"} index={index} />
    //             );
    //             //   }
    //             // commands.push(
    //             //   <SlashCommand command={command} index={index}></SlashCommand>
    //             // );
    //         });
    //     }
    //     if (events.length > 0 || (this.state.module?.allowAddEvents && this.props.premium)) {
    //         return (<PremiumSection premiumRequired={this.state.module.premium ? true : false}>
    //             <SectionHeader pretitle={`${this.state.module.name}`} title="Events" />

    //             <div className="row">
    //                 {events}
    //                 {this.state.module?.allowAddEvents && this.props.premium ? this.renderAddCommand('event') : null}
    //             </div>
    //         </PremiumSection>
    //         );
    //     } else {
    //         return null;
    //     }

    // };

    render() {
        if (this.state.loaded === false) return (<Dashboard server_id={this.props.match.params.server_id}>
            <div className='h-full flex items-center justify-center w-full'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>

            </div>
        </Dashboard>);
        return (
            <Dashboard server_id={this.props.match.params.server_id}>

                {/* Module Header */}

                <header className="bg-menu-color rounded-md flex px-5 py-8 items-center">

                    <div className='flex'>

                        <img src={this.state.module.img} alt="" className='h-[50px]'></img>

                        <div className='ml-3'>
                            <h3 className='text-3xl font-bold text-white'>{this.state.module.name}</h3>
                            <p className='text-sm'>{this.state.module.description}</p>
                        </div>

                    </div>

                    <div className='ml-auto'>
                        {/* <button className='btn btn-primary text-white'>Enable</button> */}
                        <Button> Enable</Button>
                    </div>

                </header>


                <section>
                    {this.renderSections()}
                </section>



                {/* <ModuleHeader
                    premiumRequired={this.state.module.premium}
                    description={this.state.module.description}
                    title={this.state.module.name}
                    img={this.state.module.img}
                    showDocs={this.state.module.docs ? true : false}
                    tutorial={this.state.module.docs}
                    // updateAvailable={true}
                    updateAvailable={this.props.moduleSettings[this.state.module.id] && this.props.moduleSettings[this.state.module.id].version < this.state.module.version}
                    updateModule={() => {
                        this.setState({ openModal: true });
                    }}
                    customModule={true}
                    resetModule={() => {
                        var settings = { ...this.props.moduleSettings };


                        delete settings[this.state.module.id];

                        this.props.setBotModule({
                            module: "moduleSettings",
                            module_data: settings,
                        });
                    }}
                    custom={true}
                    showEnabled={true}
                    enabledValue={this.props.moduleSettings[this.state.module.id] !== undefined ? this.props.moduleSettings[this.state.module.id].enabled : false}
                    change={(value) => {
                        // console.log("CHANGED", this.props.moduleSettings);
                        this.checkRedundantModules();
                        if (this.props.moduleSettings[this.state.module.id] === undefined) {
                            var moduleSettings = {};
                            this.state.module.sections.forEach(section => {

                                section.inputs.forEach(input => {
                                    if (input.type.includes("multi")) {

                                        moduleSettings[input.id] = {
                                            value: input.defaultValue != undefined ? input.defaultValue : [],
                                            id: input.id,
                                            name: input.name,
                                            type: input.type,
                                        };
                                    } else if (input.type == "slot") {
                                        moduleSettings[input.id] = {
                                            value: input.defaultValue != undefined ? input.defaultValue : [],
                                            id: input.id,
                                            name: input.name,
                                            type: input.type,
                                            inputs: input.inputs
                                        };
                                    } else {
                                        moduleSettings[input.id] = {
                                            value: input.defaultValue != undefined ? input.defaultValue : "",
                                            id: input.id,
                                            name: input.name,
                                            type: input.type,
                                        };
                                    }

                                });


                            });

                            var settings = { ...this.props.moduleSettings };

                            var custom_variables = [];


                            if (this.state.module.commands.length > 0) {
                                this.state.module.commands.forEach(command => {
                                    if ('custom_variables' in command) {
                                        custom_variables = [...custom_variables, ...command.custom_variables];
                                        // var custom_variables = command.custom_variables;
                                        // var existing_variables = { ...this.props.bot.commands.variables };

                                        // custom_variables.forEach((variable) => {
                                        //     var variable_settings = existing_variables.variables.find((v) => v.reference == variable.reference);
                                        //     if (!variable_settings && variable) {
                                        //         existing_variables.variables.push(variable);
                                        //     }
                                        // });
                                        // this.props.setBotModule(
                                        //     {
                                        //         module: "variables",
                                        //         module_data: existing_variables
                                        //     }
                                        // );
                                    }
                                });
                            }

                            if (this.state.module.events.length > 0) {
                                this.state.module.events.forEach(event => {
                                    if ('custom_variables' in event) {
                                        custom_variables = [...custom_variables, ...event.custom_variables];
                                        // var custom_variables = event.custom_variables;
                                        // var existing_variables = { ...this.props.bot.commands.variables };

                                        // custom_variables.forEach((variable) => {
                                        //     var variable_settings = existing_variables.variables.find((v) => v.reference == variable.reference);
                                        //     if (!variable_settings && variable) {
                                        //         existing_variables.variables.push(variable);
                                        //     }
                                        // });
                                        // this.props.setBotModule(
                                        //     {
                                        //         module: "variables",
                                        //         module_data: existing_variables
                                        //     }
                                        // );
                                    }

                                    if (event.type == "timedEvent") {

                                        var timed_events = { ...this.props.bot.commands.timed_events };
                                        var existing_timed_event = timed_events.events.find((e) => e.id == event.timer_id);
                                        if (!existing_timed_event && this.state.module.timed_events) {
                                            console.log(this.state.module.timed_events);
                                            var timed_event = this.state.module.timed_events.find((e) => e.id == event.timer_id);
                                            console.log(timed_event, 'TIMED EVENT');
                                            if (timed_event) {
                                                timed_events.events.push(timed_event);
                                                this.props.setBotModule(
                                                    {
                                                        module: "timed_events",
                                                        module_data: timed_events
                                                    }

                                                );
                                            }

                                        }

                                    }
                                });
                            }



                            settings[this.state.module.id] = {
                                enabled: true,
                                settings: moduleSettings,
                                version: this.state.module.version,
                                commands: [...this.state.module.commands],
                                sections: [...this.state.module.sections],
                                beta_version: false,
                                events: [...this.state.module.events],
                                premium: this.state.module.premium ? true : false
                            };
                            this.props.setBotModule({
                                module: "moduleSettings",
                                module_data: settings,
                            });

                            var existing_variables = { ...this.props.bot.commands.variables };
                            var vars_modified = false;
                            custom_variables.forEach(custom_variable => {
                                var variable_settings = existing_variables.variables.find((v) => v.reference == custom_variable.reference);
                                if (!variable_settings && custom_variable) {
                                    existing_variables.variables.push(custom_variable);
                                    vars_modified = true;
                                } else {
                                    // update defaultValue
                                    // Find index
                                    var index = existing_variables.variables.findIndex((v) => v.reference == custom_variable.reference);
                                    existing_variables.variables[index] = custom_variable;
                                    vars_modified = true;
                                }

                            });

                            // Go through this.state.variables
                            this.state.module.variables.forEach(variable => {
                                var variable_settings = existing_variables.variables.find((v) => v.reference == variable.reference);
                                if (!variable_settings && variable) {
                                    existing_variables.variables.push(variable);
                                    vars_modified = true;
                                } else {
                                    // update defaultValue
                                    // Find index
                                    var index = existing_variables.variables.findIndex((v) => v.reference == variable.reference);
                                    existing_variables.variables[index] = variable;
                                    vars_modified = true;
                                }

                            });

                            if (vars_modified) {
                                this.props.setBotModule(
                                    {
                                        module: "variables",
                                        module_data: existing_variables
                                    }
                                );
                            }


                        } else {
                            var settings = { ...this.props.moduleSettings };
                            settings[this.state.module.id].enabled = value;

                            this.props.setBotModule({
                                module: "moduleSettings",
                                module_data: settings,
                            });
                        }
                    }}

                ></ModuleHeader> */}

                {/* <div className={`${(this.props.moduleSettings[this.state.module.id] == undefined || !this.props.moduleSettings[this.state.module.id].enabled) && !(this.props.premium == false && this.state.module.premium == true) ? "pointer-events-none opacity-50" : ""}`}> */}
                {/* {this.renderSections()}


                    {this.renderCommands()}


                    {this.renderEvents()} */}
                {/* </div> */}

            </Dashboard >
        );
    }
}

const mapStateToProps = (state) => ({
    modules: state.data.modules,
    moduleSettings: {}
});

const mapDispatchToProps = {
    // setBotModule,
    // setBotSettings,
    // setBuilderIndex,
    // setBuilderModuleId,
    // setElements,
    // setSelected,
    // setBuilderSlotId,
    // setBuilderMode
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomModule);