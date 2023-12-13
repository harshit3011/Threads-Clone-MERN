import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import { useToast } from '@chakra-ui/toast'
import { Button } from "@chakra-ui/button";
import {FiLogOut} from "react-icons/fi"

const LogoutButton = () => {
    const setUser=useSetRecoilState(userAtom)
    const toast = useToast()
    const handleLogout=async()=>{
        try {
            localStorage.removeItem("user-threads")
            const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
            if (!res.ok) {
                
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            setUser(null)
        } catch (error) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }
    return (
        <div><Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
            <FiLogOut size={20}></FiLogOut>
        </Button>
        </div>
    )
}

export default LogoutButton