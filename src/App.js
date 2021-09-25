import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createTask,
  editTask,
  filterTasks,
  fetchProjects,
  setCurrentProjectId,
} from "./actions";
import Header from "./components/Header";
import TasksPage from "./components/TasksPage";
import FlashMessage from "./components/FlashMessage";
import { getGroupedAndFilteredTasks } from "./selectors";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
    this.props.dispatch(setCurrentProjectId(1));
  }

  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };

  onChangeStatus = ({ id, status }) => {
    this.props.dispatch(editTask({ id, status }));
  };

  onSearch = (searchTerm) => {
    this.props.dispatch(filterTasks(searchTerm));
  };

  onCurrentProjectChange = (e) => {
    this.props.dispatch(setCurrentProjectId(Number(e.target.value)));
  };

  render() {
    return (
      <div className="container">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main-content">
          <Header
            projects={this.props.projects}
            onCurrentProjectChange={this.onCurrentProjectChange}
          />
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
  const { isLoading, error, items } = state.projects;

  return {
    tasks: getGroupedAndFilteredTasks(state),
    projects: items,
    isLoading,
    error,
  };
}

export default connect(mapStateToProps)(App);
