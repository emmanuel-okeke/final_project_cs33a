import React, { Component } from "react";
import PropTypes from "prop-types";

import { tokenConfig } from "../../core";
import axios from "axios";

import { Modal } from "react-bootstrap";

export class ReminderItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newReminderText: props.reminder.text,
			newReminderDate: props.reminder.due_date,
			addUserTagEmail: "",
			reminderTagsModalOpen: false,
			deleteReminderModalOpen: false,
			updateReminderModalOpen: false,
		};
	}

	onChange = (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	updateReminder = (e) => {
		const obj = {
			text: this.state.newReminderText,
			due_date: this.state.newReminderDate,
		};

		axios
			.patch(
				`/api/v1/reminders/${this.props.reminder.id}/`,
				obj,
				tokenConfig()
			)
			.then((res) => {
				this.props.actionCallback();
				this.toggleUpdateReminderModal();
				this.props.showAlert(
					"Reminder Updated Successfully!",
					"success"
				);
			})
			.catch((err) => {
				this.props.showAlert(
					"Reminder Could Not Be Updated!",
					"danger"
				);
			});
	};

	deleteReminder = (e) => {
		axios
			.delete(
				`/api/v1/reminders/${this.props.reminder.id}/`,
				tokenConfig()
			)
			.then((res) => {
				this.props.actionCallback();
				this.toggleDeleteReminderModal();
				this.props.showAlert(
					"Reminder Deleted Successfully!",
					"success"
				);
			})
			.catch((err) => {
				this.props.showAlert(
					"Reminder Could Not Be Deleted!",
					"danger"
				);
			});
	};

	addUserTag = (e) => {
		const obj = {
			reminder: this.props.reminder.id,
			tagged_user: this.state.addUserTagEmail,
		};

		axios
			.post(`/api/v1/tags/`, obj, tokenConfig())
			.then((res) => {
				this.props.actionCallback();
				this.props.showAlert("User Tagged Successfully!", "success");
			})
			.catch((err) => {
				this.props.showAlert("Could Not Tag User!", "danger");
			});
	};

	removerUserTag = (tagId) => {
		axios
			.delete(`/api/v1/tags/${tagId}`, tokenConfig())
			.then((res) => {
				this.props.actionCallback();
				this.props.showAlert(
					"Tagged User Removed Successfully!",
					"success"
				);
			})
			.catch((err) => {
				this.props.showAlert(
					"Tagged User Could not Be Removed!",
					"danger"
				);
			});
	};

	addReminderFlag = (e) => {
		const obj = {
			reminder: this.props.reminder.id,
		};

		axios
			.post(`/api/v1/flags/`, obj, tokenConfig())
			.then((res) => {
				this.props.actionCallback();
				this.props.showAlert(
					"Reminder Flagged Successfully!",
					"success"
				);
			})
			.catch((err) => {
				this.props.showAlert("Could Not Flag Reminder!", "danger");
			});
	};

	removeReminderFlag = (e) => {
		axios
			.delete(`/api/v1/flags/${this.props.reminder.id}/`, tokenConfig())
			.then((res) => {
				this.props.actionCallback();
				this.props.showAlert(
					"Reminder Flag Removed Successfully!",
					"success"
				);
			})
			.catch((err) => {
				this.props.showAlert(
					"Reminder Flag Could not Be Removed!",
					"danger"
				);
			});
	};

	userTagged = () => {
		return this.props.reminder.tags.some((tag) => {
			if (this.props.user && tag.tagged_user === this.props.user.email) {
				return true;
			}
		});
	};

	toggleReminderTagsModal = () => {
		var newState = !this.state.reminderTagsModalOpen;

		this.setState({ reminderTagsModalOpen: newState });
	};

	toggleDeleteReminderModal = () => {
		var newState = !this.state.deleteReminderModalOpen;

		this.setState({ deleteReminderModalOpen: newState });
	};

	toggleUpdateReminderModal = () => {
		var newState = !this.state.updateReminderModalOpen;

		this.setState({ updateReminderModalOpen: newState });
	};

	static propTypes = {
		reminder: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div className="d-flex flex-column border border-primary rounded shadow p-2 my-3">
				<Modal
					show={this.state.updateReminderModalOpen}
					onHide={this.toggleUpdateReminderModal}
					id={`updateReminderModal${this.props.reminder.id}`}
				>
					<Modal.Header>
						<h5
							class="modal-title"
							id={`updateReminderModalLabel${this.props.reminder.id}`}
						>
							{" "}
							Update Reminder{" "}
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
							onClick={this.toggleUpdateReminderModal}
						>
							Cancel
						</button>
						<button
							type="button"
							class="btn btn-primary"
							onClick={this.updateReminder}
						>
							Update
						</button>
					</Modal.Footer>
				</Modal>
				<Modal
					show={this.state.deleteReminderModalOpen}
					onHide={this.toggleDeleteReminderModal}
					id={`deleteReminderModal${this.props.reminder.id}`}
				>
					<Modal.Header>
						<h5
							class="modal-title"
							id={`deleteReminderModalLabel${this.props.reminder.id}`}
						>
							{" "}
							Delete Reminder?{" "}
						</h5>
					</Modal.Header>
					<Modal.Footer>
						<button
							type="button"
							class="btn btn-danger"
							onClick={this.toggleDeleteReminderModal}
						>
							Cancel
						</button>
						<button
							type="button"
							class="btn btn-success"
							onClick={this.deleteReminder}
						>
							Yes
						</button>
					</Modal.Footer>
				</Modal>
				<Modal
					show={this.state.reminderTagsModalOpen}
					onHide={this.toggleReminderTagsModal}
					id={`reminderTagsModal${this.props.reminder.id}`}
				>
					<Modal.Body>
						<h4 className="mt-1">Tag New User</h4>
						<hr />
						<div className="mb-3">
							<div class="form-group">
								<label for="addReminderText">User Email</label>
								<input
									type="text"
									class="form-control"
									id={`addUserTag${this.props.reminder.id}`}
									value={this.state.addUserTagEmail}
									name="addUserTagEmail"
									onChange={this.onChange}
								/>
							</div>
							<button
								className="btn btn-primary"
								onClick={this.addUserTag}
							>
								Add
							</button>
						</div>
						<h4>All Tagged Users</h4>
						<hr />
						<div>
							<ul class="list-group">
								{this.props.reminder.tags.map((tag) => {
									return (
										<li class="list-group-item">
											<div className="d-flex flex-row">
												<div>{tag.tagged_user}</div>
												<div className="ml-auto">
													<button
														className="btn btn-danger p-0"
														onClick={() => {
															this.removerUserTag(
																tag.id
															);
														}}
													>
														<i className="material-icons float-right">
															close
														</i>
													</button>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					</Modal.Body>
				</Modal>
				<div>
					<span className="float-left">
						Due <b>{this.props.reminder.due_date}</b>
					</span>
					<button
						className="btn btn-danger btn-sm p-0 m-1 float-right"
						onClick={this.toggleDeleteReminderModal}
					>
						<i className="material-icons float-right">close</i>
					</button>
					<button
						className="btn btn-primary btn-sm p-0 m-1 float-right"
						onClick={this.toggleUpdateReminderModal}
					>
						<i className="material-icons float-right">edit</i>
					</button>
					<button
						className="btn btn-secondary btn-sm p-0 m-1 float-right"
						onClick={() => {
							if (this.props.reminder.flagged) {
								this.removeReminderFlag();
							} else {
								this.addReminderFlag();
							}
						}}
					>
						<i className="material-icons float-right">flag</i>
					</button>
				</div>
				<div>{this.props.reminder.text}</div>
				<div>
					<hr className="bg-primary" />
					<div className="d-flex flex-row">
						<div className="mr-auto">
							Created On {this.props.reminder.created_date} by,{" "}
							{this.props.reminder.created_by}.
						</div>
						<div className="ml-auto d-flex flex-row">
							<div
								className={`mr-2 ${
									this.userTagged() ? "" : "d-none"
								}`}
							>
								<b className="text-success">Tagged</b>
							</div>
							<div
								className={`mr-2 ${
									this.props.reminder.flagged ? "" : "d-none"
								}`}
							>
								<b className="text-danger">Flagged</b>
							</div>
							<div>
								<a
									onClick={this.toggleReminderTagsModal}
									href="#"
								>
									{" "}
									All Tags{" "}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ReminderItem;
