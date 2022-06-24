import React from 'react'
const Menu=require('./menu');

const Cart=(props)=>{
  return (<>
        <head>
            <link rel="stylesheet" href="./css/cart.css"/>
        </head>
        <title>Cart</title>
        <body>
             <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
             {props.product.length>0 ?
             <>
              <ul className='mainlist'>
               {props.product.map(product=>{
                  return <div className='list-container2'><li className='prodlist'><span>Product name: {product.name}</span>	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;<span>Quantity:{product.cartitem.quantity}</span> <form className='deleteform' method='POST' action='/deletecart' ><input type='hidden' name='_csrf' value={props.csrfToken}/><input type='hidden' name='productid' value={product.id}/> <button type='submit' className='redbtn'>Delete</button></form></li></div>
               })}
              </ul>

              <form action='/createorder' method='POST'>
                        <input type='hidden' name='_csrf' value={props.csrfToken}/>
                         <button type='submit' className='center-btn'>Order</button>
              </form>
             
             </>:<center><h1 className='main'>no cart items</h1></center>}
        </body>

  </>);
}
module.exports=Cart;