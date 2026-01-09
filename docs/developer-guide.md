# Developer Guide

## Project Structure
- `/js`: Source code for all tool modules (ES Modules).
- `/css`: Styling (Bootstrap overrides).
- `/docs`: Documentation.
- `index.html`: Main entry point and UI skeleton.
- `vite.config.js`: Vite build configuration.

## development
This project uses **Vite** for a fast development experience.
```bash
npm install
npm run dev
```

## Building for Production
To create a production-ready build in the `dist/` folder:
```bash
npm run build
```

## Testing
We use **Vitest** for unit testing core logic (e.g., utility functions).
```bash
npm run test
```

## Docker
The `Dockerfile` uses a multi-stage process:
1. **Build Stage**: Node.js builds the static assets.
2. **Serve Stage**: Nginx serves the `dist/` folder on port 80.
