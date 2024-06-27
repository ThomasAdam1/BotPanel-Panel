import React, { Component } from "react";
import { connect } from "react-redux";
import Toggle from "./Toggle";
import { updateModuleSettings } from "../../actions";
import Button from "./Button";

export class Command extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      initName: "",
      description: "",
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.command.name,
      initName: this.props.command.name,
      description: this.props.command.description,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.command != this.props.command) {
    //   this.setState({
    //     name: this.props.command.name,
    //     initName: this.props.command.name,
    //     description: this.props.command.description,
    //   });
    // }
  }

  saveValidation = () => {
    if (this.state.name == this.state.initName) {
      return true;
    }
    // Go through all commands in the all modules that are enabled and ensure that the name is unique
    var server_settings = this.props.serverSettings;
    var moduleIds = Object.keys(server_settings.moduleSettings);
    var commandNames = [];
    moduleIds.forEach((module_id, i) => {
      var module = server_settings.moduleSettings[module_id];
      if (module) {
        module.commands.forEach((command, j) => {
          if (command.enabled != false) {
            commandNames.push(command.name);
          }
        });
      }
    });

    console.log(commandNames);

    if (commandNames.includes(this.state.name)) {
      return false;
    } else {
      return true;
    }
  };

  nameOnChange = (value) => {
    value = value.split(" ");

    var command = value[0];
    var subcommand = "";
    command = command.toLowerCase();
    command = command.substring(0, 32);
    command = command.replace(" ", "-");
    const regexForNonAlphaNum = new RegExp(/[^\p{L}\p{N}_-]+/gu);
    command = command.replace(regexForNonAlphaNum, "");
    if (value.length > 1) {
      // All others
      value.shift();
      subcommand = value.join(" ");
      subcommand = subcommand.toLowerCase();
      subcommand = subcommand.substring(0, 32);
      subcommand = subcommand.replace(" ", "-");
      const regexForNonAlphaNum = new RegExp(/[^\p{L}\p{N}_-]+/gu);
      subcommand = subcommand.replace(regexForNonAlphaNum, "");
      value = command + " " + subcommand;
    } else {
      value = command;
    }

    this.setState({
      name: value,
    });
  };
  render() {
    return (
      <>
        <dialog
          id={`command_${this.props.module_id}.${this.props.command_index}`}
          class="modal"
        >
          <div class="modal-box">
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
              <h3 class="font-bold text-lg">Edit Command</h3>

              <div className="w-full">
                <label class="form-control w-full ">
                  <div class="label">
                    <span class="label-text">Name</span>
                  </div>
                  <input
                    onChange={(e) => {
                      this.nameOnChange(e.target.value);
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
                    <span class="label-text">Description</span>
                  </div>
                  <input
                    onChange={(e) => {
                      this.setState({
                        description: e.target.value,
                      });
                    }}
                    type="text"
                    value={this.state.description}
                    class="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
            <div class="modal-action">
              <Button
                onClick={(e) => {
                  this.setState({
                    error: false,
                  });
                  if (this.saveValidation()) {
                    // Save the message and close the modal
                    var server_settings = this.props.serverSettings;

                    var module =
                      server_settings.moduleSettings[this.props.module_id];
                    // console.log(module, 'MODULE HERE');

                    var command = module.commands[this.props.command_index];
                    command.name = this.state.name;
                    command.description = this.state.description;
                    this.props.updateModuleSettings(
                      this.props.module_id,
                      module
                    );
                    var dialog = document.getElementById(
                      `command_${this.props.module_id}.${this.props.command_index}`
                    );
                    dialog.close();
                  } else {
                    this.setState({
                      error: true,
                      loading: false,
                    });
                  }
                }}
                disabled={
                  this.state.name == "" ||
                  this.state.description == "" ||
                  this.state.loading == true
                }
                className="btn"
                color="primary"
              >
                Save
              </Button>
              <form method="dialog">
                {/* <!-- if there is a button, it will close the modal --> */}
                <button class="btn">Close</button>
              </form>
            </div>
          </div>

          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <div
          onClick={() => {
            var dialog = document.getElementById(
              `command_${this.props.module_id}.${this.props.command_index}`
            );
            dialog.showModal();
          }}
          className={`bg-menu-color ${
            this.props.command.enabled == false ? "opacity-70" : ""
          } flex items-center rounded-lg p-6 w-full`}
        >
          <div>
            <h3 className="text-white font-bold">/{this.props.command.name}</h3>
            <span className="text-sm">{this.props.command.description}</span>
          </div>

          <div
            className="ml-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Toggle
              value={this.props.command.enabled != false ? true : false}
              onChange={(value) => {
                console.log(this);
                var server_settings = this.props.serverSettings;

                var module =
                  server_settings.moduleSettings[this.props.module_id];
                // console.log(module, 'MODULE HERE');

                var command = module.commands[this.props.command_index];
                command.enabled = value;
                this.props.updateModuleSettings(this.props.module_id, module);
              }}
              size="lg"
              color="primary"
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  serverSettings: state.data.serverSettings,
  moduleInfo: state.data.modules,
});

const mapDispatchToProps = {
  updateModuleSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Command);
