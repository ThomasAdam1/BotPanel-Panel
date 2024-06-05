import React, { Component } from 'react';
import { connect } from 'react-redux';


import InputTitle from './InputTitle';

export class ChannelSelect extends Component {
    renderDescription = () => {
        if (this.props.settings.html) {
            return <div dangerouslySetInnerHTML={{ __html: this.props.settings.description }}></div>;
        } else {
            return <p>{this.props.settings.description}</p>;
        }
    };

    renderChannels = () => {
        if (this.props.server_data.channels) {
            return this.props.server_data.channels.map((channel) => {
                if (this.props.settings.channelFilter == undefined && channel.type == 0 || (this.props.settings.channelFilter && this.props.channelFilter.length > 0 && this.props.channelFilter.includes(channel.type))) {
                    return <option value={channel.id}>#{channel.name}</option>;
                }

            });
        }
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
                        <div>

                            <select className='select select-bordered w-full'>
                                <option disabled value={JSON.stringify({ id: "" })}>Pick a Channel</option>
                                {this.renderChannels()}
                            </select>

                            {/* <Select type="channel" channelFilter={this.props.settings.channel_filter ? this.props.settings.channel_filter : undefined} value={JSON.stringify(this.props.value)} onChange={(value) => {
                                this.props.change(JSON.parse(value));

                            }} /> */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({

    server_data: state.data.server_data
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSelect);;