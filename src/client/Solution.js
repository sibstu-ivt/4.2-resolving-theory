import React, { PropTypes } from 'react';

import Table from './Table';

const order = ['tc', 'td', 'te', 'T'];

function getSolutionWithOptimistic({withR, withoutR}){
  if (withoutR[0] === withR[0]) return 'Не имеет значения';
  if (withoutR[0] > withR[0]) return 'Приоритетнее без привлечения доп.капитала';
  return 'Приоритетнее с привлечением доп.капитала';
}

function getSolutionWithGarant({withR, withoutR}){
  const minWithout = Math.min.apply(Math, withoutR);
  const minWith = Math.min.apply(Math, withR);
  const indexesWithout = withoutR.reduce((res, v, i)=>{
    if (v === minWithout) res.push(i);
    return res;
  }, []);
  const indexesWith = withR.reduce((res, v, i)=>{
    if (v === minWith) res.push(i);
    return res;
  }, []).filter(v=>indexesWithout.some(vWithout=>vWithout===v));
  if (indexesWith === 0) return 'Невозможно применить принцип';
  if (withoutR[indexesWith[0]] === withR[indexesWith[0]]) return 'Не имеет значения';
  if (withoutR[indexesWith[0]] > withR[indexesWith[0]]) return 'Приоритетнее без привлечения доп.капитала';
  return 'Приоритетнее с привлечением доп.капитала';
}

function getSolutionWithBaies({withR, withoutR, times, solutions}){
  let counts = solutions.map(s=>s.T).reduce((result, value)=>{
    result[value] = result[value] + 1 || 1;
    return result;
  },{});
  let all = solutions.length;

  let weightWithout = times.reduce((result, time, i)=>{
    return result + withoutR[i]*counts[time]/all
  }, 0);
  let weightWith = times.reduce((result, time, i)=>{
    return result + withR[i]*counts[time]/all
  }, 0);
  if (weightWithout === weightWith) return 'Не имеет значения';
  if (weightWithout > weightWith) return 'Приоритетнее без привлечения доп.капитала';
  return 'Приоритетнее с привлечением доп.капитала';
}

const Solution = (props)=>(
  <div className="col-md-12">
    <div className="row">
      <div className="col-md-6">
        <Table className="table table-bordered table-condensed"
               head={order}
               body={props.solution.solutions.map(line=>order.map(v=>line[v]))}/>
      </div>
      <div className="col-md-6">
        <Table className="table table-bordered"
               head={['', ...props.solution.times]}
               body={[
                 ['Без доп.капитала', ...props.solution.withoutR],
                 ['С доп.капиталом', ...props.solution.withR]
               ]}/>
        <h4>Принцип оптимистичности</h4>
        <p>
          {getSolutionWithOptimistic(props.solution)}
        </p>
        <h4>Принцип Байеса</h4>
        <p>
          {getSolutionWithBaies(props.solution)}
        </p>
        <h4>Принцип гарантированных оценок</h4>
        <p>
          {getSolutionWithGarant(props.solution)}
        </p>
      </div>
    </div>
  </div>
);

Solution.propTypes = {
};

export default Solution;