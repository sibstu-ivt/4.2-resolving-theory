import React, { PropTypes } from 'react';

const Table = ({ head, body, ...rest })=>(
  <table {...rest}>
    <thead>
    <tr>
      {head.map((header,i)=><th key={i}>{header}</th>)}
    </tr>
    </thead>
    <tbody>
    {body.map((line,i)=><tr key={i}>{line.map((value,i)=><td key={i}>{value}</td>)}</tr>)}
    </tbody>
  </table>
);

Table.propTypes = {
  head: PropTypes.array.isRequired,
  body: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default Table;