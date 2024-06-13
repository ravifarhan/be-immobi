const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const departmentRouter = require('./src/routes/departmentRouter');
const positionRouter = require('./src/routes/positionRouter');
const employeeRouter = require('./src/routes/employeeRouter');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())
app.use(express.json());

app.use('/api', departmentRouter);
app.use('/api', positionRouter);
app.use('/api', employeeRouter);



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
