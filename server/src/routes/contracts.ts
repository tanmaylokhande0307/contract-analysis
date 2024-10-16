import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  analyzeContract,
  detectAndConfirmContractType,
  getContractById,
  getUserContracts,
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

router.get("/user-contracts", isAuthenticated, handleErrors(getUserContracts));
router.get("/contract/:id", isAuthenticated, handleErrors(getContractById));


export default router;
