import './App.css';
import Layout from './components/shared/Layout';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import { AuthContextProvider } from './components/shared/AuthContext';
import AdminUI from './pages/AdminUi/AdminUI';
import ProtectedRoute from './components/shared/ProtectedRoute';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route
              path="/login"
              element={
                <ProtectedRoute accessBy="non-authenticated">
                  <Login />
                </ProtectedRoute>
              }></Route>
            <Route
              path="/admin-ui"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <AdminUI />
                </ProtectedRoute>
              }></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
