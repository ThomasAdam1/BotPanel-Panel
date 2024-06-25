import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard';
import Toggle from '../elements/Toggle';
import { updateModuleSettings } from '../../actions';
import Command from '../elements/Command';

export class CommandList extends Component {

    renderCommands = () => {
        var commandCategories = {};
        if (this.props.serverSettings.moduleSettings == undefined) return;

        var moduleIds = Object.keys(this.props.serverSettings.moduleSettings);
        moduleIds.forEach((module_id, i) => {
            var module = this.props.serverSettings.moduleSettings[moduleIds[i]];
            if (moduleIds[i] == "custom_commands") {
                var module_name = "Default Commands";
            } else {
                var module_info = this.props.moduleInfo.find(x => x.id == moduleIds[i]);
                if (!module_info) return;
                var module_name = module_info.name;
                // var module_name = this.props.moduleInfo.find(x => x.id == moduleIds[i]).name;
            }

            if (module) {
                module.commands.forEach((command, j) => {
                    var command_index = j;
                    if (command) {
                        if (!commandCategories[module_name]) {
                            commandCategories[module_name] = [];
                        }

                        var command_id = command.id;

                        commandCategories[module_name].push(
                            <Command command={command} command_index={command_index} module_id={module_id} />
                        );
                    }
                });
            }
        });

        console.log(commandCategories);

        // for (var i = 0; i < Object.length; i++) {
        //     var command = this.props.serverSettings.commands[i];
        //     if (command) {
        //         if (!commandCategories[command.category]) {
        //             commandCategories[command.category] = [];
        //         }

        //         var command_id = command.id;

        //         commandCategories[command.category].push(
        //             <div className={`bg-menu-color rounded-lg p-6 w-full`}>
        //                 <h3 className="text-white font-bold">/{command.name}</h3>
        //                 <span className="text-sm">{command.description}</span>
        //             </div>
        //         );
        //     }
        // }


        var categories = [];
        for (var category in commandCategories) {
            categories.push(
                <div className="w-full mb-7">
                    <h1 className='text-muted text-2xl font-bold mb-5'>{category}</h1>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 xl:grid-cols-2">
                        {commandCategories[category]}
                    </div>
                </div>
            );
        }

        // Reverse
        categories.reverse();

        return categories;
    };
    render() {
        return (
            <Dashboard server_id={this.props.match.params.server_id}>

                <div className="w-full">

                    <h1 className="text-white text-3xl font-bold">Commands</h1>
                    {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> */}
                    {this.renderCommands()}
                    {/* </div> */}
                </div>


            </Dashboard>
        );
    }
}

const mapStateToProps = (state) => ({
    serverSettings: state.data.serverSettings,
    moduleInfo: state.data.modules
});

const mapDispatchToProps = {
    updateModuleSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandList);