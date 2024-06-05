import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

export class HomeNavBar extends Component {
    render() {
        return (
            <nav className='navbar bg-menu-color fixed px-5'>
                <div className='flex-1'>
                    <div className='flex items-center gap-x-3'>
                        <img src={this.props.bot.img} className='rounded-full w-8'></img>
                        <a href='/' className='text-white font-xl font-bold'>{this.props.bot.name}</a>
                    </div>
                </div>

                <div className='flex-none'>
                    <ul className="menu menu-horizontal px-1">
                        <li className="menu-item">
                            <Link to="/servers" className="menu-link">Servers</Link>
                        </li>

                        <li className="menu-item">
                            <a href={this.props.bot.dash_settings.support} target="_blank" className="menu-link">Support Server</a>
                        </li>
                        <li className="menu-item">
                            <Link to="/servers" className="menu-link">Dashboard</Link>
                        </li>
                    </ul>
                </div>

            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    bot: state.data.bot,

});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavBar);