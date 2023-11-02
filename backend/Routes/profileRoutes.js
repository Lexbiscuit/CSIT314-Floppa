import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CreateProfileController from "../Controllers/Profile/CreateProfileController.js";
import RetrieveProfileController from "../Controllers/Profile/RetrieveProfileController.js";
import UpdateProfileController from "../Controllers/Profile/UpdateProfileController.js";
import DeleteProfileController from "../Controllers/Profile/DeleteProfileController.js";
import SearchProfileController from "../Controllers/Profile/SearchProfileController.js";
import { authJwt } from "../middleware/authJwt.js";

const profileRoutes = Router();
const prisma = new PrismaClient();

// profileRoutes.post("/create", [authJwt.verifyToken], async (req, res) => {
profileRoutes.post("/create", async (req, res) => {
  const { name, description } = req.body;

  const createProfileController = new CreateProfileController(prisma, req, res);
  await createProfileController.createProfile(name, description);
});

// profileRoutes.get("/retrieve", [authJwt.verifyToken], async (req, res) => {
profileRoutes.get("/retrieve", async (req, res) => {
  const retrieveProfileController = new RetrieveProfileController(
    prisma,
    req,
    res
  );
  await retrieveProfileController.retrieveProfiles();
});

// profileRoutes.put("/update", [authJwt.verifyToken], async (req, res) => {
profileRoutes.put("/update", async (req, res) => {
  const profile = req.body;

  const updateProfileController = new UpdateProfileController(prisma, req, res);
  await updateProfileController.updateProfile(profile);
});

// profileRoutes.delete("/delete", [authJwt.verifyToken], async (req, res) => {
profileRoutes.delete("/delete", async (req, res) => {
  const { profileId } = req.body;

  const deleteProfileController = new DeleteProfileController(prisma, req, res);
  await deleteProfileController.deleteProfile(profileId);
});

// profileRoutes.get("/search", [authJwt.verifyToken], async (req, res) => {
profileRoutes.post("/search", async (req, res) => {
  const profileFilter = req.body;

  const searchProfileController = new SearchProfileController(prisma, req, res);
  await searchProfileController.searchProfile(profileFilter);
});

export default profileRoutes;
