import { useState } from 'react';
import Section from "./Section";
import Statistics from "./Statistics";
import FeedbackOptions from "./FeedbackOptions";
import Notification from "./Notification";
import css from './Feedback.module.css';


export default function Feedback()  {
    
    const[good, setGood] =  useState(0);
    const[neutral, setNeutral] =  useState(0);
    const[bad, setBad] =  useState(0);
    

const onLeaveFeedback = (e) => {
        const { name } = e.currentTarget;
        switch (name) {
            case "good":
                return setGood((prev) => prev + 1);
            case "neutral":
                return setNeutral((prev) => prev + 1);
            case "bad":
                return setBad((prev) => prev + 1);
             default:
                return;
    }
    }

const countTotalFeedback = () => {
    
    return good + neutral + bad;
  
};

const countPositiveFeedbackPercentage = () => {
    
    const countTotal = countTotalFeedback();
     
	const percentage = (good * 100) / countTotal;
	return Math.round(percentage);
}
const total = countTotalFeedback();
    
    return (
         <div className={css.feedback}>
            <Section title="Please leave feedback">

                <FeedbackOptions options={Object.keys({ good, neutral, bad })} onLeaveFeedback={onLeaveFeedback} />
                
				</Section>

            {total === 0 ? (
			<Notification message="No feedback given" /> ) : (
                <Section title="Statistics">
                <Statistics
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    total={countTotalFeedback()}
                    positivePercentage={countPositiveFeedbackPercentage()}
                />
                </Section>
)}
        </div>
        )
    }


