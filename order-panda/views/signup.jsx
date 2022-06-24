import React from "react";
const Menu=require('./menu');

const Signup=(props)=>{

    return(<>
    <head>
     <link rel="stylesheet" href="./css/main.css"/>
    </head>
    <body>
    <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
        <form method="POST" className="form-container" action="/signup">
            <fieldset>
                <legend>Signup</legend>
                <label className="heading">Name</label><br/>
                <input type='text' name='name' id='name'/><br/>
                <label className="heading">Email</label><br/>
                <input type='text' name='email' id='email'/><br/>
                <label className="heading">Phone No</label><br/>
                <input type='number' name='phoneno' id='phoneno'/><br/>
                <label htmlFor="password" className="heading">Password</label><br/>
                <input type='password' name='password' id='password' autoComplete="On"/><br/>
                <label className="heading">Confirm Password</label><br/>
                <input type='password' name='confirmPassword' id='confirmPassword' autoComplete="On"/><br/>
                <input type='hidden' name="_csrf" value={props.csrfToken}/>
                <button type="submit">Submit</button>
                <button type="button" ><a href="/login" className="log-red"> Login</a></button>
            </fieldset>
        </form>
    </body>
    </>)
}
module.exports=Signup;