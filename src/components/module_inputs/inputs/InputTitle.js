import React, { Component } from 'react';
import { connect } from 'react-redux';

import RefreshBotData from '../../elements/RefreshBotData';

export class InputTitle extends Component {
    render() {
        return (
            <div className='flex items-center'>
                <h3 className='text-white font-bold flex items-center' style={{ marginBottom: "0px" }}>{this.props.settings.title} {this.props.refresh ? <RefreshBotData /> : null}</h3>



            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    premium: state.data.premium
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InputTitle);