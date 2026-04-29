import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Posts from './pages/Posts';
import EditPost from './pages/EditPost';
import Comments from './pages/Comments';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route
        path='/posts'
        element={
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        }
      />

      <Route
        path='/posts/new'
        element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        }
      />

      <Route
        path='/posts/:id/edit'
        element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        }
      />

      <Route
        path='/comments'
        element={
          <ProtectedRoute>
            <Comments />
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<Navigate to='/posts' />} />
    </Routes>
  );
}