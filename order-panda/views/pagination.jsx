import React from "react";

const Pagination=(props)=>{
    console.log(props);
    return (<>
    <head>
        <link rel="stylesheet" type='text/css' href="/../css/product.css"/>
    </head>
    <body>
    <div className='pagination'>
    {props.hasprevpage &&
     <a href={`${props.selectpage}?page=${props.prevpage}`}>{props.prevpage}</a>
    }
     {props.currentpage !=1 &&  
       <a href={`${props.selectpage}?page=${props.currentpage}`}>{props.currentpage}</a>
    }
    {props.hasnextpage && <a href={`${props.selectpage}?page=${props.nextpage}`}>{props.nextpage}</a>}
    {props.lastpage !== props.currentpage && props.nextpage !== props.lastpage &&
       <a href={`${props.selectpage}?page=${props.lastpage}`}>{props.lastpage}</a>
    }
   </div> 

   </body></>);
}
module.exports=Pagination;