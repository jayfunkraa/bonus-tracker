import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
      <Route component={Home} path='/' exact={true}/>
    </Router>
  );
}

export default App;
