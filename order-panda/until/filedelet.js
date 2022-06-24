const fs=require('fs');

const deletefile=(filepath)=>{
    console.log(filepath)
 fs.unlink(filepath,err=>{
    if(err){
        console.warn(err);
    }
 });
}
exports.deletefile=deletefile;