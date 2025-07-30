# MomBuddy - Pregnancy Companion App

MomBuddy is a comprehensive pregnancy companion app designed to support expectant mothers through every stage of their pregnancy journey. With detailed information about each trimester, AI-powered features, and a user-friendly interface, MomBuddy aims to be the ultimate pregnancy resource.

## Features

- **Trimester Guides**: Detailed information about each stage of pregnancy
- **AI-Powered Support**: Personalized guidance based on your pregnancy stage
- **Symptom Tracker**: Log and monitor your symptoms with AI analysis
- **Nutrition Guide**: Personalized meal plans and nutrition advice
- **Community Support**: Connect with other moms at your same stage
- **Birth Plan Creator**: Create a personalized birth plan with AI guidance

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mombuddy.git
cd mombuddy
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
pregnancy/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── hero-image.png
│   │   ├── first-trimester.png
│   │   ├── second-trimester.png
│   │   ├── third-trimester.png
│   │   └── ai-feature.png
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## AI Integration

The app is designed to integrate with an AI backend for personalized pregnancy guidance. The AI features include:

- Symptom analysis and risk assessment
- Personalized nutrition recommendations
- Birth plan creation assistance
- Pregnancy timeline customization

## Customization

You can customize the app by:

1. Modifying the trimester information in `App.jsx`
2. Updating the color scheme in `tailwind.config.js`
3. Adding or modifying AI features in the respective components

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Heroicons](https://heroicons.com/)
- Illustrations can be replaced with custom designs