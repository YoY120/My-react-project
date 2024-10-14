import {FC} from "react";
import { Route, Routes } from 'react-router-dom';
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";

const AuthPage: FC = () => {
  return (
    <Routes>
      AuthPage
      <Route path='SignIn' element={<SignIn/>}/>
      <Route path='SignUp' element={<SignUp/>}/>
    </Routes>
  )
}

export default AuthPage;
