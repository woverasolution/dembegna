// apps/api/src/server.ts
import app from './index'; // Import the configured Express app

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Dembegna API server listening on port ${PORT}`);
}); 