import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ListTable from "./components/list";
import JsonEditorPage from './pages/JsonEditorPage';
import { useTitle } from './utils/reactUtils';

// TODO: see why the hell is the react app mounting twice when on development
function App() {
  useTitle('Bot Manager');
  return (
    <Router>
      <div className="main">
        <nav className="main-nav">
          <Link to="/bot-manager-react" className="nav-link">Home</Link>
          <Link to="/json-editor" className="nav-link">JSON Editor</Link>
        </nav>
        <Routes>
          <Route path="/bot-manager-react" element={
            <>
              <h2 className="main-header">Bot Manager Pro</h2>
              <div>
                <ListTable />
              </div>
            </>
          } />
          <Route path="/json-editor" element={<JsonEditorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
