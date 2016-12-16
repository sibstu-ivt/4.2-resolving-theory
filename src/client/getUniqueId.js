
function* genenator(){
  let increment = 1;
  // eslint-disable-next-line no-constant-condition
  while(true){
    yield `${Date.now()}.${increment++}`;
    if (increment > Number.MAX_SAFE_INTEGER) increment = 1;
  }
}

const generatorInstance = genenator();

export default ()=>{
  return generatorInstance.next().value;
}