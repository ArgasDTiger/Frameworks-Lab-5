const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/db');
const StudentsController = require('./controllers/StudentController');
const GroupController = require('./controllers/GroupController');

const app = express();
const port = 3000;

mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/students', StudentsController.getAllStudents);
app.post('/api/students', StudentsController.createStudent);
app.put('/api/students/:id', StudentsController.updateStudent);
app.delete('/api/students/:id', StudentsController.deleteStudent);

app.get('/api/groups', GroupController.getAllGroups);
app.post('/api/groups', GroupController.createGroup);
app.put('/api/groups/:id', GroupController.updateGroup);
app.delete('/api/groups/:id', GroupController.deleteGroup);

app.listen(port);
