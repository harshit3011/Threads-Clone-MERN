import React from 'react'
import { AddIcon } from "@chakra-ui/icons";
import { VStack,Flex,Box,Link,Text} from '@chakra-ui/layout'
import { Avatar} from '@chakra-ui/avatar'
import { Menu,MenuButton,MenuItem,MenuList } from '@chakra-ui/menu'
import { Portal } from '@chakra-ui/portal'
import { useToast } from '@chakra-ui/toast'
import {BsFillImageFill, BsInstagram} from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import useShowToast from "../hooks/useShowToast.js"
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom.js'
import { Button, CloseButton, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom';
import { useRef, useState } from "react";
import usePreviewImg from '../hooks/usePreviewimg.js';
import { Image } from '@chakra-ui/image'

const MAX_CHAR = 500;
const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText, setPostText] = useState("");
    const {handleImageChange, imgUrl, setImgUrl} = usePreviewImg()
    const imageRef = useRef(null);
    const showToast = useShowToast()
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const user = useRecoilValue(userAtom)
    const [loading, setLoading] = useState(false);
    const handleTextChange=(e)=>{
        const inputText = e.target.value;

		if (inputText.length > MAX_CHAR) {
			const truncatedText = inputText.slice(0, MAX_CHAR);
			setPostText(truncatedText);
			setRemainingChar(0);
		} else {
			setPostText(inputText);
			setRemainingChar(MAX_CHAR - inputText.length);
		}
    }
    const handleCreatePost=async()=>{
        setLoading(true)
        try {
			const res = await fetch("/api/posts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
			});

			const data = await res.json();
			if (!res.ok) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post created successfully", "success")
			onClose();
            setPostText("");
			setImgUrl("");
		} catch (error) {
			showToast("Error", error, "error");
		} finally {
			setLoading(false);
		}
    }
  return (
    <>
    <Button position={'fixed'} bottom={10} right={5} leftIcon={<AddIcon></AddIcon>}
				bg={useColorModeValue("gray.300", "gray.dark")}
				size={{ base: "sm", sm: "md" }} onClick={onOpen}>
        Post
    </Button>
    <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
                <Textarea placeholder='Post Content goes here' onChange={handleTextChange} value={postText}>
                </Textarea>
                <Text fontSize={'xs'} fontWeight={"bold"} textAlign={"right"} m={"1"} color={'gray.800'}>{remainingChar}/{MAX_CHAR}</Text>
                <Input type='file' hidden ref={imageRef} onChange={handleImageChange} ></Input>
                <BsFillImageFill 	style={{ marginLeft: "5px", cursor: "pointer" }}
								size={16}
								onClick={() => imageRef.current.click()}></BsFillImageFill>
            </FormControl>
            {imgUrl && (
                <Flex mt={5} w={"full"} position={"relative"}>
                    <Image src={imgUrl} alt='Selected img'></Image>
                    <CloseButton onClick={()=> {
                        setImgUrl("")
                    }} bg={'gray.800'} position={'absolute'} top={2} right={2}></CloseButton>
                </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost