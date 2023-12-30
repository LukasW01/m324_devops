import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);   
    this.state = {
      todos: typeof props.todos === 'undefined' ? [] : props.todos,
      isEditing: false,
      id: "",
      taskdescription: ""
    };
  }

  handleChange = event => {
    this.setState({ taskdescription: event.target.value });
  }

  componentDidMount() {
    fetch("http://localhost:8080")    
      .then(response => response.json())
      .then(data => {
        console.log("Receiving task list data from Spring-Server: ");
        console.log(data);
        this.setState({todos: data}); 
      })
      .catch(error => console.log(error))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sending task description to Spring-Server: " + this.state.taskdescription);
    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskdescription: this.state.taskdescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Receiving answer after sending to Spring-Server: ${data}`);
        this.setState({
          todos: [],
        }, () => {
          this.setState({
            todos: [...data], 
            taskdescription: ""
          });
        });
      })
      .catch((error) => console.log(error));
  };

  handleInputChange = (event, id) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, taskdescription: event.target.value };
      }
      return todo;
    });
    this.setState({ todos: newTodos });
  }

  handleDelete = (id) => {
    console.log("Sending task description to delete on Spring-Server: "+id);
    fetch(`http://localhost:8080/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
    .then((response) => response.json())
      .then((data) => {
        console.log(`Receiving answer after sending to Spring-Server: ${data}`);
        this.setState({
          todos: [],
        }, () => {
          this.setState({
            todos: [...data], 
            taskdescription: ""
          });
        });
      })
      .catch(error => console.log(error))
  }

  handleEdit = (id, taskdescription) => {
    console.log("Sending task description to edit on Spring-Server: "+id);
    fetch(`http://localhost:8080/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id, taskdescription: taskdescription })
    })
    .then((response) => response.json())
      .then((data) => {
        console.log(`Receiving answer after sending to Spring-Server: ${data}`);
        this.setState({
          todos: [],
        }, () => {
          this.setState({
            todos: [...data], 
            taskdescription: ""
          });
        });
      })
      .catch(error => console.log(error))
      this.setState({ editingTaskId: null });
  }


  renderTasks(todos) {
      return (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {this.state.editingTaskId === todo.id ? (
                <>
                  <input type="text" value={todo.taskdescription} onChange={(event) => this.handleInputChange(event, todo.id)} />
                  <button onClick={() => this.handleEdit(todo.id, todo.taskdescription)}>Save</button>
                </>
              ) : (
                <>
                  Task {todo.id} : {todo.taskdescription}
                  <button onClick={() => this.setState({editingTaskId: todo.id})}>Edit</button>
                </>
              )}
              <button onClick={() => this.handleDelete(todo.id)}>Done</button>
            </li>
          ))}
        </ul>
      );
    }  


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            ToDo Liste
          </h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.taskdescription}
              onChange={this.handleChange}
            />
            <button type="submit">Absenden</button>
          </form>
          <div>
            {this.renderTasks(this.state.todos)}
          </div>
        </header>
      </div>
    );
  }

}

export default App;
