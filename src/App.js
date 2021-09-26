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
import { getGroupedAndFilteredTasks, getProjects } from "./selectors";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }

  onCreateTask = ({ title, description }) => {
    const projectId = this.props.currentProjectId;
    this.props.dispatch(createTask({ title, description, projectId }));
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
  const { isLoading, error } = state.projects;

  return {
    currentProjectId: state.page.currentProjectId,
    tasks: getGroupedAndFilteredTasks(state),
    projects: getProjects(state),
    isLoading,
    error,
  };
}

export default connect(mapStateToProps)(App);
