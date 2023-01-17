const Router = require('express');
const  router = new Router();
const indexController = require('../controllers/indexController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/registration', indexController.registration);
router.post('/login', indexController.login);
router.post('/check_code', indexController.checkCode);

router.get('/auth', authMiddleware, indexController.check);

router.get('', (req, res) => {
    res.json({message: 'hello'})
});


router.post('/admin/users/find', indexController.findUsers);
router.post('/admin/users/update', indexController.updateUser);
router.post('/admin/users/delete', indexController.deleteUser);


module.exports = router;