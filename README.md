# Portfolio Website - I Komang Sena Aji Buwana

A modern, interactive portfolio website built with React, TypeScript, and Framer Motion. Features a card-based layout with smooth animations, modal interactions, and a dedicated news section.

## 🚀 Features

- **Interactive Card Layout**: Portfolio organized in a responsive grid with clickable cards
- **Smooth Animations**: Page transitions and modal animations powered by Framer Motion
- **Modal System**: Detailed views for projects, experience, education, skills, and awards
- **News Section**: Dedicated page for updates and announcements with routing
- **Image Carousel**: Swipeable project image galleries with autoplay
- **Markdown Support**: Rich text rendering for project and experience descriptions
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type-Safe**: Built with TypeScript for reliability
- **Tested**: Comprehensive test coverage (79%+) with Vitest and React Testing Library

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Markdown**: react-markdown
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Git Hooks**: Husky (pre-commit lint & test checks)

## 📦 Installation

```bash
# Install dependencies
npm install

# Initialize git hooks
npm run prepare
```

## 🏃 Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🔍 Linting

```bash
# Run ESLint with auto-fix
npm run lint
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable React components
│   ├── Card.tsx
│   ├── GenericModal.tsx
│   ├── ImageCarousel.tsx
│   ├── ProjectDetail.tsx
│   └── SectionIcon.tsx
├── lib/             # Utilities and data
│   ├── data.ts      # Portfolio content
│   ├── theme.ts     # Theme configuration
│   └── types.ts     # TypeScript types
├── pages/           # Route pages
│   └── News.tsx
├── App.tsx          # Main portfolio component
└── main.tsx         # Application entry point
```

## 🎨 Customization

### Updating Portfolio Content

Edit `src/lib/data.ts` to update:
- Profile information
- Work experience
- Education
- Projects
- Skills
- Awards and certificates
- News items

### Modifying Theme

Edit `src/lib/theme.ts` to customize colors and styling constants.

## 🔒 Git Hooks

Pre-commit hooks are configured via Husky to:
1. Run ESLint for code quality
2. Execute tests to ensure nothing breaks
3. Abort commit if checks fail

To bypass hooks (not recommended):
```bash
git commit --no-verify -m "your message"
```

## 📄 License

Private project

## 👤 Author

**I Komang Sena Aji Buwana**
- Location: Canberra 🇦🇺 / Jakarta 🇮🇩
- Email: i.buwana@anu.edu.au
- LinkedIn: [linkedin.com/in/iksena](https://linkedin.com/in/iksena)
