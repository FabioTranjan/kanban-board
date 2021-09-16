import React from 'react';
import { TASK_STATUSES } from '../constants';

const Task = props => {
  return (
    <div className="task">
      <div className="task-header">
        <div>{props.task.title}</div>
        <div>
          <select
            name="states"
            id="states"
            value={props.task.status}
            onChange={(e) => props.onChangeStatus(props.task.id, e.target.value)}
          >
            {TASK_STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      <hr />
      <div className="task-body">{props.task.description}</div>
    </div>
  );
}

export default Task;