// HW8 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]

console.log('React version:', React.version);
console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');

function TaskCard(props) {
  return (
    <div className={"task-card " + props.task.priority.toLowerCase()}>
      <span>{props.task.name}</span>
      <span className={"badge " + props.task.priority.toLowerCase()}>{props.task.priority}</span>
      <button onClick={() => props.onDelete(props.task.id)}>✕</button>
    </div>
  );
}

function TaskList(props) {
  if (props.tasks.length === 0) {
    return <p className="empty-state">No tasks yet — add one above!</p>;
  }
  return (
    <div>
      {props.tasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={props.onDelete} />
      ))}
    </div>
  );
}

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [taskName, setTaskName] = React.useState('');
  const [priority, setPriority] = React.useState('Medium');
  const [error, setError] = React.useState('');

  function addTask() {
    if (taskName.trim() === '') {
      setError('Task name cannot be empty.');
      return;
    }
    setError('');
    const newTask = { id: Date.now(), name: taskName.trim(), priority };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setPriority('Medium');
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function clearAll() {
    setTasks([]);
  }

  return (
    <div className="app-container">
      <h1>Quick Tasks</h1>
      <h2>{`${tasks.length} task${tasks.length === 1 ? '' : 's'}`}</h2>

      <div className="form-area">
        <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)} />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
        {error && <p className="error-message">{error}</p>}
      </div>

      <TaskList tasks={tasks} onDelete={deleteTask} />

      {tasks.length > 0 && <button onClick={clearAll}>Clear All</button>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);