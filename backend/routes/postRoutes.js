const express = require('express')
const router = express.Router()
const { getAllPosts, getUserPosts, setPosts, updatePost, deletePost } = require('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')

router.route("/")
    .get(getAllPosts)
    .post(protect, setPosts)

router.route('/myposts')
    .get(protect, getUserPosts)

router.route('/:id')
    .put(protect, updatePost)
    .delete(protect, deletePost)

module.exports = router