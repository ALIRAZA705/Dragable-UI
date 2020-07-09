import React, { Component } from 'react'
const Initialdata ={
tasks:{
'task1':{id:'task-1',content:'tasks of ali'},
'task2':{id:'task-2',content:'tasks of raza'},
'task3':{id:'task-3',content:'tasks of mobeen'},


},
columns:{
'column-1':{

    id:'column-1',
    title:'TO do',
    tasksIds:['tasks-1','tasks-2','tasks-3']
},

},

columnOrder:['column-1']
};
export default Initialdata