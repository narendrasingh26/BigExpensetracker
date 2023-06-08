import {Route} from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "./component/store/auth-context";
import Home from "./component/Home";
import Login from "./component/Login";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    
      <div className="App">
        <Route path='/login'>
        {!authCtx.isLoggedIn&&(<Login/>)}
        </Route>
        
        
          
          {authCtx.isLoggedIn&&(<Home/>)}
        
      </div>
    
  );
}

export default App;
