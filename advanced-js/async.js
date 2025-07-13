console.log('1');

let a=100;
let b=200;

console.log('2');
// let total = a+b;

const calcualate = (x,y)=>{
    /*
    let promiseVal = new Promise((resolve)=>{
            setTimeout(()=>{
                let total = x+y;
                resolve(total)
    },2000);

    })

console.log('Inside Calculate');
return promiseVal;
*/ return a+b;
}

// let promiseHandle = calcualate(a,b)
// promiseHandle.then(result=>{
//     console.log('Result::'+result);
    
// })

let totalVal = calcualate(a,b);
console.log('Result::'+ totalVal);

// console.log('Total::',totalVal)

console.log('End');