import React, { PropTypes } from 'react';
import classNames from 'classnames';

import getUniqueId from './getUniqueId';

const Input = ({ id = getUniqueId(), small = false, className = '', label, value, onChange, ...rest })=>(
  <div className={classNames({"form-group": !small})}>
    {!small && <label htmlFor={id}>{label}</label> || null}
    <input {...rest}
           id={getUniqueId()}
           className={classNames('form-control input-sm', className)}
           type="number"
           onChange={onChange}
           value={value}/>
  </div>
);

Input.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};

export default Input;