import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatsDisplay = (props) => (
  <p>{props.text} {props.value}</p>
)

const SectionHeader = ({text}) => (
  <h2>{text}</h2>
)

const Statistics = (values) => {

  const totalClicks = () => values.good + values.neutral + values.bad
  const getAvg = () => (values.good - values.bad) / totalClicks()

  
  return (
    <div>
    <StatsDisplay text="Average: " value={getAvg()}/>
    <StatsDisplay text="Positive: " value={values.good / totalClicks()}/>
    <StatsDisplay text="good " value={values.good}/>
    <StatsDisplay text="neutral " value={values.neutral}/>
    <StatsDisplay text="bad " value={values.bad}/>
    </div>
  )

}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementState = (state, setter) => {
    setter(state + 1);
  }

  return (
    <div>
      <SectionHeader text="Give Feedback"/>
      <Button handleClick={() => incrementState(good, setGood)} text="good"/>
      <Button handleClick={() => incrementState(neutral, setNeutral)} text="neutral"/>
      <Button handleClick={() => incrementState(bad, setBad)} text="bad"/>

      <SectionHeader text="Stats"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
