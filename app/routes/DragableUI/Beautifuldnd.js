import React from 'react'
import ReactDOM from 'react-dom'
import initialdata from './Initialdata'
class Beautifuldnd extends React.Component{
state=initialdata
    render(){
        
        return this.state.columnOrder.map(columnId => {
const column=this.state.columns[columnId];
const tasks=column.taskIds.map(taskId => this.state.tasks[taskId]);
return column.title;

});


        
    }
}
export default Beautifuldnd