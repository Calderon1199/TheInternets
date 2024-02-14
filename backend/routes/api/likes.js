const express = require('express');
const { Op } = require('sequelize');
const { Like, Post, Comment, PostImage, Group, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


router.get('/user/all-likes', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userLikes = await Like.findAll({
            where: { userId: +userId },
            include: {
                model: Post
            }
        });

        if (userLikes.length === 0) res.status(200).send({message: "User has no likes or dislikes"})

        res.status(200).json({ Likes: userLikes });
    } catch (error) {
        next(error);
    }
});



router.get('/user/likes', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const likes = await Like.findAll({
            where: {
                isLiked: true,
                userId: +userId
            }
        });

        // Extract post IDs from liked posts
        const postIds = likes.map(like => like.postId);

        // Fetch all likes associated with the liked posts
        const userLikes = await Post.findAll({
            where: {
                id: {
                    [Op.in]: postIds
                }
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Group,
                    attributes: ['id', 'name'],
                },
                {
                    model: Like,
                },
                {
                    model: Comment,
                },
                {
                    model: PostImage,
                },
            ]
        });

        if (userLikes.length === 0) res.status(200).send({message: "User has no likes"})


        res.status(200).json({ Likes: userLikes });
    } catch (error) {
        next(error);
    }
});

router.get('/user/posts/:postId', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;
        const userPostLike = await Like.findAll({
            where: { postId: +postId, userId: +userId },
        });

        res.status(200).json({ Like: userPostLike });
    } catch (error) {
        next(error);
    }
});

router.get('/user/dislikes', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const dislike = await Like.findAll({
            where: {
                isLiked: false,
                userId: +userId
            }
        });

        // Extract post IDs from liked posts
        const postIds = dislike.map(dislike => dislike.postId);

        // Fetch all likes associated with the liked posts
        const userDislikes = await Post.findAll({
            where: {
                id: {
                    [Op.in]: postIds
                }
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Group,
                    attributes: ['id', 'name'],
                },
                {
                    model: Like,
                },
                {
                    model: Comment,
                },
                {
                    model: PostImage,
                },
            ]
        });

        if (userDislikes.length <= 0) res.status(200).json({ message: "User has no dislikes" })

        res.status(200).json({ Dislikes: userDislikes });
    } catch (error) {
        next(error);
    }
});

router.post('/', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {postId, isLiked }  = req.body;
        const newLike  = await Like.create({ userId, postId, isLiked });
        res.status(200).json(newLike);
    } catch (error) {
        next(error);
    }
});


router.put('/:likeId', requireAuth, async (req, res, next) => {
    try {
        const likeId = req.params.likeId;
        const {isLiked} = req.body;
        const userId = req.user.id;

        const like = await Like.findByPk(+likeId);


        if (!like) res.status(404).json({ message: "Like not found." });
        if (like.userId !== userId) return res.status(403).json({ message: "Forbidden" });

        await like.update({ isLiked })

        const updatedLike = await Like.findByPk(likeId);

        res.status(200).json(updatedLike);
    } catch (error) {
        next(error);
    }
});


router.delete('/:likeId', requireAuth, async (req, res, next) => {
    try {

        const userId = req.user.id;
        const likeId = req.params.likeId;

        const likeToDelete = await Like.findByPk(+likeId);

        if (!likeToDelete) {
            res.status(404).json({ message: "Like not found" })
        } else if (likeToDelete.userId !== +userId) {
            res.status(403).json({ message: "Forbidden" })
        } else {
            await likeToDelete.destroy();
        }

        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
