import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import history from '../../utils/history';
import Button from '../elements/Button';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export class Home extends Component {

    componentDidMount() {
        console.log(this.props);
    }


    changePage = (page) => {
        console.log(page);
        history.push(`/dashboard/${this.props.match.params.server_id}/${page}`);
    };



    renderModules = () => {


        var moduleCategories = {};



        for (var i = 0; i < this.props.modules.length; i++) {
            var module = this.props.modules[i];
            if (module && this.props.serverSettings && this.props.serverSettings.moduleSettings && this.props.serverSettings.moduleSettings[module.id] && this.props.serverSettings.moduleSettings[module.id].enabled == true) {
                if (!moduleCategories[module.category]) {
                    moduleCategories[module.category] = [];
                }

                (function (module_id, changePage, serverSettings) {
                    var button = null;
                    var enabled = false;
                    if (serverSettings.moduleSettings[module_id] && serverSettings.moduleSettings[module_id].enabled == true) {
                        button = <Button onClick={() => {
                            changePage(`module/${module_id}`);
                        }} className=' mt-auto' color="primary">Enabled</Button>;
                        enabled = true;
                    } else {
                        button = <Button onClick={() => {
                            changePage(`module/${module_id}`);
                        }} className='btn-neutral mt-auto'>Disabled</Button>;
                        enabled = false;
                    }
                    moduleCategories[module.category].push(
                        <div onClick={() => {
                            changePage(`module/${module_id}`);
                        }} className={`py-4 hover:cursor-pointer hover:opacity-80 px-6 rounded-lg gap-y-4 flex flex-col text-white bg-menu-color ${enabled ? "" : "opacity-50"}`}>
                            <img className='w-20' src={module.img} onError={(error) => {
                                error.target.src = 'https://dashboard.botghost.com/images/icons/moderation.png';
                            }}></img>
                            <h3 className='font-bold text-xl'>{module.name}</h3>
                            <p className='text-muted'>{module.description}</p>

                            {/* <button className='btn mt-auto  btn-primary text-white'>Enabled</button> */}
                            {/* <div className='mt-auto flex w-full'> */}
                            {button}

                            {/* </div> */}
                        </div>
                    );
                })(module.id, this.changePage, this.props.serverSettings);
            }
        }

        var modulesReturn = [];

        Object.keys(moduleCategories).forEach((key) => {
            modulesReturn.push(
                <div className='mb-5'>
                    <h1 className='text-muted text-2xl font-bold mb-5'>{key}</h1>
                    <div className='grid grid-cols-4 gap-x-6 gap-y-6 '>
                        {moduleCategories[key]}
                    </div>
                </div>
            );
        });

        return modulesReturn;
    };
    render() {
        return (
            <Dashboard server_id={this.props.match.params.server_id}>

                {this.renderModules()}

            </Dashboard>
        );
    }
}

const mapStateToProps = (state) => ({
    modules: state.data.modules,
    serverSettings: state.data.serverSettings
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);