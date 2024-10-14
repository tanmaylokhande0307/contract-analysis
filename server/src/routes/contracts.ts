import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  analyzeContract,
  detectAndConfirmContractType,
  uplaodMiddleware,
} from "../controllers/contract.controller";
import { handleErrors } from "../middleware/errors";

const router = express.Router();

router.post(
  "/detect-type",
  isAuthenticated,
  uplaodMiddleware,
  handleErrors(detectAndConfirmContractType)
);

router.post(
  "/analyze",
  isAuthenticated,
  uplaodMiddleware,
  handleErrors(analyzeContract)
);

export default router;
