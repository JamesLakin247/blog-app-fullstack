import {useDispatch} from 'react-redux'
import {deletePost} from '../features/posts/postSlice'

function PostItem({post, canEdit, createdBy}) {
    const dispatch = useDispatch()

    const editField = (
        <div className='post-edit-functions'>
            {/* <button onClick={() => dispatch(editPost(post._id))} className="close">Edit</button> */}
            {/* <button className='edit'>Edit</button> */}
            <button onClick={() => dispatch(deletePost(post._id))} className="close">Delete Post</button>
        </div>
    )

    return (
        <div className='post-wrapper'>
            <div className='post'>
                {canEdit && editField}
                <h2 className='post-title'>{post.title}</h2>
                <p className='display-linebreaks post-content-container'>{post.content}</p>
                <div className='post-footer'>
                    {createdBy && <p>Created by: {createdBy}</p>}
                    <p>Created on: {new Date(post.createdAt).toDateString()}</p>
                </div>
            </div>
        </div>
    )
}

export default PostItem