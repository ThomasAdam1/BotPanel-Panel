import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/20/solid';
import history from '../../utils/history';
// import { changeBot, setQuickStart } from "../../../actions";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

var bots = [
    {
        name: 'BotGhost Test 1',
        avatar: 'https://cdn.discordapp.com/avatars/1029849529299779634/0ec6014d14fd47bcdf8f0293f2497992.png?size=1024',
    },
    // Repeat 5 times
    {
        name: 'BotGhost Test 2',
        avatar: 'https://cdn.discordapp.com/avatars/1029849529299779634/0ec6014d14fd47bcdf8f0293f2497992.png?size=1024',
    },
    {
        name: 'BotGhost Test 3',
        avatar: 'https://cdn.discordapp.com/avatars/1029849529299779634/0ec6014d14fd47bcdf8f0293f2497992.png?size=1024',
    },
    {
        name: 'BotGhost Test 4',
        avatar: 'https://cdn.discordapp.com/avatars/1029849529299779634/0ec6014d14fd47bcdf8f0293f2497992.png?size=1024',
    },
    {
        name: 'BotGhost Test 5',
        avatar: 'https://cdn.discordapp.com/avatars/1029849529299779634/0ec6014d14fd47bcdf8f0293f2497992.png?size=1024',
    },
];
export class BotDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        if ((this.props.servers.length >= 1) && this.state.loading) {
            this.setState({ loading: false });
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }


    changeBot = (id, collab, host_user_id, beta) => {
        this.setState({ loading: true });
        if (this.props.bot.id != id) {
            this.props.changeBot(id, collab, host_user_id, beta);
            history.push("/dashboard");
        } else {

        }
    };

    renderBots = () => {
        return this.props.servers.map((server, index) => {
            if (!server.joined) return null;
            return (
                <Menu.Item onClick={() => {
                    // this.changeBot(bot.id, bot.collab, bot.host_user_id, bot.beta);
                }} key={index}>
                    {({ active }) => (
                        <div className={classNames(active ? 'bg-[#313132] cursor-pointer' : '', 'block px-3 py-3 text-md text-gray-700')}>
                            <div className='flex gap-x-1 text-white font-semibold overflow-hidden text-ellipsis whitespace-nowrap break-words'>
                                <img className='w-6 h-6 rounded-full' onError={(target) => {
                                    target.onError = null;
                                    target.target.src = process.env.PUBLIC_URL + "/img/default.png";
                                }} src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp` || process.env.PUBLIC_URL + "/images/logo-red.png"}></img>
                                {/* <img className='w-6 h-6 rounded-full' src={bot.avatar}></img> */}
                                {server.name}


                            </div>
                        </div>
                    )
                    }
                </Menu.Item >
            );
        });
    };


    render() {
        return (
            <Menu as="div" disabled={true} className="relative inline-block text-left w-full">
                <div>
                    <Menu.Button disabled={this.state.loading} className="inline-flex w-full justify-left gap-x-1.5 rounded-md bg-[#222327] px-3 py-3 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ">
                        {
                            this.state.loading ? <div className="flex gap-x-2 text-white">
                                <div className='animate-pulse w-6 h-6 bg-gray-400 rounded-full'></div>
                                <span>Loading...</span>
                            </div> :
                                <div className='flex gap-x-1 text-white overflow-hidden text-ellipsis whitespace-nowrap break-words'>
                                    <img className='w-6 h-6 rounded-full' onError={(target) => {
                                        target.onError = null;
                                        target.target.src = process.env.PUBLIC_URL + "/img/default.png";
                                    }} src={`https://cdn.discordapp.com/icons/${this.props.active_server.id}/${this.props.active_server.icon}.webp` || process.env.PUBLIC_URL + "/img/default.png"}></img>
                                    {this.props.active_server.name}


                                </div>
                        }
                        <ChevronDownIcon className="ml-auto h-5 w-5 text-white" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute w-full  overflow-x-clip right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#222327] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 max-h-[450px] overflow-y-scroll">
                            {this.renderBots()}

                        </div>
                        <Menu.Item key={'new_bot'}>
                            <div>
                                <hr className='bg-white opacity-70 mb-0'></hr>
                                <div className='block px-3 py-3'>

                                    <span onClick={() => {
                                        history.push('/servers');
                                    }} className='flex justify-start align-middle gap-x-1 text-white font-semibold overflow-hidden text-ellipsis whitespace-nowrap break-words hover:!text-red hover:cursor-pointer'>
                                        <PlusCircleIcon className='h-5 w-5 text-gray-400 mr-1'></PlusCircleIcon>
                                        Add new server
                                    </span>

                                </div>
                            </div>
                            {/* New Bot */}
                        </Menu.Item >
                    </Menu.Items>

                </Transition>
            </Menu>
        );
    }
}

const mapStateToProps = (state) => ({
    servers: state.data.servers,
    bot: state.data.bot,
    active_server: state.data.active_server,
});

const mapDispatchToProps = {
    // changeBot
};

export default connect(mapStateToProps, mapDispatchToProps)(BotDropdown);