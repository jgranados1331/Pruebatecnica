const { Router }=require('express');
const router=Router();
const {getUser,createUser,createDepa,updateUser,getUserById,deleteUser}= require('../controllers/index.controller')


router.get('/empleados', getUser);
router.post('/empleados', createUser);
router.get('/empleados/:id',getUserById);
router.post('/departamento',createDepa);
router.put('/empleados/:id',updateUser);
router.delete('/empleados/:id',deleteUser);

module.exports=router;