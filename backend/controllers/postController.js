const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')

//@description  Get posts
// @route       GET /api/posts
// @access      Public
const getAllPosts = asyncHandler(async (req, res) => {
    // const posts = await Post.find({ user: req.user.id })
    const posts = await Post.find().sort({'_id': -1}) //.sort({'_id': -1}) we are entering the element id into the sort function and it orders elements using the createdAt key attached to that id

    res.status(200).json(posts)
})

//@description  Get posts
// @route       GET /api/posts
// @access      Private
const getUserPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.user.id }).sort({'_id': -1})

    res.status(200).json(posts)
})

//@description  Set posts
// @route       POST /api/posts
// @access      Private
const setPosts = asyncHandler(async (req, res) => {
    if (!req.body.title || ! req.body.content) {
        res.status(400)//.json({message: 'please add a text field'})
        throw new Error('Please add a title and blog content')
    }

    const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
        createdBy: req.user.name
    })

    res.status(200).json(post)
})

//@description  Update post
// @route       PUT /api/posts/:id
// @access      Private
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the post user
    if(post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedPost)
})

//@description  Delete posts
// @route       DELETE /api/posts/:id
// @access      Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the post user
    if(post.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await post.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {getAllPosts, getUserPosts, setPosts, updatePost, deletePost}