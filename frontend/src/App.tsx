// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './component/LoginForm';
import Home from './pages/Home'; // You can create this next

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
