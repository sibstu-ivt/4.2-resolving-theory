import React, { Component } from 'react';

import Input from './Input';
import InputTable from './InputTable';
import Solution from './Solution';
import solve from './solve';


class Page extends Component {
  constructor (props, context){
    super(props, context);

    this.state = {
      r:0,
      rTime: 0,
      ta: 0,
      tb: 0,
      tOther: [0,0,0],
      tValues: [0,0,0],
      fValues: [0,0,0],
      solved: false
    };

    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDel = this.onDel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onAdd(){
    const { tValues, fValues } = this.state;
    this.setState({
      tValues: [...tValues].concat(0),
      fValues: [...fValues].concat(0)
    });
  }
  onDel(){
    const { tValues, fValues } = this.state;
    this.setState({
      tValues: tValues.slice(0, -1),
      fValues: fValues.slice(0, -1)
    });
  }
  onChange(e){
    const newState = {...this.state};
    const keyPath = e.target.name.split('.');
    const last =  keyPath.pop();
    keyPath.reduce((object, keyPart)=>{
      return object[keyPart];
    }, newState)[last] = Number(e.target.value) || 0;
    this.setState({...newState, solved: false});
  }
  onSubmit(e){
    e.preventDefault();
    this.solve();
  }
  solve(){
    this.setState({solved: true, solution: solve(this.state)});
  }

  renderSolution(){
    if (!this.state.solved) return null;
    return <Solution {...this.state}/>;
  }
  render(){
    const { state, onChange, onAdd, onDel, onSubmit } = this;
    return (
      <div className="container">
        <div className="row">
            <form onSubmit={onSubmit}>
              <div className="col-md-6">
              <Input name="ta" value={state.ta} onChange={onChange} label={<span>t<sub>a</sub></span>} required/>
                <Input name="tb" value={state.tb} onChange={onChange} label={<span>t<sub>b</sub></span>} required/>
              <div className="form-inline">
                <div><label><span>t<sub>c,d,e</sub></span></label></div>
                <Input name="tOther.0" value={state.tOther[0]} onChange={onChange} label="" required/>
                <Input name="tOther.1" value={state.tOther[1]} onChange={onChange} label="" required/>
                <Input name="tOther.2" value={state.tOther[2]} onChange={onChange} label="" required/>
              </div>
              </div>
              <div className="col-md-6">
              <div className="form-group">
                <InputTable tValues={state.tValues}
                            fValues={state.fValues}
                            onChange={onChange}
                            onAdd={onAdd}
                            onDel={onDel}/>
              </div>
              <div className="form-inline">
                <Input name="r" value={state.r} onChange={onChange} label="R" required/>
                <Input name="rTime" value={state.rTime} onChange={onChange} label="Time for R" required/>
              </div>
              <div className="form-group">
                <button className="btn btn-default" type="submit">Solve</button>
              </div>
              </div>
            </form>
          <div>
            {this.renderSolution()}
          </div>
        </div>
      </div>
    )
  }
}

export default Page;