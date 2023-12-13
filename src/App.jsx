import { Button } from "@chakra-ui/button"
import { Container } from "@chakra-ui/react"
import {Navigate,Routes,Route} from 'react-router-dom'
import PostPage from "./pages/PostPage"
import UserPage from "./pages/UserPage"
import Header from "./components/Header"
import Homepage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LogoutButton from "./components/LogoutButton"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import CreatePost from "./components/CreatePost"

function App() {
  const user = useRecoilValue(userAtom)
  console.log(user)
  return (
    <Container maxW="620px">
      <Header></Header>
      <Routes>
        <Route path="/" element={user? <Homepage/>: <Navigate to="/auth"/>}></Route>
        <Route path="/auth" element={!user? <AuthPage/>: <Navigate to="/"/>}></Route>
        <Route path="/update" element={user? <UpdateProfilePage/>: <Navigate to="/auth"/>}></Route>
        <Route path="/:username" element={<UserPage></UserPage>}/>
        <Route path="/:username/post/:pid" element={<PostPage></PostPage>}/>
      </Routes>
      {user && <LogoutButton></LogoutButton>}
      {user && <CreatePost></CreatePost>}
    </Container>
  )
}

export default App
