const WorkList = ({ tasks = [], onEdit, onDelete }) => {
  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No data available</td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>
                  {task.photo ? (
                    <img
                      src={`http://localhost:5000/uploads/${task.photo}`}
                      alt="Employee"
                      width="50"
                      height="50"
                      style={{ borderRadius: '50%' }}
                    />
                  ) : (
                    'No photo'
                  )}
                </td>
                <td>{task.name}</td>
                <td>{task.position}</td>
                <td>{task.department}</td>
                <td>{task.email}</td>
                <td>
                  <button type="button" className="btn btn-primary" onClick={() => onEdit(task.id)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => onDelete(task.id)}>
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkList;