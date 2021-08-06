import React, { Component } from "react";

import { connect } from "react-redux";

import { ReminderItem } from "../home/reminderItem";
import { getReminders } from "../../redux/actions/Reminders";
import { showAlert } from "../../redux/actions/Alerts";

export class Flagged extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	static propTypes = {};

	componentDidMount() {
		this.props.getReminders();
	}

	render() {
		return (
			<div className="container-fluid">
				<h4 className="mt-3">Flagged Reminders</h4>
				<hr />
				{this.props.reminders.map((reminder) => {
					if (reminder.flagged) {
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
		);
	}
}

const mapStateToProps = (state) => ({
	reminders: state.RemindersReducer.reminders,
	user: state.AuthReducer.user,
});

export default connect(mapStateToProps, { getReminders, showAlert })(Flagged);
