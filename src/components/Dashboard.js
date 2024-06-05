import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from './elements/SideMenu';
import Navbar from './elements/Navbar';
import AuthProvider from '../AuthProvider';
import { useLocation } from 'react-router-dom';
import history from '../utils/history';
import { setActiveServer } from '../actions/index';

export class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        this.setActiveServer();

    }

    componentDidUpdate(prevProps, prevState) {
        this.setActiveServer();

    }

    setActiveServer = () => {
        // Get server id from URL and set it as active server
        // http://localhost:3000/dashboard/881402275535409152
        if (this.props.server_id && this.props.servers && this.props.active_server.id != this.props.server_id) {
            this.props.setActiveServer(this.props.server_id);
        }

    };
    render() {
        return (
            <AuthProvider>
                <div className='bg-[#14181c]  flex flex-row'>
                    {/* <Navbar></Navbar> */}
                    <SideMenu server_id={this.props.server_id}></SideMenu>

                    <main className='w-full'>
                        <Navbar></Navbar>


                        <div className='py-10 pl-[300px] px-10 pt-24'>
                            <div className='px-10'>
                                {this.props.children}
                            </div>

                        </div>
                    </main>

                </div>
            </AuthProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    servers: state.data.servers,
    active_server: state.data.active_server
});

const mapDispatchToProps = {
    setActiveServer
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);