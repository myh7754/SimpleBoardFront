import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Test from './components/Test'
import Posts from './components/Post/Posts';
import PostSave from './components/Post/PostSave';
import Login from './components/Login'
import Signup from './components/Signup'
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './utils/ProtectRoute';
import PostDetail from './components/Post/PostDetail'
import PostUpdate from './components/Post/PostUpdate';
// import TESTHOME from './components/';

function App() {


  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Test />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/posts/:postId" element={<PostDetail />} />
              <Route path="/posts" element={<Posts />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/posts/new" element={<PostSave />} />
                <Route path="/posts/update" element={<PostUpdate />} />

              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
