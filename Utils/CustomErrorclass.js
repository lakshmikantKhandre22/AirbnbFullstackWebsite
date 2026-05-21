class CustomErrorclass extends Error {
    constructor(statuscode,message){
        super();  //calling the parent class constructor i.e Error Class 
        this.statuscode=statuscode;
        this.message=message;

    }
}
module.exports=CustomErrorclass;
//exporting custom error class to use for error handling 

