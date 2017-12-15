var asyncAdd = (a,b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(typeof a === 'number'&& typeof b === 'number'){
                resolve(a+b);
            }else{
                reject(`Please provide numbers`);
            }
        },2000);
    }); 
};



asyncAdd(10,20).then((res)=>{
    console.log(`Result ${res}`);
    //return asyncAdd(res,10);
}).then((res)=>{
     console.log(`${res}`);
}).catch((errorMessage)=>{
    console.log(errorMessage);
});



// var somePromise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         reject("Query was not successful!");
// },2500);
// });

// somePromise.then((message)=>{
//     console.log(`Success! ${message}`);
// }, (errorMessage) =>{
//     console.log(`Error! ${errorMessage}`);
// });


