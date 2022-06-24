import React from "react";
const Menu=require('./menu');

const NewPassword=(props)=>{
   
    return(<>
    <head>
     <link rel="stylesheet" href="./css/main.css"/>
    </head>
    <body>
    <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
        <form method="POST" className="form-container" action="/newpassword">
            <fieldset>
                <legend>Update Password</legend>
                <label className="heading">Password</label><br/>
                <input type='password' name='password' id='password'/><br/>
                <label htmlFor="password" className="heading">Confirm Password</label><br/>
                <input type='password' name='confirmpassword' id='confirmpassword' autoComplete="On"/><br/>
                <input type='hidden'  name="passwordtoken" id='passwortoken' value={props.passwordtoken}/>
                <input type='hidden'  name="userid" id='userid' value={props.userid}/>
                <input type='hidden' name="_csrf" value={props.csrfToken}/>
                <button type="submit">Update</button>
            </fieldset>
        </form>
    </body>
    </>)
}
module.exports=NewPassword;