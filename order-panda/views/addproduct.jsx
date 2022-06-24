import React from "react";
const Menu=require('./menu');

const addProduct=(props)=>{

    return(<>
    <head>
     <link rel="stylesheet" href="./css/main.css"/>
    </head>
    <body>
    <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
        <form method="POST" className="form-container" action="/addproduct" enctype="multipart/form-data"  >
            <fieldset>
                <legend>Add Product</legend>
                <label className="heading">Name</label><br/>
                <input type='text' name='name' id='name'/><br/>
                <label className="heading">price</label><br/>
                <input type='number' name='price' id='quantity'/><br/>
                <label className="heading">image</label><br/>
                <input type='file' name="image" id="image"/>
                <input type='hidden' name="_csrf" value={props.csrfToken}/>
                <button type="submit">Add Product</button>
            </fieldset>
        </form>
    </body>
    </>)
}
module.exports=addProduct;