import React from 'react';
const Menu=require('./menu');
const Pagination=require('./pagination')

const Admin=(props)=>{
  return (<>
        <head>
            <link rel="stylesheet" href="./css/product.css"/>
        </head>
        <title>Products</title>
        <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
        <body>
        {props.product.length>0 ?         
            props.product.map(product=>{
             return <div className='post-container'>
                   <div className='image-container' >
                     <img src={`images/${product.imageurl}`} alt='teaimage' className='image'/>
                   </div>
                   <div className='imagetext-container' >
                       <p>{product.name}  <span><b>{product.price}</b></span></p>
                      <form method="POST" className='form1' action='/adminproducts-edit'>
                         <input type='hidden' name='id' value={product.id} /> 
                         <input type='hidden' name='_csrf' value={props.csrfToken} />
                         <button type='submit'>Edit</button>
                       </form>
                       <form method='POST' className='form2' action='/adminproduct-delete' >
                         <input type='hidden' name='id' value={product.id} />
                         <input type='hidden' name='_csrf' value={props.csrfToken} />
                         <button type='submit'>Delete</button>
                       </form>
                   </div>
                   </div>
            })
         
         :<center><h1 className='heading1'>No Admin Products</h1></center>}
           <Pagination nextpage={props.nextpage} prevpage={props.prevpage}
          hasnextpage={props.hasnextpage} hasprevpage={props.hasprevpage} currentpage={props.currentpage} lastpage={props.lastpage} selectpage="adminproducts"/>        
        </body>
  </>);
}
module.exports=Admin;