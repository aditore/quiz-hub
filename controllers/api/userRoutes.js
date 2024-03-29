const router = require('express').Router();
const { User } = require('../../models');

//get users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password']} });

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//add user into database and start a session
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//login to create session
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect login credentials, please try again' });

            return;
        }

        const correctPassword = await userData.checkPassword(req.body.password);

        if (!correctPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect login credentials, please try again' });

            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Thank you for logging in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;