import React, { useState } from 'react'
import SignupCard from '../components/SignupCard'
import LoginCard from '../components/Login'
import { useRecoilValue } from 'recoil'
import authScreenatom from '../atoms/authAtom'

const AuthPage = () => {
const authScreenState = useRecoilValue(authScreenatom);
// const [value, setValue] = useState("login")

  return (
    <>
    {authScreenState==="login" ? <LoginCard/> :<SignupCard/>}
    </>
  )
}

export default AuthPage