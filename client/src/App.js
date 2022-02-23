import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';


// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache()
// })

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <SearchBooks/>
            </Route> 
          <Route exact path='/saved'>
            <SavedBooks/>
            </Route>
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
