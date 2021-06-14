const { Router } = require('express');
const router = new Router();
const controller = require('./controller');
const { hasAccess } = require('../auth/utils');

router.get('/has-user-access', hasAccess('user'), controller.hasUserAccess);

router.get('/has-admin-access', hasAccess('admin'), controller.hasAdminAccess);

router.get('/:group', hasAccess('admin'), controller.getUsersByGroup);

router.get('/num/:group', hasAccess('admin'), controller.getNumByGroup);

router.post('/update-access', hasAccess('admin'), controller.updateAccessLevel)


module.exports = router;