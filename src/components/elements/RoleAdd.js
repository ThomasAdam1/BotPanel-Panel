import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';


import RefreshBotData from './RefreshBotData';
import { ArrowPathIcon, PlusCircleIcon } from '@heroicons/react/20/solid';

var PERMISSIONS, CHANNEL_PERMISSIONS = [];
export class RoleAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropDown: false,
            search_term: "",
            items: [],
            addedItems: []
        };

    }

    componentDidMount() {
        // console.log(this.props);
        document.addEventListener("click", this.handleClick, true);
        if (this.props.type == "permissions") {
            this.setState({ items: PERMISSIONS });
        }
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, true);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.state);
    }

    handleClick = (event) => {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({ showDropDown: false });
        }
    };

    addItem = (item) => {
        const addedItems = [...this.props.items];
        // Check if exists;
        if (this.props.type == "permissions") {
            if (addedItems.includes(item)) return;
        } else {
            if (addedItems.find((i) => i.id == item.id)) return;
        }
        addedItems.push(item);
        this.props.update(addedItems, this.props.option);
    };

    addSlashCommandOption = (item) => {
        const addedItems = [...this.props.items];
        addedItems.push({
            variable: item.name,
            name: item.name
        });
        this.props.update(addedItems, this.props.option);
    };


    renderDropDown = () => {
        const items = [];
        if (this.props.server_data.loaded == false && this.state.showDropDown == true) {
            return (
                <div className="z-50 absolute w-[250px] h-[300px] bg-darkGray p-3 rounded-md top-[55px] left-0">
                    <div className="role-adder-dropdown-main">
                        <h3 className='font-bold text-white'>Refresh Server Data</h3>
                        <span>Click the refresh button above to reload your server data.</span>
                    </div>
                </div>
            );
        }
        else if (this.props.type == "roles" || this.props.type == "channels") {

            if (this.props.type == "roles") {
                this.props.server_data.roles.forEach(role => {
                    if (this.state.search_term == "" || role.name.toLowerCase().includes(this.state.search_term.toLowerCase())) {
                        items.push(
                            <div key={role.id} className="text-white text-sm p-3 hover:opacity-80 hover:cursor-pointer" onClick={(e) => {
                                this.addItem(role);
                                this.setState({ showDropDown: false, search_term: "" });
                            }}>
                                <span>{role.name}</span>
                            </div>
                        );
                    }

                });
            } else if (this.props.type == "channels") {
                this.props.server_data.channels.forEach(channel => {
                    if (this.state.search_term == "" || channel.name.toLowerCase().includes(this.state.search_term.toLowerCase())) {
                        items.push(
                            <div key={channel.id} className="text-white text-sm p-3 hover:opacity-80 hover:cursor-pointer" onClick={(e) => {
                                this.addItem(channel);
                                this.setState({ showDropDown: false, search_term: "" });
                            }}>
                                <span>#{channel.name}</span>
                            </div>
                        );
                    }

                });
            }



            return (
                <div className=" z-50 absolute w-[250px] h-[300px] overflow-y-scroll bg-darkGray p-3 rounded-md top-[50px] left-0">
                    <div className="role-adder-dropdown-main">
                        {items}
                    </div>
                </div>
            );
        }

    };

    renderItems = () => {
        // types :roles,permissions,channels,members
        const items = [];
        this.props.items.forEach((item, index) => {
            if (this.props.type == "permissions" || this.props.type == "words") {
                items.push(
                    <li className="role-adder-role" key={index}>
                        <FontAwesomeIcon onClick={(e) => { this.removeRole(index); }} icon={faTimesCircle} />
                        <span class="">{item}</span>
                    </li>
                );
            } else if (this.props.type == "channels") {
                if ((this.props.channelFilter == undefined && (item.type == 0 || item.type == 4)) || this.props.channelFilter && this.props.channelFilter.length > 0 && this.props.channelFilter.includes(item.type)) {

                    items.push(
                        <li className="role-adder-role" key={index}>
                            <FontAwesomeIcon onClick={(e) => { this.removeRole(index); }} icon={faTimesCircle} />
                            <span class="">#{item.name}</span>
                        </li>
                    );
                }


            } else {
                if (item != undefined) {
                    items.push(
                        <li className="role-adder-role" key={index}>
                            <FontAwesomeIcon onClick={(e) => { this.removeRole(index); }} icon={faTimesCircle} />
                            <span class="">{item.name}</span>
                        </li>
                    );
                }

            }
        });


        return items;
    };

    removeRole = (index) => {
        const addedItems = [...this.props.items];
        addedItems.splice(index, 1);
        this.props.update(addedItems, this.props.option);
    };

    render() {
        return (
            <div className="input input-bordered flex items-center relative" style={{

            }}>
                {this.state.showDropDown == true ? this.renderDropDown() : null}
                <ul>
                    {this.renderItems()}
                    <li>
                        <div className="flex">
                            {/* <button className="btn btn-sm" onClick={(e) => { this.setState({ showDropDown: !this.state.showDropDown }); }} > */}
                            <PlusCircleIcon onClick={(e) => {
                                this.setState({ showDropDown: !this.state.showDropDown });
                            }} className='h-6 hover:cursor-pointer hover:opacity-80' />
                            {/* </button> */}
                        </div>

                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    bot_data: state.data.bot_data,
    server_data: state.data.server_data,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(RoleAdd);
