import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTask, editTask, fetchTasks, filterTasks } from './actions';
import TasksPage from './components/TasksPage';
import FlashMessage from './components/FlashMessage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }

  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  }

  onChangeStatus = ({ id, status }) => {
    this.props.dispatch(editTask({ id, status }));
  }

  onSearch = searchTerm => {
    this.props.dispatch(filterTasks(searchTerm))
  };

  render() {
    return (
      <div className="container">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main-content">
          <TasksPage
            tasks={this.props.tasks}
            onSearch={this.onSearch}
            onCreateTask={this.onCreateTask}
            onChangeStatus={this.onChangeStatus}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoading, error, searchTerm } = state.tasks;

  const tasks = state.tasks.tasks.filter(task => {
    return task.title.match(new RegExp(searchTerm, 'i'));
  });

  return { tasks, isLoading, error };
}

export default connect(mapStateToProps)(App);
