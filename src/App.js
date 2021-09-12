import logo from './logo.svg';
import AgGrid from './pages/ag-gridPage/ag-grid.page';
import ProductDetails from './pages/productDetailPage/productDetail';
import Index from './pages/index';
import { Route,Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
          
          <Route path='/AG-Grid' component={AgGrid}/>
          <Route path='/product/:id' component={ProductDetails}/>
          <Route path='/' component={Index}/>
      </Switch>
    </div>
  );
}

export default App;
