
import 'antd/dist/antd.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import PostScreen from './screens/PostScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Header from './components/Header';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import FriendProfileScreen from './screens/FriendProfileScreen';
import MessageScreen from './screens/MessageScreen';
import ChatScreen from './screens/ChatScreen';
function App() {
  return (
    <div className="App">
    <Router>
      <Header/>
      <main>
    <Routes>
    <Route path='/' element={<PostScreen/>} exact />
    <Route path='/login' element={<LoginScreen/>} exact />
    <Route path='/register' element={<RegisterScreen/>} exact />
    <Route path='/profile' element={<ProfileScreen/>} exact />
    <Route path='/editProfile' element={<EditProfileScreen/>} exact />
    <Route path='/friendsProfile/:uid' element={<FriendProfileScreen/>} exact />
    <Route path='/messages' element={<MessageScreen/>} exact />
    <Route path='/message/:rid/:runame' element={<ChatScreen/>} exact />
    </Routes>
    </main>
    </Router>
    </div>
  );
}

export default App;
