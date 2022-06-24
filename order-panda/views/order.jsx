import React from 'react'
const Menu=require('./menu');

const Order=(props)=>{
  return (<>
        <head>
            <link rel="stylesheet" href="./css/cart.css"/>
        </head>
        <title>Order</title>
        <body>
             <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
            <ul className='mainlist'>
              {props.product.map((product,index)=>{

                  return  <> 
                          {product.products.map(pro=>{
                             return (<div className='list-container2'>
                                          <li className='prodlist'>
                                              <h3>{product.id}</h3>       <span>Product name: {pro.name}</span>	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;<span>Quantity:{pro.orderitem.quantity}</span>
                                              <button><a href={`invoice/${product.id}`} >Invoice</a></button> 
                                              {/* <form  action={`invoice/${product.id}`} method="GET" ><input type='hidden' name='_csrf' value={props.csrfToken}/><button><a href={`/invoice/${product.id}`}> Invoice</a></button></form> */}
                                              {/* <form className='deleteform' method='POST' action='/deletecart' ><input type='hidden' name='_csrf' value={props.csrfToken}/><input type='hidden' name='productid' value={product.id}/> <button type='submit' className='redbtn'>Delete</button></form> */}
                                          </li>
                                    </div>)
                        })}
                        </>
               })}
              </ul>
        </body>

  </>);
}
module.exports=Order;