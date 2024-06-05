import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeNavBar from '../elements/HomeNavBar';
import Button from '../elements/Button';

export class Home extends Component {


    renderInviteURL = () => {
        var bot_perms = 8;
        if (this.props.bot.invite_settings.invite_perms_int) {
            bot_perms = this.props.bot.invite_settings.invite_perms_int;
        }
        var url = `https://discord.com/oauth2/authorize?client_id=${this.props.bot.id}&guild_id=&scope=applications.commands%20bot&permissions=${bot_perms}`;
        return url;
    };
    render() {
        return (
            <>
                <HomeNavBar />

                <div class="hero min-h-screen bg-base-200">
                    <div class="hero-content pt-[-50px] text-center">
                        <div class="max-w-md">
                            <img src={this.props.bot.img} alt="bot icon" class="mx-auto w-48 rounded-full mb-6" />
                            <h1 class="text-5xl font-bold">My Big Dick Discord Bot</h1>
                            <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <div className='gap-x-3 flex flex-row items-center justify-center'>
                                <a href={this.renderInviteURL()} alt="invite" target="_blank" style={{
                                    background: this.props.bot.color_settings.primary
                                }} className="btn   text-white">Invite {this.props.bot.name}</a>

                                <a href={this.props.bot.dash_settings.support} target="_blank" className="btn  btn-neutral text-white">Support Server</a>

                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = (state) => ({
    bot: state.data.bot
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);;