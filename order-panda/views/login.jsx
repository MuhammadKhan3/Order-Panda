import React from "react";
const Menu=require('./menu');

const Login=(props)=>{
   
    return(<>
    <head>
     <link rel="stylesheet" href="./css/main.css"/>
    </head>
    <body>
    <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
        <form method="POST" className="form-container" action="/login">
            <fieldset>
                <legend>Login</legend>
                <label className="heading">Email</label><br/>
                <input type='text' name='email' id='email'/><br/>
                <label htmlFor="password" className="heading">Password</label><br/>
                <input type='password' name='password' id='password' autoComplete="On"/><br/>
                <input type='hidden' name="_csrf" value={props.csrfToken}/>
                <button type="submit">Submit</button>
                <button type="button" ><a href="/signup" className="log-red"> Create a account</a></button>
                <button type="button"><a href="/reset">Reset</a></button>
            </fieldset>
        </form>
    </body>
    </>)
}
module.exports=Login;