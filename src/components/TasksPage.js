import React, { Component } from 'react';
import TaskList from './TaskList';

class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewCardForm: false,
      title: '',
      description: ''
    };
  }

  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  resetForm() {
    this.setState({
      showNewCardForm: false,
      title: '',
      description: '',
    });
  }

  onCreateTask = (e) => {
    e.preventDefault();
    this.props.onCreateTask({
      title: this.state.title,
      description: this.state.description,
    });
    this.resetForm();
  }

  onChangeStatus = (id, status) => {
    this.props.onChangeStatus({ id, status });
  }

  toggleForm = () => {
    this.setState({ showNewCardForm: !this.state.showNewCardForm });
  }

  renderTaskLists() {
    const { tasks } = this.props;
    const onChangeStatus = this.onChangeStatus;

    return Object.keys(tasks).map(status => {
      const statusTasks = tasks[status];
      return <TaskList
               key={status}
               status={status}
               tasks={statusTasks}
               onChangeStatus={onChangeStatus} />;
    });
  }

  onSearch = e => {
    this.props.onSearch(e.target.value);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="tasks-loading">
          Loading...
        </div>
      );
    }
    return (
      <div className="tasks">
        <div className="task-header">
          <input onChange={this.onSearch} type="text" placeholder="Search..." />
          <button className="button button-default" onClick={this.toggleForm}>
            + New Task
          </button>
          {this.state.showNewCardForm && (
            <form className="task-list-form" onSubmit={this.onCreateTask}>
              <input className="full-width-input" onChange={this.onTitleChange} value={this.state.title} type="text" placeholder="title" />
              <input className="full-width-input" onChange={this.onDescriptionChange} value={this.state.description} type="text" placeholder="description" />
              <button className="button" type="submit">
                Save
              </button>
            </form>
          )}
        </div>
        <div className="tasks-lists">
          {this.renderTaskLists()}
        </div>
      </div>
    )
  }
}

export default TasksPage;