import React, { Component } from 'react';
import { connect } from 'react-redux';
import ServerDropdown from './ServerDropdown';
import { Link } from 'react-router-dom';
import history from '../../utils/history';

export class SideMenu extends Component {

    renderModules = () => {
        var moduleCategories = {};


        // Return the following 20 times
        for (var i = 0; i < this.props.modules.length; i++) {
            var module = this.props.modules[i];
            if (module) {
                if (!moduleCategories[module.category]) {
                    moduleCategories[module.category] = [];
                }

                moduleCategories[module.category].push(
                    <li ><Link to={`/dashboard/${this.props.server_id}/module/${module.id}`}>{module.name}</Link></li>
                );
            }
        }

        var modulesReturn = [];

        Object.keys(moduleCategories).forEach((key) => {
            modulesReturn.push(
                <>
                    <li className='menu-title font-semibold mt-3 p-0 font-bold'>{key}</li>
                    {moduleCategories[key]}
                </>
            );
        });

        return modulesReturn;
    };

    renderServers = () => {
        var servers = [];

        this.props.servers.forEach(server => {
            if (!server.joined) return;
            servers.push(
                // Name and ICON
                <option className=''>
                    <div className='!p-5'>
                        <div className='flex items-center'>
                            <img src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp`} className='w-6 h-6 rounded-full'></img>
                            <span className='ml-2'>{server.name}</span>
                        </div>
                    </div>
                </option>
            );
        });
        return servers;
    };
    render() {
        return (
            <>
                <section className='h-screen fixed bg-menu-color w-[300px] px-3 pt-[60px] overflow-y-scroll text-white'>

                    <div className='hover:cursor-pointer'>
                        <div className='avatar w-full flex justify-center mb-5' onClick={() => {
                            history.push(`/dashboard/${this.props.server_id}`);
                        }}>
                            <div className='w-24'>
                                <img src={this.props.bot.img} className='rounded-full'></img>
                            </div>
                        </div>

                    </div>

                    <div>
                        <ServerDropdown />
                    </div>


                    <ul className='menu mt-5 gap-y-1  opacity-80'>
                        {this.renderModules()}
                    </ul>
                </section>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    bot: state.data.bot,
    modules: state.data.modules,
    servers: state.data.servers
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);