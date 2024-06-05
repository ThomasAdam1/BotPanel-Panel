import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthProvider from '../../AuthProvider';
import HomeNavBar from '../elements/HomeNavBar';
import history from '../../utils/history';

export class Servers extends Component {

    renderServers = () => {
        var servers = [];

        var servers_array = this.props.servers;
        // Order by joined
        servers_array.sort((a, b) => {
            if (a.joined && !b.joined) return -1;
            if (!a.joined && b.joined) return 1;
            return 0;
        });

        servers_array.forEach(server => {
            servers.push(
                <div>
                    <img alt="server icon" className='w-full rounded-lg' onError={(target) => {
                        target.onError = null;
                        target.target.src = process.env.PUBLIC_URL + "/img/default.png";
                    }} src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp` || process.env.PUBLIC_URL + "/img/default.png"}></img>
                    <div className='mt-3 flex flex-row items-center py-3'>
                        <h1 className='text-lg font-bold text-white'>{server.name}</h1>
                        {server.joined ? <button onClick={() => {
                            history.push(`/dashboard/${server.id}`);
                        }} className='btn btn-primary  text-white ml-auto'>Settings</button> :
                            <button onClick={() => {
                                var url = `https://discord.com/oauth2/authorize?client_id=${this.props.bot.id}&guild_id=${server.id}&scope=applications.commands%20bot&permissions=8`;
                                window.open(url, '_blank');
                            }} className='btn btn-neutral  text-white ml-auto'>Invite</button>}
                    </div>
                </div>
            );

        });

        return servers;
    };
    render() {
        return (
            <AuthProvider>
                <HomeNavBar />


                <main className='bg-darkGray py-24 px-80'>
                    <div className='flex flex-col items-center gap-y-24'>
                        <h1 className='text-4xl font-bold text-white'>Choose a Server</h1>

                        <div className='grid grid-cols-5 w-full gap-y-14 gap-x-14'>

                            {this.renderServers()}

                        </div>
                    </div>
                </main>

            </AuthProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    servers: state.data.servers,
    bot: state.data.bot
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Servers);