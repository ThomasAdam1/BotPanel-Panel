import React, { Component } from "react";
import { connect } from "react-redux";
import ShortText from "../inputs/ShortText";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ChannelSelect from "./ChannelSelect";

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
import { ArrowDownIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
// import SectionHeader from "../elements/SectionHeader";

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
			<div className="gap-y-5 flex flex-col">
				{this.props.value.map((slot, index) => {
					return (
						<div>
							<div className="bg-menu-color p-5 rounded-md">
								<div
									className="flex items-center cursor-pointer"
									onClick={(e) => {
										this.setState({
											showIndex: this.state.showIndex == index ? null : index
										});
									}}
								>
									<div>
										<h3 className="mb-0 text-white font-bold">
											{this.renderSlotName(slot)} #{index + 1}
										</h3>
										<div className="text-sm">{this.props.settings.individual_slot_description}</div>
									</div>

									<div className="ml-auto">
										{this.state.showIndex !== index ? (
											<ChevronDownIcon className="h-6 w-6 text-white" />
										) : (
											<ChevronUpIcon className="h-6 w-6 text-white" />
										)}
									</div>
									{/* <div style={{ marginLeft: "auto" }}>{this.state.showIndex == index ? <i style={{ fontSize: "20px" }} class="bi bi-caret-up-fill"></i> : <i style={{ fontSize: "20px" }} class="bi bi-caret-down-fill"></i>}</div> */}
								</div>

								{this.state.showIndex == index ? (
									<div className="mt-3">
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
			</div>
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
				<div className="py-5 px-5 bg-menu-color">
					<div class="mb-3">
						<h3 className="text-white text-2xl font-bold">{this.props.settings.title}</h3>
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
						<div class="mb-3 mt-3">
							<h3 className="text-white text-2xl font-bold">{`${this.props.settings.active_title} ${this.props.settings.slot_limit ? `${this.props.value.length}/${this.renderSlotLimit()}` : ""}`}</h3>
							{/* <div className="section-content-header">{this.props.settings.description}</div> */}
						</div>

						{/* <SectionHeader title={`${this.props.settings.active_title} ${this.props.settings.slot_limit ? `${this.props.value.length}/${this.renderSlotLimit()}` : ""}`} pretitle={this.props.settings.active_pretitle} /> */}
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
