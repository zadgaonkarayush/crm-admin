import './App.css';
import Login from './auth/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customer from './pages/Customer';
import Users from './pages/Users';
import CreateProduct from './pages/add/CreateProduct';
import ProductView from './pages/view/ProductView';
import EditProduct from './pages/edit/EditProduct';
import ViewOrder from './pages/view/ViewOrder';
import AddCustomer from './pages/add/AddCustomer';
import ViewCustomer from './pages/view/ViewCustomer';
import EditCustomer from './pages/edit/EditCustomer';
import ProtectedRoute from './routes/ProtectedRoutes';
import AddUser from './pages/add/AddUser';
import Logs from './pages/Logs';
function App() {
  return (
    <Router>
      <Routes>
           <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path='/login' element={<Login />} />
         <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path='/products'
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path='/orders'
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/customers'
            element={
              <ProtectedRoute>
                <Customer />
              </ProtectedRoute>
            }
          />
          <Route
            path='/users'
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path='/products/add'
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='/products/view/:id'
            element={
              <ProtectedRoute>
                <ProductView />
              </ProtectedRoute>
            }
          />
          <Route
            path='/products/edit/:id'
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='/orders/view/:id'
            element={
              <ProtectedRoute>
                <ViewOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path='/customers/view/:id'
            element={
              <ProtectedRoute>
                <ViewCustomer />
              </ProtectedRoute>
            }
          />

          <Route
            path='/customers/edit/:id'
            element={
              <ProtectedRoute>
                <EditCustomer />
              </ProtectedRoute>
            }
          />
           <Route
            path='/customers/add'
            element={
              <ProtectedRoute>
               <AddCustomer />
              </ProtectedRoute>
            }
          />
           <Route
            path='/users/add'
            element={
              <ProtectedRoute>
               <AddUser />
              </ProtectedRoute>
            }
          />
          <Route 
          path='/logs'
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
          
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
