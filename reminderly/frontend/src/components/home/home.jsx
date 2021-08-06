import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import axios from "axios";
import { getReminders } from "../../redux/actions/Reminders";

import { ReminderItem } from "./reminderItem";
import { tokenConfig, compareDateToToday } from "../../core";

import { Modal } from "react-bootstrap";
import { showAlert } from "../../redux/actions/Alerts";

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newReminderText: "",
			newReminderDate: null,
			activeView: "today",
			addReminderModalOpen: false,
		};

		this.onChange = this.onChange.bind(this);
	}

	static propTypes = {};

	onChange = (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	addReminder = (e) => {
		const obj = {
			text: this.state.newReminderText,
			due_date: this.state.newReminderDate,
		};

		axios
			.post(`/api/v1/reminders/`, obj, tokenConfig())
			.then((res) => {
				this.props.getReminders();
				this.toggleAddReminderModal();
				this.props.showAlert("Reminder Added Successfully!", "success");
			})
			.catch((err) => {
				this.toggleAddReminderModal();
				this.props.showAlert("Could Not Add Reminder!", "danger");
			});
	};

	changeView = (view) => {
		this.setState({ activeView: view });
	};

	toggleAddReminderModal = () => {
		var newState = !this.state.addReminderModalOpen;

		this.setState({ addReminderModalOpen: newState });
	};

	componentDidMount() {
		this.props.getReminders();
	}

	render() {
		return (
			<div className="container-fluid">
				<Modal
					show={this.state.addReminderModalOpen}
					onHide={this.toggleAddReminderModal}
				>
					<Modal.Header>
						<h5 class="modal-title" id="addReminderModalLabel">
							{" "}
							Add New Reminder{" "}
						</h5>
					</Modal.Header>
					<Modal.Body>
						<div class="form-group">
							<label for="addReminderText">Reminder Text</label>
							<textarea
								type="text"
								class="form-control"
								id="addReminderText"
								value={this.state.newReminderText}
								name="newReminderText"
								onChange={this.onChange}
							/>
						</div>
						<div class="form-group">
							<label for="addReminderDueDate">Due Date</label>
							<input
								type="date"
								class="form-control"
								id="addReminderDueDate"
								value={this.state.newReminderDate}
								name="newReminderDate"
								onChange={this.onChange}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<button
							type="button"
							class="btn btn-danger"
							data-dismiss="modal"
						>
							Cancel
						</button>
						<button
							type="button"
							class="btn btn-primary"
							onClick={this.addReminder}
						>
							Save
						</button>
					</Modal.Footer>
				</Modal>
				<div className="d-flex flex-row mt-3">
					<nav class="nav nav-pills nav-fill">
						<a
							class={`nav-link ${
								this.state.activeView === "earlier"
									? "active"
									: ""
							}`}
							href="#"
							onClick={() => {
								this.changeView("earlier");
							}}
						>
							Earlier
						</a>
						<a
							class={`nav-link ${
								this.state.activeView === "today"
									? "active"
									: ""
							}`}
							href="#"
							onClick={() => {
								this.changeView("today");
							}}
						>
							Today's Reminders
						</a>
						<a
							class={`nav-link ${
								this.state.activeView === "later"
									? "active"
									: ""
							}`}
							href="#"
							onClick={() => {
								this.changeView("later");
							}}
						>
							Later
						</a>
					</nav>
					<div className="ml-auto d-flex align-items-end ">
						<div className="mr-3">
							{`Today is, ${new Date().getFullYear()}-${
								new Date().getMonth() + 1
							}-${new Date().getDate()}`}
						</div>
						<button
							className="btn btn-success d-flex align-items-end my-auto"
							onClick={this.toggleAddReminderModal}
						>
							<i className="material-icons">add</i> New Reminder
						</button>
					</div>
				</div>
				<hr />
				<div
					className={`${
						this.state.activeView === "earlier" ? "" : "d-none"
					}`}
				>
					{this.props.reminders.map((reminder) => {
						if (compareDateToToday(reminder.due_date) === -1) {
							return (
								<ReminderItem
									user={this.props.user}
									showAlert={this.props.showAlert}
									reminder={reminder}
									actionCallback={this.props.getReminders}
								/>
							);
						} else {
							return null;
						}
					})}
				</div>
				<div
					className={`${
						this.state.activeView === "today" ? "" : "d-none"
					}`}
				>
					{this.props.reminders.map((reminder) => {
						if (compareDateToToday(reminder.due_date) === 0) {
							return (
								<ReminderItem
									user={this.props.user}
									showAlert={this.props.showAlert}
									reminder={reminder}
									actionCallback={this.props.getReminders}
								/>
							);
						} else {
							return null;
						}
					})}
				</div>
				<div
					className={`${
						this.state.activeView === "later" ? "" : "d-none"
					}`}
				>
					{this.props.reminders.map((reminder) => {
						if (compareDateToToday(reminder.due_date) === 1) {
							return (
								<ReminderItem
									user={this.props.user}
									showAlert={this.props.showAlert}
									reminder={reminder}
									actionCallback={this.props.getReminders}
								/>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	reminders: state.RemindersReducer.reminders,
	user: state.AuthReducer.user,
});

export default connect(mapStateToProps, { getReminders, showAlert })(Home);
