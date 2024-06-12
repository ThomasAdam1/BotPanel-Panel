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


    renderButton = () => {

    };

    renderModules = () => {


        var moduleCategories = {};


        // Return the following 20 times
        for (var i = 0; i < this.props.modules.length; i++) {
            var module = this.props.modules[i];
            if (module) {
                if (!moduleCategories[module.category]) {
                    moduleCategories[module.category] = [];
                }

                var module_id = module.id;

                moduleCategories[module.category].push(
                    <div onClick={() => {
                        this.changePage(`module/${module_id}`);
                    }} className='py-4 hover:cursor-pointer hover:opacity-80 px-6 rounded-lg gap-y-4 flex flex-col text-white bg-menu-color'>
                        <img className='w-20' src={module.img} onError={(error) => {
                            error.target.src = 'https://dashboard.botghost.com/images/icons/moderation.png';
                        }}></img>
                        <h3 className='font-bold text-xl'>{module.name}</h3>
                        <p className='text-muted'>{module.description}</p>

                        {/* <button className='btn mt-auto  btn-primary text-white'>Enabled</button> */}
                        {/* <div className='mt-auto flex w-full'> */}
                        <Button className="mt-auto" >Enabled</Button>
                        {/* </div> */}
                    </div>


                );
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
    modules: state.data.modules
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);