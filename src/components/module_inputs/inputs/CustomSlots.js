import React, { Component } from "react";
import { connect } from "react-redux";
import ShortText from "../inputs/ShortText";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ChannelSelect from "./ChannelSelect";
import ReactGA from "react-ga";
import InputSwitcher from "./InputSwitcher";
import RoleSelect from "./RoleSelect";
import MultiRoleSelect from "./MultiRoleSelect";
import MultiChannelSelect from "./MultiChannelSelect";
import MultiWordAdd from "./MultiWordAdd";
import CustomColorPicker from "./CustomColorPicker";
import LongText from "./LongText";
import ModuleSelect from "./ModuleSelect";
import ModuleToggle from "./ModuleToggle";
import SlotItem from "./SlotItem";
import SectionHeader from "../elements/SectionHeader";

export class CustomSlots extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showIndex: null
		};
	}

	renderInputs = (id) => {
		return (
			<>
				{this.props.settings.inputs.map((input, index) => {
					var value = input.defaultValue;
					if (this.state.values[input.id] !== undefined) {
						value = this.state.values[input.id];
					}
					switch (input.type) {
						case "short":
							return (
								<ShortText
									value={value}
									slot={true}
									settings={input}
									change={(value) => {
										// console.log('value');
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
								/>
							);
						case "long":
							return (
								<LongText
									slot={true}
									value={value}
									settings={input}
									change={(value) => {
										// console.log('value');
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
								/>
							);
						case "select":
							return (
								<ModuleSelect
									slot={true}
									value={value}
									settings={input}
									change={(value) => {
										// console.log('value');
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
								/>
							);
						case "toggle":
							return (
								<ModuleToggle
									slot={true}
									change={(value) => {
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
									value={value}
									settings={input}
								/>
							);
						case "channel_select":
							return (
								<ChannelSelect
									slot={true}
									change={(value) => {
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
									value={value}
									settings={input}
								/>
							);
						case "role_select":
							return (
								<RoleSelect
									slot={true}
									change={(value) => {
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
									value={value}
									settings={input}
								/>
							);

						case "input_switch":
							return (
								<InputSwitcher
									slot={true}
									value={value}
									settings={input}
									change={(value) => {
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
								/>
							);
						case "multi_role_select":
							return (
								<MultiRoleSelect
									slot={true}
									value={value}
									settings={input}
									change={(value) => {
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
								/>
							);

						case "multi_channel_select":
							return (
								<MultiChannelSelect
									slot={true}
									value={value}
									settings={input}
									change={(value) => {
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
								/>
							);

						case "word_add_input":
							return (
								<MultiWordAdd
									slot={true}
									value={value}
									settings={input}
									change={(value) => {
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
								/>
							);

						case "color":
							return (
								<CustomColorPicker
									slot={true}
									value={value}
									settings={input}
									change={(value) => {
										var state = { ...this.state };
										state.values[input.id] = value;
										this.setState(state);
									}}
								/>
							);
						default:
							return <ShortText slot={true} value={value} settings={input} />;
					}
				})}
			</>
		);
	};

	renderSlotName = (slot) => {
		console.log(this.props.settings.slot_name_key, "SLOT NAME KEY", this.props.settings, slot);
		if (this.props.settings.slot_name_key) {
			// Go into the settings and find the slot name key
			var slotName = this.props.settings.slot_name_key;
			// Find it in the slot settings
			if (slot.settings[slotName] !== undefined) {
				return slot.settings[slotName].value;
			} else {
				if (this.props.settings.individual_slot_name) {
					return this.props.settings.individual_slot_name;
				} else {
					return "Slot";
				}
			}
		} else if (this.props.settings.individual_slot_name) {
			return this.props.settings.individual_slot_name;
		} else {
			return "Slot";
		}
	};

	renderSlots = () => {
		return (
			<>
				{this.props.value.map((slot, index) => {
					return (
						<div>
							<div className="announcement">
								<div
									className="announcement-header"
									onClick={(e) => {
										this.setState({
											showIndex: this.state.showIndex == index ? null : index
										});
									}}
								>
									<div>
										<h3 className="mb-0">
											{this.renderSlotName(slot)} #{index + 1}
										</h3>
										<div className="section-content-header">{this.props.settings.individual_slot_description}</div>
									</div>
									<div style={{ marginLeft: "auto" }}>{this.state.showIndex == index ? <i style={{ fontSize: "20px" }} class="bi bi-caret-up-fill"></i> : <i style={{ fontSize: "20px" }} class="bi bi-caret-down-fill"></i>}</div>
								</div>

								{this.state.showIndex == index ? (
									<div className="announcement-content section-content-normal">
										<SlotItem
											deleteSlot={() => {
												this.props.deleteSlot(index);
											}}
											slot={slot}
											settings={this.props.settings}
											index={index}
											addSlot={(slot) => {
												this.props.addSlot(slot, index);
												this.setState({ showIndex: null });
											}}
										/>
									</div>
								) : null}
							</div>
						</div>
					);

					// <SlotItem settings={this.props.settings} index={index} addSlot={(slot) => {
					//     this.props.addSlot(slot, index);
					// }} />;
				})}
			</>
		);
	};

	renderSlotLimit = () => {
		if (!this.props.premium && this.props.settings.slot_limit) {
			return this.props.settings.slot_limit;
		} else if (this.props.premium && this.props.settings.slot_premium_limit) {
			return this.props.settings.slot_premium_limit;
		}
	};
	render() {
		return (
			<div>
				<div className="section-content-normal">
					<div class="mb-15">
						<h3 style={{ marginBottom: "0px", fontSize: "26px" }}>{this.props.settings.title}</h3>
						<div className="section-content-header">{this.props.settings.description}</div>
					</div>

					<SlotItem
						settings={this.props.settings}
						slot_count={this.props.value.length}
						index={"new"}
						addSlot={(slot) => {
							this.props.addSlot(slot, "new");
						}}
					/>
				</div>

				{this.props.value.length > 0 ? (
					<section>
						<SectionHeader title={`${this.props.settings.active_title} ${this.props.settings.slot_limit ? `${this.props.value.length}/${this.renderSlotLimit()}` : ""}`} pretitle={this.props.settings.active_pretitle} />
						{this.renderSlots()}
					</section>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	premium: state.data.premium
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomSlots);
