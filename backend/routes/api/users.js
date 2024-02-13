const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateImage = [
    check('profileImg')
        .exists({ checkFalsy: true})
        .custom((value) => {
            if (!value) {
                // Value doesn't exist, so it's not an image
                return false;
            }
            // Check if the value ends with one of the allowed extensions
            const allowedExtensions = ['.png', '.jpg', '.jpeg'];
            return allowedExtensions.some(ext => value.endsWith(ext));
        })
        .withMessage('Profile image must be a PNG, JPG, or JPEG file')
]

//backend validation for signup
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.')
        .custom((value) => {
            if (value && value.trimStart()[0] === ' ') {
                throw new Error('Description cannot start with a space.');
            }
            if (value && value.endsWith(' ')) {
                throw new Error('Description cannot end with a space.');
            }
            return true;
        }),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.')
        .custom((value) => {
            if (value && value.trimStart()[0] === ' ') {
                throw new Error('Description cannot start with a space.');
            }
            if (value && value.endsWith(' ')) {
                throw new Error('Description cannot end with a space.');
            }
            return true;
        }),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {

    const { email, password, username } = req.body;

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

router.put('/', validateImage, async (req, res) => {
    const { profileImg, username} = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(+userId);

    const newUser = await user.update({profileImg, username});

    const safeUser = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        profileImg: newUser.profileImg
    };
    return res.json({
        user: safeUser
    });

});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            profileImg: user.profileImg
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});


module.exports = router;
