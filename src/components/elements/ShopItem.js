import React, { Component } from "react";
import { connect } from "react-redux";
import Toggle from "./Toggle";
import Button from "./Button";
import Dropzone from "react-dropzone";
import server from "../../utils/server";
import axios from "axios";

const generateUID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export class ShopItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      id: "",
      img: "",
      type: "roles",
      price: 50,
      multiple: false,
      itemLimit: 5,
      useOnBuy: false,
      destroyOnUse: false,
      roles: [],
    };
  }
  componentDidMount() {
    if (this.props.index != "new") {
      var state = { ...this.state };
      Object.keys(this.props.item).forEach((key) => {
        state[key] = this.props.item[key];
      });
      this.setState(state);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item != this.props.item) {
      var state = { ...this.state };
      Object.keys(this.props.item).forEach((key) => {
        state[key] = this.props.item[key];
      });
      this.setState(state);
    }
  }

  save = (e) => {
    // e.preventDefault();

    var itemObject = { ...this.state };
    // var economy = { ...this.props.economy };
    // delete itemObject['showPremiumModal'];
    // if (this.props.premium === false) {
    //     return this.setState({ showPremiumModal: true });

    // }

    if (this.props.index == null || this.props.index == "new") {
      itemObject.id = generateUID();
    }
    console.log("HERE");
    this.props.saveItem(itemObject, this.props.index);
    // Close Modal
    document.getElementById(`shop_item_${this.props.index}`).close();
  };

  uploadImage = async (files) => {
    console.log(files[0]);

    const formData = new FormData();
    formData.append("img", files[0]);

    // const response = await server.post("/client/uploadmodulestoreimage", formData).catch(e => { });
    const response = await axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/client/uploadmodulestoreimage`,
        formData
      )
      .catch((e) => {});
    if (response.data == false) {
      // console.log("HANDLE ERROR");
    } else {
      this.setState({ img: response.data });
    }
  };
  render() {
    return (
      <>
        <dialog id={`shop_item_${this.props.index}`} class="modal px-[15%]">
          <div class="modal-box w-full max-w-full">
            {this.state.error ? (
              <div role="alert" class="alert alert-error mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>A command with this name already exists</span>
              </div>
            ) : null}
            <div className="w-full">
              <h3 class="font-bold text-lg">Edit Item</h3>

              <div className="flex flex-col gap-y-7">
                <div className="w-full">
                  <label class="form-control w-full ">
                    <div class="label">
                      <span class="label-text">Item Name</span>
                    </div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          name: e.target.value,
                        });
                      }}
                      type="text"
                      value={this.state.name}
                      class={`input input-bordered w-full ${
                        this.state.error ? "input-error" : ""
                      }`}
                    />
                  </label>
                </div>

                <div>
                  <label class="form-control w-full ">
                    <div class="label">
                      <span class="label-text">Item Description</span>
                    </div>
                    <textarea
                      onChange={(e) => {
                        this.setState({
                          description: e.target.value,
                        });
                      }}
                      type="text"
                      value={this.state.description}
                      class="textarea input-bordered w-full"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-4 gap-x-6">
                  <div className="w-full">
                    <label class="form-control w-full ">
                      <div class="label">
                        <span class="label-text">Price</span>
                      </div>
                      <input
                        onChange={(e) => {
                          this.setState({
                            price: e.target.value,
                          });
                        }}
                        type="number"
                        value={this.state.price}
                        class={`input input-bordered w-full ${
                          this.state.error ? "input-error" : ""
                        }`}
                      />
                    </label>
                  </div>

                  <div className="w-full">
                    <label class="form-control w-full ">
                      <div class="label">
                        <span class="label-text">Item Limit</span>
                      </div>
                      <input
                        onChange={(e) => {
                          this.setState({
                            itemLimit: e.target.value,
                          });
                        }}
                        type="number"
                        value={this.state.itemLimit}
                        class={`input input-bordered w-full ${
                          this.state.error ? "input-error" : ""
                        }`}
                      />
                    </label>
                  </div>

                  <div className="w-full">
                    <label class="form-control w-full ">
                      <div class="label">
                        <span class="label-text">Item Type</span>
                      </div>
                      <select
                        value={this.state.type}
                        onChange={(e) => {
                          this.setState({
                            type: e.target.value,
                          });
                        }}
                        className="select select-bordered"
                      >
                        <option value="roles">Role Item</option>
                        <option value="usable">Usable Item</option>
                        <option value="static">Static Item</option>
                      </select>
                    </label>
                  </div>

                  <div className="w-full">
                    <div class="form-control w-full ">
                      <div class="label">
                        <span class="label-text">Image</span>
                      </div>
                      {/* <div className='flex items-center w-full cursor-pointer'>
                                                <img src={this.props.item.img} className='w-[50px] h-[50px]'></img>
                                            </div> */}

                      <Dropzone
                        onDrop={(acceptedFiles) =>
                          this.uploadImage(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="mt-15">
                            <div
                              {...getRootProps()}
                              style={{ cursor: "pointer" }}
                            >
                              <input {...getInputProps()} />
                              {this.state.img === "" ? (
                                <div
                                  style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  IMAGE
                                </div>
                              ) : (
                                <div
                                  style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    style={{ height: "50px", width: "50px" }}
                                    src={this.state.img}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                </div>

                <hr></hr>

                <div className="grid grid-cols-3 gap-x-6 py-3">
                  <div className="w-full">
                    <label class="form-control w-full flex flex-row items-center">
                      <div class="label">
                        <span class="label-text">Destroy on Use</span>
                      </div>
                      <div className="flex ml-auto">
                        <Toggle
                          value={this.state.destroyOnUse}
                          onChange={(value) => {
                            this.setState({ destroyOnUse: value });
                          }}
                          className="ml-auto"
                          color="primary"
                          size="lg"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="w-full">
                    <label class="form-control w-full flex flex-row items-center">
                      <div class="label">
                        <span class="label-text">Allow Multiples</span>
                      </div>
                      <div className="flex ml-auto">
                        <Toggle
                          value={this.state.multiple}
                          onChange={(value) => {
                            this.setState({ multiple: value });
                          }}
                          className="ml-auto"
                          color="primary"
                          size="lg"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="w-full">
                    <label class="form-control w-full flex flex-row items-center">
                      <div class="label">
                        <span class="label-text">Use on Buy</span>
                      </div>
                      <div className="flex ml-auto">
                        <Toggle
                          value={this.state.useOnBuy}
                          onChange={(value) => {
                            this.setState({ useOnBuy: value });
                          }}
                          className="ml-auto"
                          color="primary"
                          size="lg"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <hr></hr>
              </div>
            </div>
            <div class="modal-action justify-start">
              <Button
                className="btn-neutral"
                onClick={() => {
                  this.props.delete(this.props.item.id, this.props.index);
                  //   Close modal
                  document
                    .getElementById(`shop_item_${this.props.index}`)
                    .close();
                }}
              >
                Delete Item
              </Button>
              <div className="flex justify-end gap-x-2 flex-1">
                <form method="dialog">
                  {/* <!-- if there is a button, it will close the modal --> */}
                  <button class="btn btn-neutral">Close</button>
                </form>
                <Button
                  color="primary"
                  onClick={() => {
                    this.save();
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Modal End */}
        <div
          onClick={(e) => {
            document
              .getElementById(`shop_item_${this.props.index}`)
              .showModal();
          }}
          className=" cursor-pointer hover:opacity-60 w-[200px] h-[200px] flex flex-col items-center bg-darkGray rounded-md"
        >
          <div className="flex w-full items-center justify-center p-4 h-[80%]">
            <img src={this.props.item.img} className="h-full" />
          </div>

          <div className="mt-auto w-full bg-grey text-center h-[20%]">
            <h1 className="text-white font-bold">
              {this.props.index == "new" ? "Add Item" : this.props.item.name}
            </h1>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem);
