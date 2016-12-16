import React, { PropTypes } from 'react';
import Input from './Input';

const InputTable = ({ tValues, fValues, onChange, onAdd, onDel })=>{
  const tValuesContent = [<td key="name">T</td>].concat(tValues.map((value,i)=>(
    <td key={i}><Input label="" name={`tValues.${i}`} onChange={onChange} value={value} small required/></td>
  )));
  const fValuesContent = [<td key="name">F</td>].concat(fValues.map((value,i)=>(
    <td key={i}><Input label="" name={`fValues.${i}`} onChange={onChange} value={value} small/></td>
  )));
  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table table-condensed">
          <caption>
          </caption>
          <tbody>
          <tr>
            {tValuesContent}
          </tr>
          <tr>
            {fValuesContent}
          </tr>
          </tbody>
        </table>
      </div>
      <div className="col-md-6">
        {tValues.length && <button className="btn btn-default" type="button" onClick={onDel}>Удалить</button> || null}
      </div>
      <div className="col-md-6">
        <button className="btn btn-default pull-right" type="button" onClick={onAdd}>Добавить</button>
      </div>
    </div>
  )
};

InputTable.propTypes = {
  tValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  fValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDel: PropTypes.func.isRequired
};

export default InputTable;