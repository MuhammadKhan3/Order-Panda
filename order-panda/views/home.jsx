import React from "react";
const Menu=require('./menu');
const Home=(props)=>{

    // <form action="">
    //     <button >Submit</button>
    // </form>
    return(
    <>
        <head>
            <link rel="stylesheet" href="./css/main.css"/>
        </head>
        <title>Home</title>
         <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
    </>)
}
module.exports=Home;