import './App.css';
import ListTable from "./components/list";
import { useTitle } from './utils/reactUtils';

function App() {
  useTitle('Bot Manager');
  return (
    <div className="main">
      <h2 className="main-header">Bot Manager Pro</h2>
      <div>
        <ListTable />
      </div>

    </div>
  );
}

export default App;
