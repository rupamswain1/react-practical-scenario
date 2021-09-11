import logo from './logo.svg';
import AgGrid from './pages/ag-gridPage/ag-grid.page';
import ProductDetails from './pages/productDetailPage/productDetail';
import { Route,Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path='/ag-grid' component={AgGrid}/>
          <Route path='/product/:id' component={ProductDetails}/>
      </Switch>
    </div>
  );
}

export default App;
