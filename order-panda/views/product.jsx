import React from 'react';
const Menu=require('./menu')
const Pagination=require('../views/pagination');

const Product=(props)=>{

  console.log(props.lastpage);
  console.log(props.hasnextpage);
  return (<>
        <head>
            <link rel="stylesheet" type='text/css' href="/../css/product.css"/>
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
                      <form method="POST" className='form1' action='/add-cart'>
                         <input type='hidden' name='id' value={product.id} /> 
                         <input type='hidden' name='_csrf' value={props.csrfToken} />
                         <button type='submit'>Add to cart</button>
                       </form>
                       <form  className='form2' action={'productdetails'+'/'+product.id} >
                         <input type='hidden' name='_csrf' value={props.csrfToken} />                         
                         <button><a className='detail-btn' href={'productdetails'+'/'+product.id}>Details</a></button>
                       </form>
                   </div>
                   </div>
            })
         :<center><h1 className='heading1'>No Products</h1></center>
         }
         <Pagination nextpage={props.nextpage} prevpage={props.prevpage}
          hasnextpage={props.hasnextpage} hasprevpage={props.hasprevpage} currentpage={props.currentpage} lastpage={props.lastpage} selectpage="product"/>
        </body>
  </>);
}
module.exports=Product;