


const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.querySelector('button');
const numResults: number[] = [];
const textResults: string[] = [];

type NumOrString = number | string;
type Result = { val: number; timestamp: Date};

interface ResultObj{
  val: number;
   timestamp: Date
}


function add(num1: NumOrString, num2: NumOrString) {

  if(typeof num1 === 'number' && typeof num2 === 'number'){

    return num1 + num2;
  }else if( typeof num1 === 'string' && typeof num2 === 'string'){
    return num1 + ' ' + num2;
  }else{
    return +num1 + +num2;
  }
}

function printResult( resultObject : Result ){
  console.log(resultObject.val);
}

if(buttonElement){

  buttonElement.addEventListener('click', ()=>{
    const num1 = num1Element.nodeValue ?? "0";
    const num2 = num2Element.nodeValue ?? "0";
    const result = add(+num1, +num2);
    numResults.push(result as number);
  
    const stringResult= add(+num1, +num2);
    textResults.push(stringResult as string);
    printResult({val: result as number , timestamp: new Date()});
    console.log(numResults, textResults);
     
  });
}


const myPromise =  new Promise<string>((resolve, reject)=>{
  setTimeout(()=>{
    resolve('It Worked!');
  },1000);
  

});
myPromise.then((result) => {
  console.log(result.split('w'));
})

