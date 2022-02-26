import './App.css';
import ListTable from "./components/list";

function App() {
  const { REACT_APP_API_AUTHORIZATION } = process.env;
  console.log(`REACT_APP_API_AUTHORIZATION = ${REACT_APP_API_AUTHORIZATION}`);

  return (
    <div className="main">
      <h2 className="main-header">Bot Manager</h2>
      <div>
        <ListTable />
      </div>

    </div>
  );
}

export default App;
