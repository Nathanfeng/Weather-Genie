import React, {Component} from 'react';
import {Display} from './display';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input:"",
      zip: null,
      name: '',
      date: "",
      overall: "",
      high: "",
      low: "",
      description: "",
      display: false,
      error: null
    }
  }

  getWeather = async(e) => {
    try {

      e.preventDefault();
      const apiKey = 'e3a1749804c89b9e21f619ff49798188';
      const url = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.input},us&units=imperial&appid=${apiKey}`;
      const info = await fetch(url);
      const response = await info.json();

      const date =  new Date().toLocaleString();
      this.setState({
        date,
        name: response.name,
        overall: response.main.temp,
        high: response.main.temp_max,
        low: response.main.temp_min,
        description: response.weather[0].description,
        input: "",
        display: true,
        error: null
      })
    } catch(err) {
      this.setState({
        error: "Make sure you enter a valid zipcode!"
      })
    }
  }


  onFieldChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    this.setState({
      input
    });
  }

  render() {
    const {name, zip, date, overall, high, low, description} = this.state;
    return (
      <div>
        <p>Please enter the zipcode for the area you would like to see the weather for:</p>

        <form onSubmit={this.getWeather}>
          <input
            type='text'
            onChange={this.onFieldChange}
            value={this.state.input}
            placeholder='Zipcode'
          />
          <button>Submit</button>
        </form>
        {this.state.display && !this.state.error && <Display
          zip={zip}
          name={name}
          date={date}
          overall={overall}
          high={high}
          low={low}
          description={description}
        />}
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    )
  }
}

export default Form;
