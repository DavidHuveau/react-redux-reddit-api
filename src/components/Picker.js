import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props;

    return (
      <Fragment>
        <p>{value}</p>
        <select onChange={e => onChange(e.target.value)} value={value}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </Fragment>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};