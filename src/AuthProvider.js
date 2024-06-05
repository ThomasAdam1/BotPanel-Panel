import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuth, getData } from './actions';

export class AuthProvider extends Component {

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
    }
    render() {

        if (this.props.auth && this.props.loaded) {
            return (
                <>{this.props.children}</>
            );
        }
        else {
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
    loaded: state.data.loaded
});

const mapDispatchToProps = {
    setAuth,
    getData
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);