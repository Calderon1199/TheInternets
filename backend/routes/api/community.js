const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Group } = require('../../db/models');
const { User } = require('../../db/models');


const router = express.Router();

const validateCommunity = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name.')
        .custom((value) => {
            if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                throw new Error('Name can only contain numbers, letters, and underscores.');
            }
            return true
        }),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description.')
        .custom((value) => {
            if (value && value.trimStart()[0] === ' ') {
                throw new Error('Description cannot start with a space.');
            }
            if (value && value.endsWith(' ')) {
                throw new Error('Description cannot end with a space.');
            }
            return true;
        }),
    handleValidationErrors,
];


router.get('/', async (req, res, next) => {
    try {
        const allCommunities = await Group.findAll({ include: User });

        res.status(200).json({ Communities: allCommunities });
    } catch (error) {
        next(error);
    }
});

router.get('/user', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userCommunities = await Group.findAll({ where: { userId: +userId}});

        if (userCommunities.length <= 0) res.status(200).json({ message: "User has no posts" })

        res.status(200).json({ Communities: userCommunities });
    } catch (error) {
        next(error);
    }
});

router.get('/:communityId', async (req, res, next) => {
    try {
        const communityId = req.params.communityId
        const singleCommunity = await Group.findByPk(+communityId);

        res.status(200).json(singleCommunity);
    } catch (error) {
        next(error);
    }
});

router.post('/new', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;
        const newCommunity = await Group.create({ userId, name, description });

        res.status(200).json(newCommunity);
    } catch (error) {
        next(error);
    }
});

router.put('/:communityId', validateCommunity, async (req, res, next) => {
    try {
        const newData = req.body;
        const userId = req.user.id;
        const communityId = req.params.communityId;

        const community = await Group.findByPk(+communityId);

        if (!community) res.status(404).json({ message: "Community not found."});
        if (community.userId !== userId) return res.status(403).json({ message: "Forbidden"});

        await community.update({
            ...newData,
        })

        const updatedCommunity = await Group.findByPk(communityId);

        res.status(200).json(updatedCommunity);
    } catch (error) {
        next(error);
    }
});

router.get('/:communityId', async (req, res, next) => {
    try {
        const communityId = req.params.communityId
        const singleCommunity = await Group.findByPk(+communityId);

        res.status(200).json(singleCommunity);
    } catch (error) {
        next(error);
    }
});


router.delete('/:communityId', async (req, res, next) => {
    try {

        const userId = req.user.id;
        const communityId = req.params.communityId;

        const communityToDelete = await Group.findByPk(+communityId);

        if (!communityToDelete) {
            res.status(404).json({ message: "Community not found" })
        } else if (communityToDelete.userId !== +userId) {
            res.status(403).json({ message: "Forbidden" })
        } else {
            await communityToDelete.destroy();
        }

        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
