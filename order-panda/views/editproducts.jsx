import React from "react";
const Menu=require('./menu');

const Edit=(props)=>{

    return(<>
    <head>
     <link rel="stylesheet" href="./css/main.css"/>
    </head>
    <body>
    <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
        <form method="POST" className="form-container" action="/admin-edit">
            <fieldset>
                <legend>Edit Products</legend>
                <label className="heading">Name</label><br/>
                <input type='text' name='name' id='name' value={props.product.name}/><br/>
                <label className="heading">price</label><br/>
                <input type='number' name='price' value={props.product.price} id='quantity'/><br/>
                <label className="heading">image</label><br/>
                <input type='text' name="imageurl" value={props.product.imageurl} id="imageurl"/>
                <input type='hidden' name="productid" id='productid' value={props.product.id}/>
                <input type='hidden' name="_csrf" value={props.csrfToken}/><br/>
                <button type="submit">Update</button>
            </fieldset>
        </form>
    </body>
    </>)
}
module.exports=Edit;