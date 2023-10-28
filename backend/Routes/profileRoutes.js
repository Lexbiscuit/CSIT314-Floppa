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

profileRoutes.post("/create", [authJwt.verifyToken], async (req, res) => {
  const { name, description } = req.body;
  new CreateProfileController(prisma, req, res).createProfile(
    name,
    description
  );
});

profileRoutes.get("/retrieve", [authJwt.verifyToken], async (req, res) => {
  new RetrieveProfileController(prisma, req, res).retrieveProfiles();
});

profileRoutes.put("/update", [authJwt.verifyToken], async (req, res) => {
  const { profileId, name, description } = req.body;
  new UpdateProfileController(prisma, req, res).updateProfile(
    profileId,
    name,
    description
  );
});

profileRoutes.delete("/delete", [authJwt.verifyToken], async (req, res) => {
  const { profileId } = req.body;
  new DeleteProfileController(prisma, req, res).deleteProfile(profileId);
});

profileRoutes.get(
  "/search/:profileId",
  [authJwt.verifyToken],
  async (req, res) => {
    const { profileId } = req.params;
    new SearchProfileController(prisma, req, res).searchProfile(profileId);
  }
);

export default profileRoutes;
