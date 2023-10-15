import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CreateProfileController from "../Controllers/Profile/CreateProfileController.js";
import RetrieveProfileController from "../Controllers/Profile/RetrieveProfileController.js";
import UpdateProfileController from "../Controllers/Profile/UpdateProfileController.js";
import DeleteProfileController from "../Controllers/Profile/DeleteProfileController.js";
import SearchProfileController from "../Controllers/Profile/SearchProfileController.js";
import auth from "../auth.cjs";

const profileRoutes = Router();
const prisma = new PrismaClient();

// profileRoutes.post("/create", auth, async (req, res) => {
profileRoutes.post("/create", async (req, res) => {
  const { name, description } = req.body;
  new CreateProfileController(prisma, req, res).create(name, description);
});

// profileRoutes.get("/retrieve", auth, async (req, res) => {
profileRoutes.get("/retrieve", async (req, res) => {
  new RetrieveProfileController(prisma, req, res).retrieve();
});

// profileRoutes.put("/update", auth, async (req, res) => {
profileRoutes.put("/update", async (req, res) => {
  const { profileId, name, description } = req.body;
  new UpdateProfileController(prisma, req, res).update(
    profileId,
    name,
    description,
  );
});

// profileRoutes.delete("/delete", auth, async (req, res) => {
profileRoutes.delete("/delete", async (req, res) => {
  const { profileId } = req.body;
  new DeleteProfileController(prisma, req, res).delete(profileId);
});

// profileRoutes.get("/search/:profileId", auth, async (req, res) => {
profileRoutes.get("/search/:profileId", async (req, res) => {
  const { profileId } = req.params;
  new SearchProfileController(prisma, req, res).search(profileId);
});

export default profileRoutes;
