const isempty=string=>{
    if (string.trim()===""){
        return true
    }
    else{
        return false
    }
}
const isemail=string=>{
    const regex=/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}$/
    if (string.match(regex)){
        return true
    }
    else{
        return false
    }
}
exports.validatesign=data=>{
    let errors={}
    if(isempty(data.email)){
     errors.email="email must not be empty"
    }
    else if(!isemail(data.email)){
      errors.email="Enter a valid email"
    }
    if (isempty(data.password)){
        errors.password="enter password"
    }
    if(data.confirmpassword!==data.password){
       errors.confirmpassword="Password must match"
    }
    if (isempty(data.handle)){
        errors.handle="enter handle"
    }

    return {
        errors,
        valid:Object.keys(errors).length===0?true:false
    }
}
exports.validatelogin=data=>{
    let errors={}
    if (data.email.trim()===""){
        errors.email="Enter email"
    }
    else if(!isemail(data.email)){
        errors.email="Enter a valid email"
      }
      if (data.password.trim()===""){
        errors.password="Enter password"
    
    

    }
    return {
        errors,
        valid:Object.keys(errors).length===0?true:false
    }
}
exports.validatedetails=(data)=>{
    let details={}
    if (!isempty(data.bio.trim())){
        details.bio=data.bio
    }
    if (!isempty(data.location.trim())){
        details.location=data.location
    }
    if (!isempty(data.website.trim())){
        if (data.website.trim().substring(0,4)!=='http'){
            details.website=`http://${data.website}`
        }
        else{
            details.website=data.website
        }
    }
    return details

}