import './App.css';
import {Switch,Route} from 'react-router-dom';
import Login from './components/Login/Login';
import PrivateRouter from './components/privateroutes/Privaterouter';
import Layout from './components/Blog/Layout';

function App() {
  return (
    <>
   
        <Switch>
          <Route exact path='/' component={Login}/>
          <>
          <PrivateRouter exact path="/feed" component={Layout}></PrivateRouter>
          </>
        </Switch>
        
    </>
  );
}

export default App;
