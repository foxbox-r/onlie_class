import {Switch,Route} from "react-router-dom"
import MainPage from "../pages/MainPage"
import ClassPage from "../pages/ClassPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ProfilePage from "../pages/ProfilePage"
import ClassAboutPage from "../pages/ClassAboutPage"; 

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/class" component={ClassPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/class/about/:classId" component={ClassAboutPage} />
      </Switch>
    </div>
  );
}

export default App;
