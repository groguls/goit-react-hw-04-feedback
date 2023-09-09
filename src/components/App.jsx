import React, { useState } from 'react';
import { GlobalStyle, PageWrapper } from './GlobalStyle';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = label => {
    setFeedbacks(prevFeedbacks => ({
      ...prevFeedbacks,
      [label]: prevFeedbacks[label] + 1,
    }));
  };

  const totalFeedback = Object.values(feedbacks).reduce(
    (acc, value) => acc + value,
    0
  );

  const positiveFeedbackPercentage = Math.round(
    (feedbacks.good / totalFeedback) * 100
  );

  const { good, neutral, bad } = feedbacks;

  return (
    <PageWrapper>
      <GlobalStyle />
      <Section title="Please leave fedback">
        <FeedbackOptions
          options={Object.keys(feedbacks)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title={'Statistics'}>
        {totalFeedback <= 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          />
        )}
      </Section>
    </PageWrapper>
  );
};
