import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth.middleware";
import { CollectionController } from "./collection.controller";

const router = express.Router();

const ALL_AUTH = [
  ENUM_USER_ROLE.USER,
  ENUM_USER_ROLE.WRITER,
  ENUM_USER_ROLE.ADMIN,
  ENUM_USER_ROLE.SUPER_ADMIN,
] as const;

// Create a new collection
router.post("/", auth(...ALL_AUTH), CollectionController.createCollection);

// Update collection metadata or story order
router.patch("/:id", auth(...ALL_AUTH), CollectionController.updateCollection);

// Add a story to a collection
router.post(
  "/:id/stories",
  auth(...ALL_AUTH),
  CollectionController.addStoryToCollection
);

// Remove a story from a collection
router.delete(
  "/:id/stories/:storyId",
  auth(...ALL_AUTH),
  CollectionController.removeStoryFromCollection
);

// Delete a collection (soft-delete)
router.delete("/:id", auth(...ALL_AUTH), CollectionController.deleteCollection);

// Get collection detail (public or owner)
router.get("/:id", CollectionController.getCollectionById);

// List a user's collections
router.get("/user/:userId", CollectionController.getUserCollections);

export const CollectionRouter = router;
