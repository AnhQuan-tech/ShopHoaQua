import express from "express";
import {
  getAllPlugins,
  togglePlugin,
  updatePluginSettings,
} from "../controllers/pluginController.js";

const router = express.Router();

router.get("/", getAllPlugins);
router.put("/:id/toggle", togglePlugin);
router.put("/:id/settings", updatePluginSettings);

export default router;
