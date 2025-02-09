# 🏥 HealthSync

<div align="center">

![HealthSync Logo](public/assets/logo.png)

> A sophisticated AI-powered medical charting and EMR documentation system built with Next.js and Together AI.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-blue.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61dafb.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-Academic-yellow.svg)](LICENSE)

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [AI Integration](#-ai-integration)
- [Styling](#-styling)
- [Setup & Installation](#-setup--installation)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## 👥 Development Team
| #  | Full Name        | GitHub Username                               |
| -- |------------------|-----------------------------------------------|
| 1  | Sunny Patel      | [sunnypatell](https://github.com/sunnypatell/) |
| 2  | Michael Ispahani | [Michaelexe](https://github.com/Michaelexe)    |
| 3  | Royce Mathew         | [royce-mathew](https://github.com/royce-mathew) |
| 4  | Alyesha Singh         | [AlyeshaS](https://github.com/AlyeshaS) |

## 🔍 Overview

HealthSync is a cutting-edge medical documentation system that leverages artificial intelligence to streamline the patient intake process. It provides real-time, structured medical charting with an intuitive interface for healthcare professionals.

## ✨ Features

### Core Functionality
- **AI-Powered Documentation**
  - Real-time speech-to-text for verbal input
  - Intelligent SOAP format adherence
  - Automated medical terminology validation

### User Interface
- **Dual Chat Interface**
  - Choose between two AI assistants (Ava & Eli)
  - Real-time conversation tracking
  - Voice input support with visual feedback

### Charting System
- **Dynamic Charting Display**
  - Warning and message categorization
  - Visual indicators for different entry types
  - Real-time updates during consultation

### Data Processing
- **Structured Data Output**
  - JSON-formatted medical records
  - SOAP-compliant documentation
  - Automated follow-up question generation

## 🏗 Architecture

```plaintext
HealthSync/
├── src/
│   ├── pages/
│   │   ├── index.js        # Main application router
│   │   ├── HomePage.js     # Initial selection interface
│   │   ├── ChatPage.js     # AI interaction interface
│   │   ├── Charting.js     # Medical documentation display
│   │   └── api/
│   │       └── agent.js    # Together AI integration
│   └── styles/
│       ├── index.css       # Global styles
│       ├── home.css        # Homepage styles
│       ├── chat.css        # Chat interface styles
│       └── charting.css    # Documentation styles
```

## 🛠 Technology Stack

- **Frontend**
  - Next.js 13
  - React 18
  - TailwindCSS
  - Framer Motion

- **AI Integration**
  - Together AI API
  - OpenAI Whisper
  - Custom AI Agents (Ava & Eli)

- **Development Tools**
  - TypeScript
  - ESLint
  - Prettier
  - Husky

## 📁 Project Structure

The project follows a modular architecture with clear separation of concerns:

- `pages/` - Route components and API endpoints
- `components/` - Reusable UI components
- `styles/` - Global and component-specific styles
- `lib/` - Utility functions and API clients
- `types/` - TypeScript type definitions
- `public/` - Static assets and resources

## 🧩 Components

Key components include:

- **ChatInterface** - Main conversation UI
- **VoiceInput** - Speech recognition component
- **ChartingDisplay** - Medical documentation view
- **AgentSelector** - AI assistant selection interface

## 🤖 AI Integration

HealthSync uses Together AI's API for:

- Natural language processing
- Medical terminology validation
- Automated documentation generation
- Context-aware responses

## 💅 Styling

- TailwindCSS for utility-first styling
- Custom CSS modules for complex components
- Responsive design for all screen sizes
- Dark/Light mode support

## 🚀 Setup & Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.` file:
```bash
TOGETHER_API_KEY=your_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

## 💻 Development

- Build: `npm run build`
- Lint: `npm run lint`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the SmartPlannr Hackathon License (HackHive 2025 @ Ontario Tech University) - see the [LICENSE](LICENSE) file for details.
---

<p align="center">Made with ❤️ for HackHive 2025</p>

