import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from './assets/styles/GlobalStyle';
import SignIn from "./pages/SignInPage/SignInPage";
import SignUp from "./pages/SignUpPage/SignUpPage";
import Timeline from "./pages/Timeline";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/timeline' element={<Timeline />}/>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path="/users/:id" element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
