export default function solve(data){
  let {
    r,
    rTime,
    ta,
    tb,
    tOther,
    tValues,
    fValues
  } = data;

  const possibleTimes = new Set();
  const solutions = [];
  for(let c = 0; c < tOther.length; c++){
    for(let d = 0; d < tOther.length; d++){
      for(let e = 0; e < tOther.length; e++){
        let tc = tOther[c];
        let td = tOther[d];
        let te = tOther[e];
        possibleTimes.add(Math.max(ta+tc, td, tb+te));
        solutions.push({
          tc,
          td,
          te,
          T: Math.max(ta+tc, td, tb+te)
        });
      }
    }
  }

  const possibleProfits = {
    times: [],
    withoutR: [],
    withR: []
  };

  Array.from(possibleTimes).sort((a,b)=>(a-b)).forEach((time)=>{
    possibleProfits.times.push(time);
    possibleProfits.withoutR.push(fValues[tValues.indexOf(time)]);
    possibleProfits.withR.push(fValues[tValues.indexOf(time - rTime)] - r);
  });

  return {
    solutions,
    times: possibleProfits.times,
    withoutR: possibleProfits.withoutR,
    withR: possibleProfits.withR
  }

}