const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Post } = require('../../db/models');
const { User } = require('../../db/models');
const { Comment } = require('../../db/models');
const { PostImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { CommentImage } = require('../../db/models');

const router = express.Router();

const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a comment.'),
    handleValidationErrors
];

router.get('/', async (req, res, next) => {
    try {
        const allComments = await Comment.findAll({ include: CommentImage });

        res.status(200).json({ Comments: allComments });
    } catch (error) {
        next(error);
    }

});

router.get('/user', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userComments = await Comment.findAll({ where: { userId: userId }});

        if (userComments.length === 0) {
            res.status(404).json({ message: "User has no comments" });
        } else {
            res.status(200).json({ Comments: userComments });
        }
    } catch (error) {
        next(error);
    }
});

router.get('/:post_id', async (req, res, next) => {
    try {
        const postId = req.params.post_id;
        const comment = await Comment.findAll({
            where: { postId: postId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'],
                }
            ]
        });

        if (!comment) res.status(404).json({ message: "Comment not found" })
        res.status(200).json({Comments: comment });
    } catch (error) {
        next(error);
    }
});


router.post('/:post_id', requireAuth, validateComment, async (req, res, next) => {
    try {
        const postId = req.params.post_id;
        const userId = req.user.id;
        const { comment } = req.body;

        const newComment = await Comment.create({ userId, postId, comment })

        const userComment = await Comment.findByPk(newComment.id, {
            where: { postId: postId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'],
                }
            ]
        })

        return res.status(200).json(userComment)
    } catch (error) {
        next(error);
    }
})

router.put('/:comment_id', requireAuth, validateComment, async (req, res, next) => {
    try {
        const commentId = req.params.comment_id;
        const userId = req.user.id;
        const newData = req.body;

        const commentToEdit = await Comment.findByPk(+commentId);

        if (!commentToEdit) res.status(404).json({ message: "Comment not found" });

        if (commentToEdit.userId !== +userId) res.status(403).json({ message: "Forbidden" })

        const newComment = await commentToEdit.update({ ...newData })

        const updatedComment = await Comment.findByPk(newComment.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'],
                }
            ]
        })

        return res.status(200).json(updatedComment)
    } catch (error) {
        next(error);
    }
})

router.delete('/:comment_id', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const commentId = req.params.comment_id;
        const commentToDelete = await Comment.findByPk(+commentId);

        if (!commentToDelete) return res.status(404).json({message: "Comment not found." });
        if (commentToDelete.userId !== +userId) return res.status(403).json({ message: "Forbidden" });

        await commentToDelete.destroy();

        return res.status(200).json({ message: "Successfully Deleted" })
    } catch (error) {
        next(error)
    }
})


module.exports = router;
