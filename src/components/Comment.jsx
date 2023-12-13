import React,{useState} from 'react'
import { VStack,Flex,Box,Link,Text} from '@chakra-ui/layout'
import { Avatar} from '@chakra-ui/avatar'
import { Menu,MenuButton,MenuItem,MenuList } from '@chakra-ui/menu'
import { Portal } from '@chakra-ui/portal'
import { useToast } from '@chakra-ui/toast'
import {BsInstagram, BsThreeDots} from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import { Image } from '@chakra-ui/image'
import { Button, Divider } from '@chakra-ui/react'
import Actions from '../components/Actions'

const Comment = ({reply, lastReply}) => {
    
  return (
    <>
        <Flex gap={4} py={2} my={2} w={"full"}>
            <Avatar src={reply.userProfilePic} size={"sm"}></Avatar>
            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={'sm'} fontWeight={"bold"}>{reply.username}</Text>
                </Flex>
                <Text>{reply.text}</Text>
            </Flex>
        </Flex>
        {!lastReply ? <Divider></Divider>:null}
    </>
  )
}

export default Comment