import express from "express";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: API for managing skills
 */

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: List of all skills
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *               - icon
 *             properties:
 *               name:
 *                 type: string
 *                 example: JavaScript
 *               category:
 *                 type: string
 *                 enum: [frontend, backend, fullstack, tools, database]
 *                 example: frontend
 *               description:
 *                 type: string
 *                 example: A versatile language for web development
 *               proficiency:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *                 example: advanced
 *               yearsOfExperience:
 *                 type: integer
 *                 example: 3
 *               icon:
 *                 type: string
 *                 example: https://cdn-icons-png.flaticon.com/js.png
 *     responses:
 *       201:
 *         description: Skill created successfully
 */

router.route("/").get(getSkills).post(requireAdmin, createSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Skill ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated skill
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Skill ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Skill deleted
 */
router
  .route("/:id")
  .put(requireAdmin, updateSkill)
  .delete(requireAdmin, deleteSkill);

export default router;
