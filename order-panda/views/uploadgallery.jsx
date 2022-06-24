import React from 'react';
const Menu=require('./menu');
const Upload=(props)=>{
    return(<>
    <head>
        <link rel="stylesheet" href="./css/main.css"/>
    </head>
    <title>Gallery</title>
    <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
    {props.islogin &&
        <form method='POST' action='/addimages' data-csrf={props.csrfToken} className="form-container" encType='multipart/form-data'>
        <label>Upload the pic</label>
        <input type='file' name='galleryimages' multiple/>
        <input type='hidden' name='_csrf' id='_csrf' value={props.csrfToken}/>
        <button type='submit'>Submit</button>
    </form>
    }
    </>);
}
module.exports=Upload;