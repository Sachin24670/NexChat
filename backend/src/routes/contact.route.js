import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { searchContacts } from "../controller/contact.controller.js";



const contactsRoutes = Router()

contactsRoutes.post("/search", verifyToken, searchContacts)

export default contactsRoutes