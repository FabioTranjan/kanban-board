import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTask, changeStatus, fetchTasks } from './actions';
import TasksPage from './components/TasksPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }

  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  }

  onChangeStatus = ({ id, status }) => {
    this.props.dispatch(changeStatus({ id, status }));
  }

  render() {
    return (
      <div className="main-content">
        <TasksPage
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
          onChangeStatus={this.onChangeStatus}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App);
