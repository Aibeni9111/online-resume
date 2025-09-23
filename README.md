# online-resume

This project delivers an online resume with a Vite + React frontend and a Spring Boot API backend.

## Frontend Page Structure
- **Navigation** - sticky top bar with anchors for every major section and a theme toggle.
- **Hero** - cover area with summary badge, call-to-action buttons, and quick contact cards (email, phone, GitHub).
- **Ueber mich** - rich text introduction rendered by `AboutSection`.
- **FAEHIGKEITEN** - animated skill grid visualising proficiency levels from the API.
- **Ausgewaehlte Projekte** - project gallery and deep-link to the visual gallery view.
- **Erfahrung** - timeline of professional experience with dates and locations.
- **Kontakt** - contact cards with copy-to-clipboard actions and collaboration call-to-action.
- **Galerie** - separate route (`/gallery`) that showcases visual work.

## Data Flow
All sections fetch their data from the backend via `src/api.ts`. The frontend requests the profile, skills, projects, and experience records in parallel when the home page loads.

## Local Development
```bash
cd frontend
npm install
npm run dev
```
Start the backend API before opening the frontend to ensure data loads correctly.
