import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import authStore from './stores/authStore';
import { observer } from 'mobx-react';

const App = observer(() => {
   const routes = useRoutes(authStore.isAuth);

   return (
      <div className='App'>
         <Router>{routes}</Router>
      </div>
   );
});

export default App;
