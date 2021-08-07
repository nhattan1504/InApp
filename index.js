const express= require('express');
const mongoose= require('mongoose')
const app= express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());require('dotenv').config();
app.use(cookieParser());
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {cronjob}=require('./Cronjob/birthday.cronjob');
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log('MongoDB Connected…');
	})
	.catch((err) => console.log(err));
//router require
const authRouter= require('./routes/auth.routes');
const adminRouter=require('./routes/admin.routes');
const superRouter=require('./routes/supervisor.routes');
app.use('/api/auth',authRouter);
app.use('/api/admin',adminRouter);
app.use('/api/supervisor',superRouter);
const options = {
	explorer: true
};
cronjob();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
const port=3000;
app.listen(port,()=>{
    console.log("Listen at port",port);
})