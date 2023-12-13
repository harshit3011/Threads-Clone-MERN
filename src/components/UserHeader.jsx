import React, { useState } from 'react'
import { VStack,Flex,Box,Link,Text} from '@chakra-ui/layout'
import { Avatar} from '@chakra-ui/avatar'
import { Menu,MenuButton,MenuItem,MenuList } from '@chakra-ui/menu'
import { Portal } from '@chakra-ui/portal'
import { useToast } from '@chakra-ui/toast'
import {BsInstagram} from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import useShowToast from "../hooks/useShowToast.js"
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom.js'
import { Button } from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

const UserHeader = ({user}) => {
  const toast = useToast()
  const currentUser = useRecoilValue(userAtom) //logged in
  const [following,setFollowing] = useState(user.user.followers.includes(currentUser?._id))
  const showToast = useShowToast()
  const [updating, setUpdating] = useState(false)
  const copyURL=()=>{
    const currentURL= window.location.href
    navigator.clipboard.writeText(currentURL).then(()=>{
      toast({
        title: 'Copied!',
        description: "Profile link Linked",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }
  const handleFollowUnfollow=async()=>{
    if(!currentUser){
      showToast("Error","Please login to follow","error")
      return
    }
    setUpdating(true)
    try {
      const res = await fetch(`api/users/follow/${user.user._id}`,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        }
      })
      const data = await res.json()
      if(!res.ok){
        showToast("Error", data.error, "error")
        return
      }
      if(following){
        showToast("Success",`Unfollowed ${user.user.name}`,"success")
        user.user.followers.pop()
      } else{
        showToast("Success",`Followed ${user.user.name}`,"success")
        user.user.followers.push(currentUser?._id)
      }
      setFollowing(!following)
      console.log(data)
    } catch (error) {
      showToast("Error", error, "error")
    }
    finally{
      setUpdating(false)
    }
  }
  return (
    <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"} >
            <Box>
                <Text fontSize={"2xl"}>{user.user.name}</Text>
                <Flex gap={2} alignItems={"center"}>
                  <Text fontSize={"sm"}>{user.user.username}</Text>
                  <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>threads.next</Text>
                </Flex>
            </Box>
            <Box>
                {user.user.profilePic && (
                  <Avatar 
                  name={user.user.name}
                  src={user.user.profilePic}
                  size={'xl'}
                  />
                )}
                {!user.user.profilePic && (
                  <Avatar 
                  name={user.user.name}
                  src="https://bit.ly/broken-link"
                  size={'xl'}
                  />
                )}
            </Box>
        </Flex>
        <Text>{user.user.bio}</Text>
        {currentUser?._id === user.user._id && (
          <Link as={RouterLink} to='/update'>
            <Button size={"sm"}>Update Profile</Button>
          </Link>
        )}
        {currentUser?._id !== user.user._id &&
            <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>{following ? "Unfollow" : "Follow"}</Button>}
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.user.followers.length} Followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
          </Flex>
          <Flex>
            <Box className='icon-container'>
              <BsInstagram size={24} cursor={"pointer"}></BsInstagram>
            </Box>
            <Box className='icon-container'>
              <Menu>
              <MenuButton>              
              <CgMoreO size={24} cursor={"pointer"}></CgMoreO>
              </MenuButton> 
              <Portal>
              <MenuList bg={"gray.dark"}>
              <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
              </MenuList>
              </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>
        <Flex w={"full"}>
          <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={'pointer'}>
            <Text fontWeight={"bold"}>Threads</Text>
          </Flex>
          <Flex flex={1} borderBottom={"1.5px solid gray"} justifyContent={"center"} color={"gray.light"} pb={3} cursor={'pointer'}>
          <Text fontWeight={"bold"}>Replies</Text>
          </Flex>
        </Flex>
    </VStack>
  )
}

export default UserHeader