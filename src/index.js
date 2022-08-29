const express = require('express');
const app=express();
app.listen(1234);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use(require('./routes/routes'));
console.log('Server on port 1234');