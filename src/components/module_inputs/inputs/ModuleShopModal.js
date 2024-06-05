import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import TextArea from "../elements/TextArea";
import Select from "../elements/Select";
import Toggle from "../elements/Toggle";
import RoleAdd from "../elements/RoleAdd";
import Embed from "../elements/Embed";
import { setBotModule } from "../../../actions";
import server from "../../../api/server";
// import { PremiumModal } from './PremiumModal';
var TYPES = [
    { value: "roles", label: "Role Item" },
    { value: "usable", label: "Usable Item" },
    { value: "static", label: "Static Item" },
];


export class ModuleShopModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "name": "",
            "description": "",
            "id": "",
            "img": "",
            "type": "roles",
            "price": 50,
            "multiple": false,
            itemLimit: 5,
            "useOnBuy": false,
            "destroyOnUse": false,
            "roles": []
        };
    }



    // Fields
    // - name
    // - Description
    // - id
    // - img
    // - Type
    // - multiple
    // - useOnBuy
    // - destroyOnUse
    // - buyMessage
    // -responses

    componentDidMount() {
        if (this.props.index != null) {
            var item = this.props.items[this.props.index];
            // console.log(item);
            if (item) {
                var state = { ...this.state };
                Object.keys(item).forEach(key => {
                    state[key] = item[key];

                });
                this.setState(state);
            }
        }
    }

    modaBackgroundClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.closeModal(e);
        }
    };

    save = (e) => {
        e.preventDefault();

        var itemObject = { ...this.state };
        // var economy = { ...this.props.economy };
        // delete itemObject['showPremiumModal'];
        // if (this.props.premium === false) {
        //     return this.setState({ showPremiumModal: true });

        // }

        if (this.props.index == null) {
            itemObject.id = generateUID();

        }
        this.props.saveItem(itemObject, this.props.index);
        this.props.closeModal();

    };

    renderTypeOptions = () => {
        if (this.state.type === "roles") {
            return (
                <div>
                    <div class="mb-15 shop-item-modal-section">
                        <h3>Roles</h3>
                        <span>Roles to add on item use</span>

                        <div>
                            <RoleAdd update={(roles) => {
                                var rolesArr = [...this.state.roles];
                                rolesArr = roles;
                                this.setState({ roles: rolesArr });

                            }} items={this.state.roles} />
                        </div>
                    </div>


                </div>


            );

        }
    };

    changeBuyType = (value) => {
        var buyMessage = { ...this.state.buyMessage };
        if (this.state.buyMessage.type === "text") {
            buyMessage.embed = {};
            buyMessage.type = 'embed';
            this.setState({ buyMessage });
        } else {
            buyMessage.content = "";
            buyMessage.type = "text";
            this.setState({ buyMessage });
        }
    };

    changeUseMessageType = (value) => {
        var responses = [...this.state.responses];
        if (this.state.responses[0].type === "text") {
            responses[0].embed = {};
            responses[0].type = 'embed';
            this.setState({ responses });
        } else {
            responses[0].content = "";
            responses[0].type = "text";
            this.setState({ responses });
        }
    };

    uploadImage = async (files) => {
        // console.log(files[0]);

        const formData = new FormData();
        formData.append(
            'img',
            files[0]
        );
        // const obj = {
        //     token:this.props.data.bot.token,
        //     id:this.props.data.bot.id
        // }
        // const json = JSON.stringify(obj)
        // const blob = new Blob([json],{
        //     type:"application/json"
        // })

        // formData.append(
        //     "data",
        //     blob
        // )
        const response = await server.post("/dashboard/uploadmodulestoreimage", formData).catch(e => { });
        if (response.data == false) {
            // console.log("HANDLE ERROR");
        } else {
            this.setState({ img: response.data });

        }
    };

    render() {
        return (
            <div>
                <div class={`modal fade show modal-background`} onClick={(e) => { this.modaBackgroundClick(e); }} style={{ display: "block" }} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    {/* {this.state.showPremiumModal === true ? <PremiumModal closeModal={() => { this.setState({ showPremiumModal: false }); }} /> : null} */}
                    <form onSubmit={(e) => { this.save(e); }} class="modal-dialog command-edit-modal" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Create new Item</h5>
                                <button onClick={(e) => { this.props.closeModal(e); }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body command-edit-body shop-item-modal">

                                {/* Name */}
                                <div class="mb-15 shop-item-modal-section">
                                    <h3>Name</h3>
                                    <span>Your items name</span>

                                    <div class="long-input mt-15">
                                        <label>Name</label>
                                        <input required={true} type="text" value={this.state.name} onChange={(e) => {
                                            this.setState({ name: e.target.value });
                                        }} />
                                    </div>
                                </div>

                                <div class="mb-15 shop-item-modal-section">
                                    <h3>Description</h3>
                                    <span>Your items description</span>

                                    <div class="mt-15">
                                        <TextArea required={true} value={this.state.description} onChange={(value) => {
                                            this.setState({ description: value });
                                        }} />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-lg-3'>
                                        <div class="mb-15 shop-item-modal-section">
                                            <h3>Price</h3>
                                            <span>Your items price</span>

                                            <div class="long-input mt-15">
                                                <label>Price</label>
                                                <input required={true} type="number" value={this.state.price} onChange={(e) => {
                                                    this.setState({ price: e.target.value });
                                                }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-3'>
                                        <div class="mb-15 shop-item-modal-section">
                                            <h3>Item Limit</h3>
                                            <span>The maximum amount users may buy</span>

                                            <div class="long-input mt-15">
                                                <label>Limit</label>
                                                <input required={true} type="number" value={this.state.itemLimit} onChange={(e) => {
                                                    this.setState({ itemLimit: e.target.value });
                                                }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-3'>
                                        <div class="mb-15 shop-item-modal-section">
                                            <h3>Type</h3>
                                            <span>Your items type.</span>

                                            <div class="mt-15">
                                                <Select value={this.state.type} onChange={(value) => {
                                                    this.setState({ type: value });
                                                }} options={TYPES} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-2'>
                                        <div class="shop-item-modal-section">
                                            <h3>Image</h3>
                                            <span>Your items image.</span>

                                            <Dropzone onDrop={acceptedFiles => this.uploadImage(acceptedFiles)}>
                                                {({ getRootProps, getInputProps }) => (
                                                    <div className='mt-15'>
                                                        <div {...getRootProps()} style={{ cursor: "pointer" }}>
                                                            <input {...getInputProps()} />
                                                            {this.state.img === "" ?
                                                                <div style={{ height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    <span style={{ fontSize: "50px" }}><FontAwesomeIcon icon={faImage} /></span>
                                                                </div> :
                                                                <div style={{ height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    <img style={{ height: "50px", width: "50px" }} src={this.state.img} />
                                                                </div>}
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                                        </div>
                                    </div>

                                </div>
                                {/* <hr class="slashcommand-hr" /> */}

                                {this.renderTypeOptions()}

                                <hr class="slashcommand-hr" />


                                <div className='row'>

                                    <div className='col-lg-4'>
                                        <div class="mb-15 shop-item-modal-section shop-item-extra-option">
                                            <div>
                                                <h3>Destroy on Use</h3>
                                                <span>Whether to destroy the item when used.</span>
                                            </div>

                                            <div style={{ marginLeft: "auto" }} class="">
                                                <Toggle update={(value) => {
                                                    this.setState({ destroyOnUse: value });
                                                }} value={this.state.destroyOnUse} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-4'>
                                        <div class="mb-15 shop-item-modal-section shop-item-extra-option">
                                            <div>
                                                <h3>Allow Multiples</h3>
                                                <span>Allow users to hold multiple of this item.</span>
                                            </div>

                                            <div style={{ marginLeft: "auto" }} class="">
                                                <Toggle update={(value) => {
                                                    this.setState({ multiple: value });
                                                }} value={this.state.multiple} />
                                            </div>
                                        </div>
                                    </div>

                                    {this.state.type === "static" ? null :
                                        <div className='col-lg-4'>
                                            <div class="mb-15 shop-item-modal-section shop-item-extra-option">
                                                <div>
                                                    <h3>Use on Buy</h3>
                                                    <span>Whether to use this item immediately upon purchase.</span>
                                                </div>

                                                <div style={{ marginLeft: "auto" }} class="">
                                                    <Toggle update={(value) => {
                                                        this.setState({ useOnBuy: value });
                                                    }} value={this.state.useOnBuy} />
                                                </div>
                                            </div>
                                        </div>}

                                </div>


                            </div>
                            <div class="modal-footer m-buttons">
                                {this.props.index != null ?
                                    <div style={{ marginRight: "auto" }} className="m-mr-0 m-ml-0 m-w-100">
                                        <button onClick={(e) => {
                                            this.props.deleteItem(this.props.index);
                                            this.props.closeModal();
                                        }} type="button" class="btn btn-red" data-dismiss="modal">Delete Item</button>
                                    </div> : null
                                }
                                <button onClick={(e) => { this.props.closeModal(); }} type="button" class="btn btn-secondary m-mr-0 m-ml-0 m-w-100" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary m-mr-0 m-ml-0 m-w-100">Save changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const generateUID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const mapStateToProps = (state) => ({
    economy: state.data.bot.commands.economy,
    premium: state.data.premium
});

const mapDispatchToProps = {
    setBotModule
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleShopModal);
