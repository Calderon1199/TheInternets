const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Post } = require('../../db/models');
const { Comment } = require('../../db/models');
const { PostImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Group } = require('../../db/models');

const router = express.Router();

const validatePost = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.'),
    check('postText')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a story.'),
    check('categoryId')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a category.'),
    handleValidationErrors
];

const validatePostImage = [
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a url.')
        .custom((value) => {
            if (!value.endsWith(".png") && !value.endsWith(".jpg") && !value.endsWith(".jpeg")) {
                throw new Error('Url must end with jpg, png, jpeg');
            }
            return true;
        }),
    check('preview')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a story.'),
    handleValidationErrors
];



router.get('/', async (req, res, next) => {
    try {
        const postInstance = await Post.findAll({ include: [ Comment, PostImage] });
        res.status(200).json({ posts: postInstance });

    } catch (error) {
        next(error);
    }

});


router.get('/user', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userPosts = await Post.findAll({ where: {userId: userId}, include: [Comment, PostImage]});

        if (userPosts.length <= 0) res.status(200).json({message: "User has no posts"})

        res.status(200).json({ posts: userPosts })
    } catch (error) {
        next(error)
    }
})

router.get('/:post_id', async (req, res, next) => {
    try {
        const postId = req.params.post_id;
        const singlePost = await Post.findByPk(+postId);

        if (!singlePost) res.status(404).json({ message: "Post not found." })
        res.status(200).json(singlePost);
    } catch (error) {
        next(error);
    }

});

router.post('/submit', requireAuth, async (req, res, next) => {
    try {
        const { title, postText, categoryId} = req.body;
        const userId = req.user.id;

        const newPost = await Post.create({ title, postText, categoryId, userId });

        res.status(201).json(newPost);
    } catch (error) {
        next(error)
    }
});

router.put('/:post_id', requireAuth, async (req, res, next) => {
    try {
        const postId = req.params.post_id;
        const userId = req.user.id;
        const newData = req.body;

        const post = await Post.findByPk(+postId);
        const categoryCheck = await Group.findByPk(+newData.categoryId);


        if (!post) res.status(404).json({ message: "Post not found" })
        if (!categoryCheck) res.status(404).json({ message: "Category not found"})

        if (post.userId !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        };

        await post.update({
            ...newData,
        });

        const updatedPost = await Post.findByPk(+postId);

        res.status(201).json(updatedPost);
    } catch(error) {
        next(error)
    }
});

router.delete('/:post_id', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.post_id;

        const post  = await Post.findByPk(+postId);

        if (!post) {
            res.status(404).json({message: "Post not found"})
        } else if (post.userId !== +userId) {
            res.status(403).json({message: "Forbidden"})
        } else {
            await post.destroy();
        }

        res.json({ message: "Successfully deleted" });
    } catch (error) {
        next(error);
    }
});

router.post('/:post_id/images', validatePostImage, requireAuth, async (req, res, next) => {
    try {
        const {url} = req.body;
        const postId = req.params.post_id;
        let preview;

        const userId = req.user.id;
        const post = await Post.findByPk(+postId, { include: [Comment, PostImage] });

        post.PostImages.length < 1 ? preview = true : preview = false;

        if (!post) res.status(404).json({message: "Post not found." });

        if (post.userId !== +userId) res.status(403).json({ message: "Forbidden" });

        await PostImage.create({url, preview, postId});

        res.status(200).json(post);

    } catch (error) {
        next(error)
    }
})

router.delete('/:post_id/images/:image_id', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.post_id;
        const imageId = req.params.image_id;
        const imageToDelete = await PostImage.findByPk(+imageId);
        const post = await Post.findByPk(+postId, { include: [Comment, PostImage] });



        if (!post) res.status(404).json({ message: "Post not found." });
        if (post.userId !== +userId) res.status(403).json({ message: "Forbidden" });

        await imageToDelete.destroy();

        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        next(error)
    }
})


module.exports = router;
