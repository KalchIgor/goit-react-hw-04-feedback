import React from 'react';
import Section from "./Section";
import Statistics from "./Statistics";
import FeedbackOptions from "./FeedbackOptions";
import Notification from "./Notification";
import css from './Feedback.module.css';


class Feedback extends React.Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0
    };
    
onLeaveFeedback = (e) => {
    const name = e.target.name;
	this.setState((prevState) => ({
		[name]: prevState[name] + 1
	    }));
    }

countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const countTotal = good + neutral + bad;
    return countTotal;
};

countPositiveFeedbackPercentage = () => {
    const countTotal = this.countTotalFeedback();
	const { good } = this.state;
	const percentage = (good * 100) / countTotal;
	return Math.round(percentage);
}

render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback(); 
    const positivePercentage = this.countPositiveFeedbackPercentage();
    const objKey = Object.keys(this.state);
    return (
         <div className={css.feedback}>
            <Section title="Please leave feedback">
					<FeedbackOptions options={objKey} onLeaveFeedback={this.onLeaveFeedback} />
				</Section>

            {total === 0 ? (
			<Notification message="No feedback given" /> ) : (
                <Section title="Statistics">
                <Statistics
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    total={total}
                    positivePercentage={positivePercentage}
                />
                </Section>
)}
        </div>
        )
    }
}

export default Feedback;