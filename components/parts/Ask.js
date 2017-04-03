import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import Display from './Display';
import $ from 'jquery';

class Ask extends Component {
	constructor() {
		var request;
		super();
		this.state = {
			choices: [],
			answer: undefined
		};
		this.selectHandler = this.selectHandler.bind(this);
	}

	setUpChoices() {
		let choices = Object.keys(this.props.question);
		choices.shift();
		this.setState({
			choices: choices,
			answer: sessionStorage.answer
		});
	}

	selectHandler(choice) {
		this.setState({ answer: choice });
		sessionStorage.answer = choice;
		this.props.emit('answer', { question: this.props.question, choice: choice });
		console.log(choice);
		this.request = $.ajax({
			url: "https://script.google.com/macros/s/AKfycbx8b9zscUg33tZz9eptbKp8UXSe_r8LHjl1Vi1eQXEqQoWRx0_7/exec",
			type: "POST",
			data: choice
		});
		this.request.done(function (response, textStatus, jqXHR) {
			console.log(response + "\n" + textStatus);
		});
		this.request.fail(function(jqXHR) {
			console.log('error\n');
			console.log(jqXHR);
		});
	}

	componentWillMount() {
		this.setUpChoices();
	}

	componentWillReceiveProps() {
		this.setUpChoices();
	}

	render() {
		const buttonTypes = ['primary', 'success', 'warning', 'danger'];
		return(
			<div id="currentQuestion">
				<Display if={this.state.answer}>
					<h3>You answered: {this.state.answer}</h3>
					<p>{this.props.question[this.state.answer]}</p>
				</Display>

				<Display if={!this.state.answer}>
					<h2>{this.props.question.q}</h2>
					<div className="row">
						{this.state.choices.map((choice, i) => {
							return (
								<button
									key={i}
									className={`col-xs-12 col-sm-6 btn btn-${buttonTypes[i]}`}
									onClick={() => this.selectHandler(choice)}>
									{choice}: {this.props.question[choice]}
								</button>
							);
						})}
					</div>
				</Display>
			</div>
			);
	}
};

Ask.propTypes = {
	question: PropTypes.oneOfType([
				PropTypes.object.isRequired,
				PropTypes.bool.isRequired
			]),
	emit: PropTypes.func.isRequired
};

export default Ask;
