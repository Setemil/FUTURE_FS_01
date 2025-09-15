import express from 'express'
import { getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experience.controller.js'
import {requireAdmin as AdminAuth} from '../middleware/auth.js'

const router = express.Router();

router.route('/').get(getExperience).post(AdminAuth, createExperience);

router.route('/:id').put(AdminAuth, updateExperience).delete(AdminAuth, deleteExperience);

export default router