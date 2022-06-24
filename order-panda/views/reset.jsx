const Menu=require('../views/menu');
import React from "react";

const Reset=(props)=>{

    return <>
    <head>
        <link rel="stylesheet" href="./css/email.css"/>
    </head>
    <body>
        <Menu  islogin={props.islogin} csrfToken={props.csrfToken} />
        <form method='POST' action="/reset" className="email-form">
            <fieldset>
                <legend>Reset Password</legend>
                <label>email</label><br/>
                <input type='text' name="email" id="email"/>
                <input type='hidden' name="_csrf" value={props.csrfToken}/><br/>
                <button type="submit" >Reset</button>
            </fieldset>
        </form>
     </body>
    </>
}
module.exports=Reset;