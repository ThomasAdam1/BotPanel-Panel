import { ArrowPathIcon } from '@heroicons/react/20/solid';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';
import { setServerData } from '../../actions';

export class RefreshBotData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }


    handleClick = async () => {
        this.setState({ loading: true });
        var response = await server.get(`/client/server/${this.props.active_server.id}/data`).catch(e => {
            console.log(e);

        });

        if (response?.data) {
            this.setState({ loading: false });
            this.props.setServerData(response.data);
        }
    };
    render() {
        return (
            <div className={`${this.state.loading ? "animate-spin" : ""}`}><ArrowPathIcon onClick={(e) => {
                this.handleClick();
            }} className='h-5 hover:cursor-pointer' /></div>
        );
    }
}

const mapStateToProps = (state) => ({
    active_server: state.data.active_server
});

const mapDispatchToProps = {
    setServerData
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshBotData);