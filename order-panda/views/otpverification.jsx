import React from "react";
const Menu=require('./menu');


const OTP=(props)=>{

    return(<>
        <head>
        <link rel="stylesheet" href="./css/main.css"/>
        </head>
        <body>
        <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
            <form method="POST" className="form-container form-sin" action="/verify">
                <fieldset>
                    <legend>Otp Verification</legend>
                    <label>Otp Code</label>
                    <input type='text' name="otp" id="otp"/>
                    <input type='hidden' name="_csrf" value={props.csrfToken}/><br/>
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
            <form method="POST" action="/resend" className="resend-btn form-sin">
            <input type='hidden' name="_csrf" value={props.csrfToken}/><br/>
                      <button type="submit">Resent It</button>
            </form>
        </body>
    </>);
}
module.exports=OTP;