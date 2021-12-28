import logo from './logo.svg';
import AgGrid from './pages/ag-gridPage/ag-grid.page';
import ProductDetails from './pages/productDetailPage/productDetail';
import FormikExample from './pages/formikeample/formikExample';
import FormikComponent from './pages/formilkComponent/formikComponent.component';
import FormikForm from './pages/formikForm/formikForm.component';
import Index from './pages/index';
import { Route,Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
          
          <Route path='/AG-Grid' component={AgGrid}/>
          <Route path='/product/:id' component={ProductDetails}/>
          <Route path='/Formik-Example1' component={FormikExample}/>
          <Route path='/Formik-Component' component={FormikComponent}/>
          <Route path='/formikForm' component={FormikForm}/>
          <Route path='/' component={Index}/>
      </Switch>
    </div>
  );
}

export default App;
