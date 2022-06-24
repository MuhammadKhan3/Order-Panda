import React from 'react';
const Menu=require('./menu')
const Pagination=require('./pagination');

const Gallery=(props)=>{
  return (<>
        <head>
            <link rel="stylesheet" href="./css/product.css"/>
        </head>
        <title>Gallery</title>
           <Menu islogin={props.islogin} csrfToken={props.csrfToken}/>
        <body>
        {props.products.length>0 ?         
            props.products.map(product=>{
             return <div className='post-container'>
                         <div className='image-container'>
                            <img src={`pictures/${product.image}`} alt='teaimage' className='image'/>
                         </div>
                    </div>
            })
         
         :<center><h1 className='heading1'>No Gallery images upload</h1></center>} 
         <Pagination nextpage={props.nextpage} prevpage={props.prevpage}
          hasnextpage={props.hasnextpage} hasprevpage={props.hasprevpage} currentpage={props.currentpage} lastpage={props.lastpage} selectpage="galleries"/>
        </body>
  </>);
}
module.exports=Gallery;