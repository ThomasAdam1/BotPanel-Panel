import React, { Component } from 'react';
import { connect } from 'react-redux';


// import { renderCustomEmojiCategories } from "../../../actions/index.js";




// import 'emoji-mart/css/emoji-mart.css';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import InputTitle from './InputTitle';
import { PlusCircleIcon } from '@heroicons/react/20/solid';

export class EmojiSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDropDown: false
        };

        this.node = React.createRef();
    }
    renderDescription = () => {
        if (this.props.settings.html) {
            return <div dangerouslySetInnerHTML={{ __html: this.props.settings.description }}></div>;
        } else {
            return <p>{this.props.settings.description}</p>;
        }
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }


    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.node && !this.node.current.contains(event.target)) {
            this.setState({ showDropDown: false });
        }
    };





    renderEmojiPicker = () => {

        // var customCategories = renderCustomEmojiCategories(this.props.bot_data);
        var customCategories = [];

        var categoryIcons = [];
        if (customCategories.length > 0) {
            customCategories.forEach((category) => {
                categoryIcons[category.id] = {
                    src: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg'
                };
            });
        }



        return (
            <div ref={{
                // "absolute top-[13px] right-0 z-50" 
            }}
                className="absolute z-[2001] top-1 -left-8 right-0 md:left-0 md:right-0"
            // style={{ top: "15px", left: "0px", right: "0px", overflow: "hidden", width: "350px" }} 
            >
                <Picker noCountryFlags={false} emojiVersion={14} data={data} custom={customCategories}
                    categoryIcons={categoryIcons}
                    onEmojiSelect={this.onEmojiSelect} title="Pick your emoji..."></Picker>
            </div>

        );
    };

    onEmojiSelect = (emoji) => {
        // console.log(emoji, 'EMOJI');
        if (this.props.settings.maxLength != undefined && this.props.value.length >= this.props.settings.maxLength) {
            return;
        }
        const activeEmojis = [...this.props.value];
        activeEmojis.push(emoji);
        this.props.change(activeEmojis);
        this.setState({ showDropDown: false });
    };

    removeEmoji = (index) => {
        const activeEmojis = [...this.props.value];
        activeEmojis.splice(index, 1);
        this.props.change(activeEmojis);
    };



    renderEmojis = () => {
        var items = [];
        this.props.value.forEach((emoji, index) => {
            if (emoji.native) {
                items.push(
                    <li className="role-adder-role" key={index}>

                        <FontAwesomeIcon onClick={(e) => { this.removeEmoji(index); }} icon={faTimesCircle} />
                        <span class="">{emoji.native}</span>
                    </li>
                );
            } else {
                items.push(
                    <li className="role-adder-role" key={index}>

                        <FontAwesomeIcon onClick={(e) => { this.removeEmoji(index); }} icon={faTimesCircle} />
                        <span class=""><img className="h-[16px] w-[16px]" src={emoji.src}></img></span>
                    </li>
                );
            }

        });
        return items;
    };


    render() {
        return (
            <>
                <div className={`bg-menu-color rounded-lg p-6 w-full`}>
                    <div class="">
                        <InputTitle settings={this.props.settings} refresh={true} />
                        <div className="section-content-header mb-2">
                            {this.renderDescription()}
                        </div>
                        <div ref={this.node}>
                            <div className="input input-bordered flex items-center relative">
                                <ul>
                                    {this.renderEmojis()}
                                    <li>
                                        <div className="role-adder-container" style={{ maxWidth: "80vw" }}>
                                            {(this.props.settings.maxLength == undefined || (this.props.value.length < this.props.settings.maxLength)) ?
                                                <div>
                                                    <div className='relative'>
                                                        <PlusCircleIcon onClick={() => {
                                                            this.setState({ showDropDown: true });
                                                        }} className='h-6 hover:cursor-pointer hover:opacity-80' />
                                                    </div>
                                                </div>
                                                : null
                                            }
                                            {/* <img src={process.env.PUBLIC_URL + "/icons/feather/plus-circle.svg"} onClick={(e) =>{this.setState({showDropDown:true})}}></img> */}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className='relative'>
                                {this.state.showDropDown == true ? this.renderEmojiPicker() : null}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    bot_data: state.data.bot_data
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EmojiSelect);