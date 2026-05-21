module.exports = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
        
        //if no error resolve the promise and if error occurs call to next() error handling middleware   
    };
}; 

//we can use this wrapasync to handle the asynchrnous errors without try catch 
 



