function errorHandler(err, req,res,next){
     console.error(err);
     res.status(500).send({
          message: 'Internal Server Error',
          error: err.message
     });

}

module.exports = errorHandler;