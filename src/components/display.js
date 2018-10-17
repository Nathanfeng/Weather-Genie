import React, {Component} from 'react';

export const Display = (props) => {
  return (
    <div>
      <h3>Today is {props.date}</h3>
    <p>The temperature in {props.name} is {props.overall}F, with a high of {props.high}F and a low of {props.low}F. </p>
    <p>If you look outside you see {props.description}. </p>
    </div>
  )
}
