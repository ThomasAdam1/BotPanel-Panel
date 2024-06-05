import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ShopItem } from '../elements/ShopItem';
import ModuleShopModal from './ModuleShopModal';
// import PremiumModal from '../elements/PremiumModal';

import ReactGA from 'react-ga';
import InputTitle from './InputTitle';

export class ModuleShop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            index: null,
            showPremiumModal: false
        };
    }

    renderItems = () => {
        var items = [];
        this.props.value.forEach((item, index) => {
            items.push(
                <ShopItem click={() => {
                    this.setState({
                        index: index,
                        showModal: true
                    });

                    document.body.style.overflowY = 'hidden';

                }} name={item.name} img={item.img} />
            );

        });
        // if ('shop' in this.props.economy) {
        //     this.props.economy.shop.items.forEach((item, index) => {
        //         items.push(
        //             <ShopItem click={() => {
        //                 this.setState({
        //                     index: index,
        //                     showModal: true
        //                 });

        //                 document.body.style.overflowY = 'hidden';

        //             }} name={item.name} img={item.img} />
        //         );
        //     });
        // }
        return items;
    };

    renderDescription = () => {
        if (this.props.settings.html) {
            return <div dangerouslySetInnerHTML={{ __html: this.props.settings.description }}></div>;
        } else {
            return <p>{this.props.settings.description}</p>;
        }
    };

    render() {
        return (
            <div className={`shop section-content-normal ${this.props.settings.premium && !this.props.premium ? "opacity-75 pointer-events-none" : ""}`}>
                <InputTitle settings={this.props.settings} />
                <div className="section-content-header mb-2">
                    {this.renderDescription()}
                </div>
                {this.state.showModal === true ? <ModuleShopModal items={this.props.value} deleteItem={(index) => {
                    var items = [...this.props.value];
                    items.splice(index, 1);
                    this.props.onChange(items);
                }} saveItem={(item, index) => {
                    console.log(item, index);
                    if (index == null) {
                        var items = [...this.props.value];
                        items.push(item);
                    } else {
                        var items = [...this.props.value];
                        items[index] = item;
                    }

                    this.props.onChange(items);

                }} index={this.state.index} closeModal={() => {
                    this.setState({ showModal: false });
                    document.body.style.overflowY = 'visible';
                }} /> : null}

                {this.state.showPremiumModal === true ? <PremiumModal

                    closeModal={() => {
                        this.setState({ showPremiumModal: false });
                        document.body.style.overflowY = 'visible';
                    }}
                /> : null}
                <div className="shop-items-container">

                    {this.renderItems()}
                    <button className="new-item" onClick={() => {
                        if (this.props.premium === true) {
                            this.setState({ showModal: true, index: null });
                            document.body.style.overflowY = 'hidden';
                        } else {
                            this.setState({ showPremiumModal: true });
                        }

                    }}>New {this.props.settings.itemName ? this.props.settings.itemName : "Item"}</button>



                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    premium: state.data.premium
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleShop);
