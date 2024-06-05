import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export class Navbar extends Component {
    render() {
        return (
            <>
                <nav className='bg-menu-color w-100% h-[50px] flex px-3 items-center'>
                    <div className='ml-auto flex items-center gap-x-2'>
                        <div className='flex flex-row items-center gap-x-2'>
                            <div class="avatar">
                                <div class="w-[30px] rounded-full">
                                    <img src="https://cdn.discordapp.com/avatars/136327647792726016/c09224ebac192909a9151ea5e9a41535.webp?size=128" />
                                </div>
                            </div>
                            <span className='font-normal text-white'>{this.props.user.name}</span>
                        </div>
                        <div class="dropdown px-2 dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-ghost p-2 rounded-btn"><ChevronDownIcon className='size-4 text-white' /></div>
                            <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.data.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);