import { Router } from "express";
import { sendEmail } from "../controller/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post('/subscription/remainder', sendEmail);
export default workflowRouter;