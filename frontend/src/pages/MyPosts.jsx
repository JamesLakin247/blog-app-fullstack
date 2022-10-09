import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import PostForm from '../components/PostForm'
import Spinner from '../components/Spinner'
import {getPosts} from '../features/posts/postSlice'
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

    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  const id = user._id

    return (
        <>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <h2 className='subheading'>Posts Dashboard</h2>
            </section>
            <PostForm />
            <h2 className='subheading'>Your Previous Posts</h2>
            <section> {/* className='content' */}
                {posts.length > 0 ? 
                    (<div> {/* className='posts' */}
                    {posts.map(post => {
                        const content = id === post.user ? <PostItem key={post._id} post={post} canEdit={true} /> : null
                        return content
                    })}
                    </div>) : 
                    (<h3 className='no-posts-message'>You have not set any posts</h3>)}
            </section>
        </>
    )
}

export default Dashboard