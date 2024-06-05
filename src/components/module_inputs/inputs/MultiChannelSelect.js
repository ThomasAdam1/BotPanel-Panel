import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoleAdd from '../../elements/RoleAdd';
import InputTitle from './InputTitle';

export class MultiRoleSelect extends Component {
    renderDescription = () => {
        if (this.props.settings.html) {
            return <div dangerouslySetInnerHTML={{ __html: this.props.settings.description }}></div>;
        } else {
            return <p>{this.props.settings.description}</p>;
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
                            <RoleAdd type="channels" items={this.props.value} update={(value) => {
                                if (this.props.settings.limit) {
                                    if (value.length > this.props.settings.limit) {
                                        return;
                                    }
                                }
                                // console.log(value, 'ROLES');
                                this.props.change(value);
                            }} />
                            {/* <Select type="role" value={JSON.stringify(this.props.value)} onChange={(value) => {
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
    premium: state.data.premium
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MultiRoleSelect);