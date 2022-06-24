import React from "react";
const Productdetail=(props)=>{
  return(<>
  <head>
      <link rel="stylesheet" href="../css/product.css"/>
  </head>
  <body>
    <div className="post-detail">
     <p className="post-heading">Post detail</p>
      <div className="image-detail">
         <img src={`../images/${props.product.imageurl}`}     alt={props.product.name} className='prode-image'/>
      </div>
      <div>
              <div><p>Product Name: {props.product.name}	&nbsp;	&nbsp;	&nbsp;Price:{props.product.price}&#36;</p></div>
      </div>
    </div>
  </body>
  </>)
}
module.exports=Productdetail;