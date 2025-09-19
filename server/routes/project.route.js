import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { requireAdmin } from '../middleware/auth.js'
import multer from "multer";
import path from "path";


const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // get original file extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); // e.g., image-123456789.jpg
  },
});

export const upload = multer({ storage });


/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing projects
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of all projects
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Portfolio Website
 *               description:
 *                 type: string
 *                 example: A personal portfolio showcasing my work
 *               longDescription:
 *                 type: string
 *                 example: Full details about the portfolio project
 *               category:
 *                 type: string
 *                 enum: [frontend, backend, fullstack]
 *                 example: fullstack
 *               image:
 *                 type: string
 *                 example: https://example.com/cover.png
 *               screenshots:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/shot1.png", "https://example.com/shot2.png"]
 *               links:
 *                 type: object
 *                 properties:
 *                   demo:
 *                     type: string
 *                     example: https://myportfolio.com
 *                   github:
 *                     type: string
 *                     example: https://github.com/user/portfolio
 *                   caseStudy:
 *                     type: string
 *                     example: https://medium.com/case-study
 *               status:
 *                 type: string
 *                 enum: [ongoing, completed, planned]
 *                 example: ongoing
 *               finishedAt:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *     responses:
 *       201:
 *         description: Project created successfully
 */

router
  .route("/")
  .get(getProjects)
  .post(
    requireAdmin,
    upload.fields([{ name: "image", maxCount: 1 }, { name: "screenshots" }]),
    createProject
  );


/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project updated
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Project deleted
 */
router
  .route("/:id")
  .get(getProject)
  .put(
    requireAdmin,
    upload.fields([{ name: "image", maxCount: 1 }, { name: "screenshots" }]),
    updateProject
  )
  .delete(requireAdmin, deleteProject);



export default router;