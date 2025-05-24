"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
// POST /api/auth/signup (or /api/customers/signup - adjust as needed)
router.post('/signup', auth_controller_1.signUpController);
exports.default = router;
