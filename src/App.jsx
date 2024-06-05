import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Router } from "react-router-dom";
import Modules from "./components/pages/Modules";
import history from "./utils/history";
import Servers from "./components/pages/Servers";
import Home from "./components/pages/Home";
import { getData } from "./actions";
import { Helmet } from "react-helmet";
import ModulePage from "./components/pages/ModulePage";

const Main = () => <h1>Hello world</h1>;
export class App extends Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    if (!this.props.loaded) {
      return (
        <>
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Helmet>
            <title>{this.props.bot.dash_settings.title}</title>
            <description>{this.props.bot.dash_settings?.description}</description>
          </Helmet>
          <Router history={history}>
            <Switch>
              <Route path="/servers" component={Servers} />
              <Route path="/dashboard/:server_id/module/:module_id" component={ModulePage} />
              <Route path="/dashboard/:server_id" component={Modules} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  loaded: state.data.loaded,
  bot: state.data.bot,
});

const mapDispatchToProps = {
  getData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
