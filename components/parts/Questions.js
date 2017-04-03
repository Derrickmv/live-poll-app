import React, { Component, PropTypes } from 'react';

class Questions extends Component {
	constructor() {
		super();
		this.ask = this.ask.bind(this);
	}

	ask(question) {
		this.props.emit('ask', question);
	}

	render() {
		return(
			<div id="questions" className="row">
				<h2>Questions</h2>
					{this.props.questions.map((question, i) => {
						return (
							<div key={i} onClick={() => this.ask(question)}
								className="col-xs-12 col-sm-6 col-md-3 btn btn-default">
								<span >{question.q}</span>
							</div>
							);
					})}
			</div>
			);
	}
}

Questions.propTypes = {
	questions: PropTypes.array,
	emit: PropTypes.func
};

export default Questions;