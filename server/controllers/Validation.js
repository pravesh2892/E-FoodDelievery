/**
 * Created by Academy
 */

//Create a Validation method
const validationErrors = (err,data) => {
    if (err) {
        if (err.name == 'ValidationError') {
            for (field in err.errors) {
                if(err.errors[field].kind == "required"){
                    return `Please enter ${err.errors[field].path}`
                }
                else if(err.errors[field].kind == "Number"){
                    return `${err.errors[field].path} must be a ${err.errors[field].kind}`
                }
            }
        }
    }
    else{
        return data
    }
}
//Capture any schema validation errors
//Check the error type and 
//Return a meaningfull message that the user will be able to understand 
module.exports={validationErrors}
