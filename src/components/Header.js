import React, { Component } from "react";

class Header extends Component {
  render() {
    const projectOptions = this.props.projects.map((project) => (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ));

    return (
      <div className="project-item">
        Project:
        <select
          className="project-menu"
          onChange={this.props.onCurrentProjectChange}
        >
          {projectOptions}
        </select>
      </div>
    );
  }
}

export default Header;
