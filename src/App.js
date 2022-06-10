import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import ListaContatos from './components/pages/ListaContatos'
import InserirContato from './components/pages/InserirContato'
import EditarContato from './components/pages/EditarContato'



export default function App() {
  return (

    <Router>

      <Switch>
      
        <Route exact path="/">
          <ListaContatos />
        </Route>
        <Route path="/adicionar">
          <InserirContato />
        </Route>
        <Route path="/editarContato/:id">
          <EditarContato />
        </Route>
    
      </Switch>

    </Router>
    
    

  )
  
}
