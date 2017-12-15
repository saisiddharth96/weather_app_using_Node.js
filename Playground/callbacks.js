var getuser = (id,callback)=>{

    var user ={
        id : id,
        name : 'siddharth'
    };
    setTimeout(()=>{
        callback(user);
    },3000);
    
};


getuser( 15,(user)=>{
    console.log(user);
});