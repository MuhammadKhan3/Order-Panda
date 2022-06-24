import React from "react";

const Menu=(props)=>{
    const clicktoggle=(e)=>{
        console.log('helo');

    }
    return(<> 
    <head>
        <link rel="stylesheet" href="./css/main.css"/>
    </head>
     <body>
        <div className="list-container">
            <div className="logo">
              <h1>Food Panda</h1>
            </div>
            <>
            {props.islogin &&
            <ul className="list">
                <li><a className="main-menu" href="/">Home</a><br/></li>
                <li><a className="main-menu" href="/product">Products</a><br/></li>
                <li><a className="main-menu" href="/addproduct">Add Product</a></li>
                <li><a className="main-menu" href="/cart">Cart</a></li>
                <li><a className="main-menu" href="/order">Order</a></li>
                <li><a className="main-menu" href="/email">Email</a></li>
                <li><a className="main-menu" href="/adminproducts">Admin</a> </li>
                <li><a className="main-menu" href="/Galleries">Gallery</a> </li>
                <li><a className="main-menu" href="/addimages">Add images </a> </li>
            </ul>
             }
            <div className="logout-container">
                {props.islogin ?  <form method="POST" action="/logout">
                    <input type='hidden' name="_csrf" value={props.csrfToken}/>
                    <button type="submit" className="log-btn">Logout</button>
                </form>:<form method="POST" action="/loginform">
                    <input type='hidden' name="_csrf" value={props.csrfToken}/>
                    <button type="submit" className="log-btn">Login</button>
                </form>}
            </div>
            </>
        </div>
    </body></>)
}
module.exports=Menu;