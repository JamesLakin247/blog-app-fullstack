import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createPost} from '../features/posts/postSlice'

function PostForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createPost({title, content}))
        setTitle('')
        setContent('')
    }

    const autoGrow = element =>  {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";
    }

    return (
        <section className='from'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Post Title</label>
                    <input 
                        type='text' 
                        name='title'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor='content'>Post Content</label>
                    <textarea 
                        type='textarea' 
                        name='content' 
                        id='content' 
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                            autoGrow(e.target)
                        }}
                    />
                </div>
                <div className="form-group">
                    <button className='btn btn-block' type='submit'>Add Post</button>
                </div>
            </form>
        </section>
    )
}

export default PostForm 