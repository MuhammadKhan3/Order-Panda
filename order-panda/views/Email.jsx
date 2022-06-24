import React from 'react'
const Menu=require('../views/menu');
const Email=(props)=>{
    return(<>
    <head>
        <link rel='stylesheet' href='./css/email.css' />
    </head>
    <body>
       <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
        <form className='email-form' method='POST' action='/email'>
            <fieldset>
                <legend>Email Form</legend>
                <label>Email Send To</label><br/>
                <input type='email' id='email' name='email' /><br/>
                <label>Subject</label><br/>
                <input type='text' id='subject' name='subject'/><br/>
                <label>Text</label><br/>
                <input type='text' id='text' name='text'/><br/>
                <input type='hidden' name='_csrf' value={props.csrfToken} />
                <button type='submit' >Send Email</button>
            </fieldset>
        </form>
    </body>
    </>
    );
}
module.exports=Email;