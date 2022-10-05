import React from 'react'

const Header = (props) => {

    return (
      <h1>{props.name}</h1>
    )
  }
  const Content = (props) => {
    return (
      <div>
        {/* <Part part={props.parts[0]}/>
        <Part part={props.parts[1]}/>
        <Part part={props.parts[2]}/> */}
  
        {props.parts.map(part => 
        <Part key={part.id} part={part}/>
        )}
      </div>
  
    )
  }
  
  const Part = (props)=>{
    return (
    <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.reduce((acc, cur) => {return acc + cur.exercises},0);
    return (
      <p>Total exercises: {total}</p>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
  
        
      </div>
    )
  }
  
  export default Course
