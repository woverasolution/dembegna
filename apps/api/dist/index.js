"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// apps/api/src/index.ts
const express_1 = __importDefault(require("express"));
const pool = require("./config/db"); // Changed to import = require()
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// import { DembegnaUser } from '@dembegna/shared-types'; // Will work after linking
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes")); // Import auth routes
const customers_routes_1 = __importDefault(require("./modules/customers/customers.routes")); // Import customer routes
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json()); // Middleware to parse JSON bodies
app.get('/api/health', (req, res) => {
    res.json({ status: 'Dembegna API is healthy' });
});
// Register auth routes
app.use('/api/auth', auth_routes_1.default);
// Register customer routes
app.use('/api/customers', customers_routes_1.default);
// New route for DB test
app.get('/api/db-test', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        res.json({ success: true, time: result.rows[0] });
        client.release();
    }
    catch (err) {
        console.error('Error connecting to DB or querying', err);
        res.status(500).json({ success: false, error: 'DB connection error' });
    }
});
app.listen(PORT, () => {
    console.log(`Dembegna API server listening on port ${PORT}`);
});
