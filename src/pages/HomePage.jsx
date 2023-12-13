import { Link } from 'react-router-dom'
import { Flex} from '@chakra-ui/layout'
import { Button, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import useShowToast from '../hooks/useShowToast.js'
import { useState } from 'react'
import Post from '../components/Post.jsx'

const Homepage=()=>{
    const showToast = useShowToast()
    const [posts,setPosts]= useState([])
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const getFeedPosts = async()=>{
            try {
                setLoading(true)
                const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (!res.ok) {
					showToast("Error", data.error, "error");
					return;
				}
                setPosts(data)
            } catch (error) {
                showToast("Error",error.message,"error")
            } finally {
                setLoading(false)
            }
        }
        getFeedPosts()
    },[showToast])
    return (
        <>
        {loading && (
           <Flex justify={"center"}>
            <Spinner size={"xl"}></Spinner>
           </Flex>
        )}
        {!loading && posts.length===0 && <h1>Follow some users to see the feed</h1>}
        {posts.map((post)=>(
            <Post key={post._id} post={post} postedBy={post.postedBy}/>
        ))}
        </>
    )
}
export default Homepage;