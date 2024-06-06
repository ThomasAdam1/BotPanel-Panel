import React, { Component } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { setAuth, getData, updateServerSettingsSaveRequired } from "./actions";
import server from "./utils/server";

export class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      server_settings_timeout: null,
    };
  }
  componentDidMount() {
    if (!this.props.auth) {
      this.props.setAuth();
      //
    }
    // console.log("AuthProvider", this.props.auth);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth && !prevProps.auth) {
      this.props.getData();
    } else if (!this.props.auth) {
      this.props.setAuth();
    }

    if (
      this.props.saves_required.serverSettings != null &&
      prevProps.saves_required.serverSettings !=
        this.props.saves_required.serverSettings
    ) {
      // Clear the timeout if it exists.
      if (this.state.server_settings_timeout) {
        clearTimeout(this.state.server_settings_timeout);
      }
      // Create a timeout to save the server settings in 3 seconds.
      var server_settings_timeout = setTimeout(() => {
        // this.props.getData();
        this.saveServerSettings();
      }, 1500);
      this.setState({ server_settings_timeout });
    }
    console.log("Server Settings Updated");

    //
  }

  saveServerSettings = async () => {
    await server
      .post(
        `/client/server/${this.props.active_server.id}/server_settings`,
        this.props.data.serverSettings
      )
      .catch((e) => {
        //
      });

    toast.success("Server Settings Saved", {
      // icon: "",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    this.props.updateServerSettingsSaveRequired();

    // console.log("Saving Server Settings");
    // await this.props.saveServerSettings();
    // this.props.getData();
  };
  render() {
    if (this.props.auth && this.props.loaded) {
      return <>{this.props.children}</>;
    } else {
      return (
        // Loader
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loaded: state.data.loaded,
  saves_required: state.data.saves_required,
  active_server: state.data.active_server,
  data: state.data,
});

const mapDispatchToProps = {
  setAuth,
  getData,
  updateServerSettingsSaveRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
