import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import PostForm from '../components/PostForm'
import Spinner from '../components/Spinner'
import {getAllPosts} from '../features/posts/postSlice'
import {reset} from '../features/auth/authSlice'
import PostItem from '../components/PostItem'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {posts, isLoading, isError, message} = useSelector((state) => state.posts)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/')
    }

    dispatch(getAllPosts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  const content = posts.map(post => {
    const value = <PostItem key={post._id} post={post} canEdit={false} createdBy={post.createdBy}/>
    return value
  })

  return (
    <>
      <div className='heading'>
        <h2>View All Posts</h2>
        <p className='subheading'>New posts will appear at the top</p>
      </div>
      {content}
    </>
  )
}

export default Dashboard