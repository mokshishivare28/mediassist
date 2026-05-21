# MediAssist - Comprehensive Project Documentation
# MediAssist - Comprehensive Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Project Architecture](#project-architecture)
4. [Project Structure](#project-structure)
5. [Key Components & Functionality](#key-components--functionality)
6. [Dependencies & Libraries](#dependencies--libraries)
7. [API Integration](#api-integration)
8. [State Management & Context](#state-management--context)
9. [Styling & UI Framework](#styling--ui-framework)
10. [System Prompts & AI Configuration](#system-prompts--ai-configuration)
11. [How to Run the Project](#how-to-run-the-project)
12. [Current Features](#current-features)
13. [Limitations & Future Scope](#limitations--future-scope)
14. [File-by-File Breakdown](#file-by-file-breakdown)

---

## Project Overview

### What is MediAssist?
MediAssist is a React-based web application designed to provide students with AI-powered health consultation services. The platform acts as a health assistant that helps users analyze symptoms, seek medical consultation, and receive mental wellness support.

### Primary Purpose
- Provide AI-driven health and medical guidance to students
- Offer mental wellness support and emotional guidance
- Analyze symptoms and suggest possible causes and precautions
- Serve as a preliminary health advisor before consulting actual doctors

### Target Users
- Students who need quick health guidance
- Individuals seeking mental wellness support
- Users who want preliminary health consultations

### Key Value Propositions
- Available 24/7 without appointment scheduling
- Immediate feedback on health concerns
- Separation of medical and mental wellness queries
- User-friendly chat interface
- Empathetic and structured responses from AI

---

## Technical Stack

### Frontend Framework
- **React 18.2.0** - Core UI library
  - Component-based architecture
  - Hooks for state management
  - Context API for global state

### Styling & UI
- **Styled Components 6.1.8** - CSS-in-JS styling
  - Dynamic styling with props
  - Scoped component styles
  - Theme support
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
  - Custom configuration in `tailwind.config.js`
  - Rapid UI development
- **Custom CSS** - Additional styling in `index.css`

### Build & Development Tools
- **React Scripts 5.0.1** - CRA build tool
- **Node.js** - JavaScript runtime
- **npm/yarn** - Package management

### Hosting & Services
- **Firebase 10.11.0** - Backend services
  - Firestore for database
  - Analytics integration
- **OpenRouter API** - AI model integration
  - GPT-3.5-Turbo as default model
  - Alternative: Meta-Llama-2-70B-Chat

### Date & Time Handling
- **Moment.js 2.30.1** - DateTime library
  - Date formatting and manipulation

### UI Components & Icons
- **React Icons 5.1.0** - Icon library
  - SVG icons for UI
  - Multiple icon sets support
- **React DatePicker 6.6.0** - Date selection component

### Data Visualization
- **Chart.js 4.4.2** - Charting library
- **React-ChartJS-2 5.2.0** - React wrapper for Chart.js

### HTTP Requests
- **Axios 1.6.8** - HTTP client library
  - Promise-based requests
  - Request/response interceptors

### Notifications
- **React-Toastify 10.0.5** - Toast notification library
  - Non-intrusive user feedback
  - Customizable notifications

### AI/ML Integration
- **Google Generative AI 0.8.0** - Alternative AI library
- **OpenRouter SDK 0.12.24** - Unified AI API access

### Testing
- **@testing-library/react 13.4.0** - React component testing
- **@testing-library/jest-dom 5.17.0** - Jest DOM matchers
- **@testing-library/user-event 13.5.0** - User interaction simulation

---

## Project Architecture

### Architecture Pattern: Component-Based with Context API

```
MediAssist App Architecture
├── Entry Point (index.js)
│   └── Context Providers Wrapper
│       ├── ContextProvider (Medical)
│       ├── MentalWellnessContextProvider
│       ├── AIContextProvider
│       └── FilterContextProvider
├── App Component
│   ├── Main Router/Switch Logic
│   ├── Navigation Sidebar
│   └── Dynamic Content Area
├── Components
│   ├── Home (Landing Page)
│   ├── Medical Consultation (MedicalConsultation)
│   ├── Mental Wellness (MentalWellness)
│   └── Navigation
├── Contexts (State Management)
│   ├── Context.js (Medical Chat State)
│   ├── MentalWellnessContext.js (Mental Wellness State)
│   ├── AIContext.js
│   └── FilterContext.js
├── Configuration
│   └── openrouter.js (AI API Setup)
├── Utilities
│   ├── menuItems.js
│   ├── doctors.js
│   ├── items.js
│   └── Icons.js
└── Styles
    ├── GlobalStyle.js
    └── Layouts.js
```

### Data Flow Architecture

```
User Input
    ↓
Component State (setInput)
    ↓
Context (Context/MentalWellnessContext)
    ↓
OpenRouter API Call
    ↓
Response Processing (formatResponse)
    ↓
Message Array Update
    ↓
UI Re-render
```

### Request-Response Flow

```
User Query
    ↓
Input Handler (onSent)
    ↓
Message Array Update (add user message)
    ↓
Loading State = True
    ↓
OpenRouter API Request
    {
      - Model: GPT-3.5-Turbo
      - System Prompt: Role-specific
      - Session History: Previous messages
      - User Input: Current query
    }
    ↓
Response Processing
    - Format bold text (**text** → <b>text</b>)
    - Replace newlines with </br>
    - Add bullet points formatting
    ↓
Message Array Update (add assistant message)
    ↓
Loading State = False
    ↓
UI Display
```

---

## Project Structure

```
mediassist/
├── package.json                          # Project dependencies & scripts
├── tailwind.config.js                    # Tailwind CSS configuration
├── README.md                             # Standard CRA README
├── public/
│   ├── index.html                        # Main HTML file
│   ├── manifest.json                     # PWA manifest
│   └── robots.txt                        # SEO robots file
├── src/
│   ├── index.js                          # React DOM entry point
│   ├── index.css                         # Global CSS styles
│   ├── App.js                            # Main App component
│   ├── firebase.js                       # Firebase configuration
│   ├── Components/
│   │   ├── Home/
│   │   │   └── Home.js                   # Landing page component
│   │   ├── Navigation/
│   │   │   └── Navigation.js             # Sidebar navigation
│   │   ├── LoadingScreen/
│   │   │   └── LoadingScreen.js          # Initial load screen
│   │   ├── MentalWellness/
│   │   │   └── MentalWellness.js         # Mind-Bot mental health page
│   │   └── SymptomAnalysis/
│   │       ├── SymptomAnalysis.js        # Symptoms analysis component
│   │       ├── MedicalConsultation.js    # Medical consultation interface
│   │       └── AIConsult.js              # AI consultation helper
│   ├── context/
│   │   ├── Context.js                    # Medical consultation state
│   │   ├── MentalWellnessContext.js      # Mental wellness state
│   │   ├── AIContext.js                  # AI-related global state
│   │   ├── FilterContext.js              # Filtering logic state
│   │   └── globalContext.js              # Global shared state
│   ├── config/
│   │   └── openrouter.js                 # OpenRouter API configuration
│   ├── styles/
│   │   ├── GlobalStyle.js                # Global styled-components
│   │   └── Layouts.js                    # Layout components (MainLayout, InnerLayout)
│   ├── utils/
│   │   ├── menuItems.js                  # Navigation menu items data
│   │   ├── doctors.js                    # Doctor directory/data
│   │   ├── items.js                      # General items/data
│   │   └── Icons.js                      # Icon definitions
│   └── img/
│       ├── bg.png                        # Background image
│       ├── hero.png                      # Hero section image
│       ├── avatar.png                    # User avatar
│       ├── send_icon.png                 # Send message icon
│       ├── user_icon.png                 # User message icon
│       └── gemini_icon.png               # AI response icon
└── node_modules/                         # Dependencies (auto-generated)
```

---

## Key Components & Functionality

### 1. **App Component** (`src/App.js`)

**Purpose**: Main entry point and routing logic

**Key Features**:
- Active tab state management (`active`, `setActive`)
- Dynamic component rendering based on active tab
- 4-second loading screen display
- Main layout with navigation and content area

**Routes/Tabs**:
- Tab 1: Home (Landing page)
- Tab 2: Medical Consultation (MedicalConsultation component)
- Tab 3: Mental Wellness (MentalWellness component)

**Props Passed**: 
- `updateActive` function to child components

**Styling**:
- Full viewport height layout
- Background image support
- Glassmorphic effect on main content
- Custom scrollbar styling

---

### 2. **Home Component** (`src/Components/Home/Home.js`)

**Purpose**: Landing page with feature selection

**Key Features**:
- Hero section with introduction text and image
- Three feature cards with descriptions:
  1. Symptom Analysis - AI-powered symptom help
  2. Mind-Bot - Mental wellness companion
  3. Consult Doctor - Coming soon feature
- Dynamic message display for unavailable features
- Click handlers to navigate to feature components

**State Management**:
- `selectedComponent` - Track which feature is clicked
- `message` - Toast message for coming soon features

**Functionality**:
- Card click handlers trigger tab switching
- Auto-hide message after 3 seconds
- Responsive card layout

---

### 3. **MedicalConsultation Component** (`src/Components/SymptomAnalysis/MedicalConsultation.js`)

**Purpose**: Primary chat interface for medical symptom analysis

**Key Features**:
- Chat interface with message history
- User messages and AI responses displayed separately
- Real-time typing indicator during AI processing
- Input field with Enter key support
- Send button with icon
- New Chat button to reset conversation
- Warning disclaimer about professional consultation

**Context Usage**:
- Consumes `Context` (medical consultation context)
- Functions: `onSent`, `messages`, `resetChat`, `loading`, `resultData`, `setInput`, `input`

**User Interaction Flow**:
1. User types symptom description
2. Press Enter or click send icon
3. Message added to history with user icon
4. Loading state shows "Typing..." with animation
5. AI response displays with gemini icon
6. HTML-formatted content (bold, line breaks, bullets)

**UI Components**:
- Input field with placeholder "Share your thoughts here"
- Send button with icon
- Message display area with chat history
- Loading animation (3 horizontal bars)
- New Chat button for fresh conversation

---

### 4. **MentalWellness Component** (`src/Components/MentalWellness/MentalWellness.js`)

**Purpose**: Chat interface for mental wellness support

**Key Features**:
- Identical UI structure to MedicalConsultation
- Separate context (MentalWellnessContext)
- Specialized for mental health queries
- Same chat interface pattern
- Warning disclaimer about professional help

**Context Usage**:
- Consumes `MentalWellnessContext`
- Functions: `onSent`, `messages`, `resetChat`, `loading`, `resultData`, `setInput`, `input`

**Key Difference from Medical**:
- Different system prompt (mental wellness focused)
- Different greeting message ("How are you feeling today 😀??")
- Different component name ("Mind-Bot")

---

### 5. **Navigation Component** (`src/Components/Navigation/Navigation.js`)

**Purpose**: Sidebar navigation with menu items

**Key Features**:
- User profile section with avatar
- Navigation menu items
- Active state highlighting for current tab
- Coming soon feature handling with toast
- Menu items from `menuItems.js` utility

**Props**:
- `active` - Current active tab ID
- `setActive` - Function to change active tab

**Menu Items Logic**:
- Maps through menuItems array
- Highlights active menu item
- Shows "Coming Soon" toast for unavailable features

**Styling**:
- Glassmorphic sidebar (blur effect)
- Rounded borders
- Responsive spacing
- Active state highlighting with CSS

---

### 6. **LoadingScreen Component** (`src/Components/LoadingScreen/LoadingScreen.js`)

**Purpose**: Initial splash/loading screen

**Features**:
- 4-second display on app startup
- Brand presentation
- Loading animation

---

## Dependencies & Libraries

### Core React Ecosystem
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | Core UI library |
| react-dom | ^18.2.0 | React DOM rendering |
| react-scripts | 5.0.1 | CRA build tooling |

### Styling Libraries
| Package | Version | Purpose |
|---------|---------|---------|
| styled-components | ^6.1.8 | CSS-in-JS component styling |
| tailwindcss | ^3.4.3 | Utility CSS framework |

### UI & Interaction
| Package | Version | Purpose |
|---------|---------|---------|
| react-icons | ^5.1.0 | SVG icons collection |
| react-datepicker | ^6.6.0 | Date picker component |
| react-toastify | ^10.0.5 | Toast notifications |

### Data & Charts
| Package | Version | Purpose |
|---------|---------|---------|
| chart.js | ^4.4.2 | Charting library |
| react-chartjs-2 | ^5.2.0 | React ChartJS wrapper |
| moment | ^2.30.1 | DateTime manipulation |

### HTTP & API
| Package | Version | Purpose |
|---------|---------|---------|
| axios | ^1.6.8 | HTTP client |
| @openrouter/sdk | ^0.12.24 | OpenRouter API SDK |

### AI/ML
| Package | Version | Purpose |
|---------|---------|---------|
| @google/generative-ai | ^0.8.0 | Google AI API |

### Backend & Database
| Package | Version | Purpose |
|---------|---------|---------|
| firebase | ^10.11.0 | Backend services |

### Testing
| Package | Version | Purpose |
|---------|---------|---------|
| @testing-library/react | ^13.4.0 | React testing utilities |
| @testing-library/jest-dom | ^5.17.0 | DOM matchers |
| @testing-library/user-event | ^13.5.0 | User interaction simulation |
| web-vitals | ^2.1.4 | Performance metrics |

---

## API Integration

### OpenRouter Configuration

**File**: `src/config/openrouter.js`

**API Details**:
- **Base URL**: https://openrouter.ai/api/v1/chat/completions
- **Authentication**: Bearer token in Authorization header
- **API Key**: `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`
- **Default Model**: `openai/gpt-3.5-turbo`
- **Alternative Models**: 
  - Meta-Llama-2-70B-Chat
  - Other OpenRouter available models

**Function Signature**:
```javascript
async function runChat(userInput, systemPrompt = SYSTEM_PROMPT, sessionHistory = [])
```

**Parameters**:
- `userInput` (string): User's question/prompt
- `systemPrompt` (string): System instruction for AI behavior
- `sessionHistory` (array): Previous messages for context

**Request Structure**:
```json
{
  "model": "openai/gpt-3.5-turbo",
  "messages": [
    { "role": "system", "content": "system prompt" },
    { "role": "user", "content": "user message" },
    { "role": "assistant", "content": "previous response" }
  ]
}
```

**Response Processing**:
1. Extracts text from `data.choices[0].message.content`
2. Converts markdown bold (`**text**`) to HTML (`<b>text</b>`)
3. Replaces double newlines with paragraph tags
4. Converts single newlines to `<br/>`
5. Formats bullet points with line breaks

**Error Handling**:
- Checks for API response status
- Validates API key existence
- Returns descriptive error messages
- Logs errors to console

---

### Firebase Configuration

**File**: `src/firebase.js`

**Services Initialized**:
1. **Firestore Database** - Data persistence
2. **Analytics** - User behavior tracking

**Configuration**:
- Uses environment variables for sensitive data
- Config variables:
  - `REACT_APP_FIREBASE_API_KEY`
  - `REACT_APP_FIREBASE_AUTH_DOMAIN`
  - `REACT_APP_FIREBASE_PROJECT_ID`
  - `REACT_APP_FIREBASE_STORAGE_BUCKET`
  - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
  - `REACT_APP_FIREBASE_APP_ID`
  - `REACT_APP_FIREBASE_MEASUREMENT_ID`

**Exported**:
- `db` - Firestore instance for database operations

---

## State Management & Context

### 1. **Context.js** (Medical Consultation Context)

**Purpose**: Manage medical consultation chat state

**Provider**: `ContextProvider`

**State Variables**:
- `input` (string) - Current input text
- `recentPrompt` (string) - Last sent prompt
- `prevPrompts` (array) - Previous conversation prompts
- `messages` (array) - Chat message history
  - Structure: `[{ role: 'user'|'assistant', content: string }]`
- `showResult` (boolean) - Display results section
- `loading` (boolean) - AI processing state
- `resultData` (string) - Current AI response

**Functions**:
- `onSent(prompt)` - Send message and get AI response
- `resetChat()` - Clear conversation state
- `formatResponse(response)` - Format AI response with HTML

**System Prompt**:
- Specialized for medical queries
- Rejects mental health questions
- Provides symptom analysis, precautions, when to see doctor
- Keeps responses 100-120 words
- Formats with bold, bullets, line breaks

**Context Value Provided**:
```javascript
{
  prevPrompts,
  setPrevPrompts,
  messages,
  resetChat,
  onSent,
  setRecentPrompt,
  recentPrompt,
  showResult,
  loading,
  resultData,
  setInput,
  input
}
```

---

### 2. **MentalWellnessContext.js** (Mental Wellness Context)

**Purpose**: Manage mental wellness chat state

**Provider**: `MentalWellnessContextProvider`

**State Variables**: 
- Identical structure to Context.js

**Functions**:
- `onSent(prompt)` - Send message and get AI response
- `resetChat()` - Clear conversation state
- `formatResponse(response)` - Format AI response

**System Prompt**:
- Specialized for mental health and emotional well-being
- Rejects physical health questions
- Provides emotional support, coping strategies, wellness tips
- Guides users to professional help when needed
- Keeps responses 100-120 words
- Same formatting structure

**Key Difference**:
- Different system prompt guidance
- Focused on emotional wellness vs. medical diagnosis

---

### 3. **AIContext.js** (AI Context)

**Purpose**: Global AI-related state (implementation details not shown)

**Provider**: `AIContextProvider`

---

### 4. **FilterContext.js** (Filter Context)

**Purpose**: Manage filtering logic (implementation details not shown)

**Provider**: `FilterContextProvider`

---

### 5. **globalContext.js** (Global Context)

**Purpose**: Shared global state across application

---

## Context Provider Hierarchy

```
index.js
└── ContextProvider (Medical Chat)
    └── AIContextProvider (AI State)
        └── MentalWellnessContextProvider (Mental Wellness Chat)
            └── FilterContextProvider (Filtering)
                └── GlobalStyle
                └── App
```

**Initialization in index.js**:
```javascript
root.render(
  <ContextProvider>
    <AIContextProvider>
      <MentalWellnessContextProvider>
        <FilterContextProvider>
          <GlobalStyle />
          <App />
        </FilterContextProvider>
      </MentalWellnessContextProvider>
    </AIContextProvider>
  </ContextProvider>
);
```

---

## Styling & UI Framework

### Styled Components Usage

**Global Styling** (`src/styles/GlobalStyle.js`):
- ResetCSS for browser defaults
- Font imports
- Body styling

**Component Styling Examples**:

**AppStyled** (`App.js`):
```javascript
- Full viewport height
- Background image
- Glassmorphic main content (blur, transparency, border)
- Custom scrollbar hiding
- Responsive flex layout
```

**NavStyled** (`Navigation.js`):
- Sidebar width 336px
- Glassmorphic design
- Flexbox layout
- User profile section (100px height)
- Menu items with hover effects
- Active state highlighting

**MentStyled** (`MentalWellness.js`, `MedicalConsultation.js`):
- Chat container layout
- Navigation header
- Message display area
- Input area at bottom
- Chat entry styling with role-based classes
- Loading animation (3 horizontal lines)

**Layout Components** (`src/styles/Layouts.js`):
- `MainLayout` - Main container with sidebar + content
- `InnerLayout` - Inner content container

### Tailwind CSS

**Configuration**: `tailwind.config.js`
- Custom theme configuration
- Plugin support
- Extended utilities

### Custom CSS

**File**: `src/index.css`
- Additional global styles
- Override defaults if needed
- Font definitions

---

## System Prompts & AI Configuration

### Medical Consultation System Prompt

**Location**: `src/context/Context.js`

**Prompt Text**:
```
You are an AI medical health assistant for students. ONLY answer queries related to physical health, medical conditions, symptoms, and medical advice.

REJECT and DO NOT answer:
- Physical health symptoms (use Medical Consultation instead)
- Medical conditions and diseases
- Physical disease treatment
- Medication advice
- Diagnoses of physical illnesses
- Do not answer any query which is not related to health and medical advice and tell the logger to ask a medical query
- Do not answer for any query asking for any recipe or process to make any dish

For valid mental wellness queries, provide:
• emotional support and understanding
• coping strategies and techniques
• wellness tips and mindfulness practices
• when to seek professional help
• resources and support services

Rules:
- No medical diagnosis or physical health advice
- Keep response between 100-120 words
- If query is physical health/medical related, politely decline and suggest Medical Consultation
- Be empathetic and supportive
- FORMAT YOUR RESPONSE WITH PROPER LINE BREAKS AND STRUCTURE
- Use newlines (\n) to separate different sections
- Use bullet points with • for lists
- Use bold with ** for important terms
- Make the response visually organized and easy to read
```

**Note**: The prompt has some contradictions (mentions rejecting physical health but also says to provide support for mental wellness queries) which should be clarified.

---

### Mental Wellness System Prompt

**Location**: `src/context/MentalWellnessContext.js`

**Prompt Text**:
```
You are an AI mental wellness companion for students. ONLY answer queries related to mental health, emotional well-being, stress management, anxiety, depression, and psychological support.

REJECT and DO NOT answer:
- Physical health symptoms (use Medical Consultation instead)
- Medical conditions and diseases
- Physical disease treatment
- Medication advice
- Diagnoses of physical illnesses

For valid mental wellness queries, provide:
• emotional support and understanding
• coping strategies and techniques
• wellness tips and mindfulness practices
• when to seek professional help
• resources and support services

Rules:
- No medical diagnosis or physical health advice
- Keep response between 100-120 words
- If query is physical health/medical related, politely decline and suggest Medical Consultation
- Be empathetic and supportive
- FORMAT YOUR RESPONSE WITH PROPER LINE BREAKS AND STRUCTURE
- Use newlines (\n) to separate different sections
- Use bullet points with • for lists
- Use bold with ** for important terms
- Make the response visually organized and easy to read
```

---

### Default System Prompt (OpenRouter Config)

**Location**: `src/config/openrouter.js`

```
You are an AI healthcare assistant for students. dont answer anything which is not related to health or medical.

Provide:
• possible reasons for symptoms
• basic precautions
• when to see a doctor

Rules:
- No medical diagnosis
- Keep response between 100-120 words
- Dont answer anything which is not related to health or medical
- FORMAT YOUR RESPONSE WITH PROPER LINE BREAKS AND STRUCTURE
- Use newlines (\n) to separate different sections
- Use bullet points with • for lists
- Use bold with ** for important terms
- Make the response visually organized and easy to read
```

---

## How to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git (for cloning)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd mediassist
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with:
   ```
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   REACT_APP_OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. **Start Development Server**:
   ```bash
   npm start
   # or
   yarn start
   ```
   - App opens at `http://localhost:3000`
   - Auto-reloads on file changes

5. **Build for Production**:
   ```bash
   npm run build
   # or
   yarn build
   ```
   - Creates optimized build in `build/` folder
   - Ready for deployment

### Available Scripts

- **`npm start`** - Start development server
- **`npm run build`** - Create production build
- **`npm test`** - Run test suite in watch mode
- **`npm run eject`** - Eject from CRA (one-way operation)

### Deployment Notes

- **Proxy Configuration**: `package.json` has proxy to external API
  ```
  "proxy": "https://diagnoze-api.onrender.com/predict"
  ```
- **Build Output**: Minified with content hashing
- **Browser Support**: Last 2 versions of major browsers

---

## Current Features

### 1. **Landing Page (Home)**
- Hero section with application introduction
- Three feature cards
- Navigation to feature modules
- Coming soon notice for unavailable features

### 2. **Medical Consultation (Medi-Assist)**
- Chat interface for symptom analysis
- AI-powered response generation
- Message history management
- New chat/reset functionality
- Loading indicators during processing
- Warning about professional medical consultation

### 3. **Mental Wellness (Mind-Bot)**
- Chat interface for mental health support
- Emotional support and coping strategies
- Resources and guidance suggestions
- Message history
- New chat functionality
- Professional help guidance

### 4. **Navigation & Routing**
- Sidebar navigation with menu items
- Tab-based routing
- Active state indication
- Responsive navigation

### 5. **Session Management**
- Message history per conversation
- Previous prompts tracking
- Chat reset functionality
- Loading states

### 6. **User Interface**
- Glassmorphic design
- Responsive layout
- Icon integration
- Toast notifications
- Chat message formatting (bold, bullets, line breaks)

---

## Limitations & Future Scope

### Current Limitations

1. **API Key Exposure**
   - OpenRouter API key hardcoded in `openrouter.js`
   - Should be moved to environment variables
   - Security risk in production

2. **System Prompt Confusion**
   - Medical consultation prompt contains contradictory instructions
   - Needs clarification and refinement

3. **Limited Features**
   - Doctor consultation not implemented (coming soon)
   - No user authentication system
   - No persistent data storage (Firebase not utilized)
   - No user profile management

4. **Error Handling**
   - Basic error messages
   - Limited error recovery options
   - No retry mechanisms

5. **AI Response Limitations**
   - Fixed response length (100-120 words)
   - Limited context history
   - No conversation persistence across sessions

6. **UI/UX**
   - Not fully responsive for mobile devices
   - Limited accessibility features
   - No dark mode option
   - No language localization

7. **Testing**
   - No unit tests implemented
   - No integration tests
   - No E2E tests

### Future Enhancement Scope

1. **Authentication & User Management**
   - Firebase Authentication integration
   - User profiles and history
   - Persistent conversation storage

2. **Doctor Consultation**
   - Doctor directory integration
   - Appointment scheduling
   - Real-time consultation
   - Rating and reviews system

3. **Health Records**
   - Medical history tracking
   - Prescription management
   - Lab result tracking
   - Health metrics dashboard

4. **Enhanced AI**
   - Better context understanding
   - Multi-turn conversation persistence
   - Personalized responses
   - Integration with medical databases

5. **Analytics & Insights**
   - User health trends
   - Common symptoms analysis
   - Wellness dashboard
   - Statistics and reports

6. **Mobile App**
   - React Native implementation
   - Offline functionality
   - Push notifications

7. **Accessibility**
   - WCAG compliance
   - Screen reader support
   - Keyboard navigation

8. **Testing & Quality**
   - Unit test coverage
   - Integration tests
   - Performance optimization

9. **Security**
   - API key management
   - Data encryption
   - Privacy compliance (HIPAA, GDPR)

---

## File-by-File Breakdown

### `package.json`
**Type**: Configuration
**Content**:
- Project metadata (name: frontend, version: 0.1.0)
- Production dependencies (18 packages)
- Dev dependencies (1 package: tailwindcss)
- Build scripts configuration
- ESLint configuration
- Browser compatibility matrix
- Proxy configuration for API

---

### `tailwind.config.js`
**Type**: Configuration
**Content**:
- Tailwind CSS customization
- Theme extensions
- Plugin configurations

---

### `src/index.js`
**Type**: Entry Point
**Content**:
- React 18 root rendering
- Context provider wrapping
- 4 context providers initialization:
  1. ContextProvider
  2. AIContextProvider
  3. MentalWellnessContextProvider
  4. FilterContextProvider
- GlobalStyle injection
- App component rendering
- Target: `#root` div in HTML

---

### `src/App.js`
**Type**: Root Component
**Key Features**:
- State: `active`, `loadingApp`, `fil`
- 4-second loading screen
- Tab-based routing (3 main tabs)
- Glassmorphic UI design
- Navigation and content layout

---

### `src/firebase.js`
**Type**: Configuration
**Content**:
- Firebase app initialization
- Firestore database setup
- Analytics initialization
- Exports `db` for use in app

---

### `src/context/Context.js`
**Type**: Context Provider
**Key Features**:
- Medical consultation state management
- 9 state variables
- `onSent` function for chat
- Message formatting
- Error handling
- System prompt for medical AI

---

### `src/context/MentalWellnessContext.js`
**Type**: Context Provider
**Key Features**:
- Mental wellness state management
- Similar structure to Context.js
- Different system prompt
- Same chat functionality
- Different greeting message

---

### `src/context/AIContext.js`
**Type**: Context Provider (implementation not shown)
**Purpose**: AI-related global state

---

### `src/context/FilterContext.js`
**Type**: Context Provider (implementation not shown)
**Purpose**: Filtering logic state

---

### `src/context/globalContext.js`
**Type**: Context Provider (implementation not shown)
**Purpose**: Global shared state

---

### `src/config/openrouter.js`
**Type**: API Configuration
**Key Features**:
- OpenRouter API setup
- Model selection (GPT-3.5-Turbo)
- Authentication header configuration
- `runChat` async function
- Response formatting
- Error handling

---

### `src/Components/Home/Home.js`
**Type**: Page Component
**Key Features**:
- Landing page with hero section
- Three feature cards
- Component selection logic
- Message toast display
- Styled with styled-components

---

### `src/Components/Navigation/Navigation.js`
**Type**: Layout Component
**Key Features**:
- Sidebar navigation
- Menu item mapping
- Active state highlighting
- Toast notification for coming soon
- User profile section
- Styled-components for glassmorphic design

---

### `src/Components/SymptomAnalysis/MedicalConsultation.js`
**Type**: Page Component
**Key Features**:
- Medical consultation chat interface
- Message display with user/AI icons
- Input handling with Enter support
- Loading indicator
- New chat button
- Disclaimer text

---

### `src/Components/MentalWellness/MentalWellness.js`
**Type**: Page Component
**Key Features**:
- Mental wellness chat interface
- Same structure as MedicalConsultation
- Different context provider
- Different greeting and title
- Mental wellness focused

---

### `src/Components/LoadingScreen/LoadingScreen.js`
**Type**: Component (implementation not shown)
**Purpose**: Initial app loading screen

---

### `src/styles/GlobalStyle.js`
**Type**: Global Styles
**Content**:
- Global CSS resets
- Font configurations
- Body styling

---

### `src/styles/Layouts.js`
**Type**: Layout Components
**Content**:
- `MainLayout` - Main app container with sidebar and content
- `InnerLayout` - Inner content wrapper

---

### `src/utils/menuItems.js`
**Type**: Data/Constants
**Content**:
- Menu items array with:
  - id
  - title
  - icon

---

### `src/utils/doctors.js`
**Type**: Data/Constants (implementation not shown)
**Purpose**: Doctor directory/information

---

### `src/utils/items.js`
**Type**: Data/Constants (implementation not shown)
**Purpose**: General items/data

---

### `src/utils/Icons.js`
**Type**: Utilities (implementation not shown)
**Purpose**: Icon definitions and exports

---

### `src/index.css`
**Type**: Global Styles
**Content**:
- Additional global CSS
- Custom font families
- Reset styles

---

### `public/index.html`
**Type**: HTML Template
**Content**:
- Root div `#root`
- Metadata
- PWA manifest link

---

### `public/manifest.json`
**Type**: PWA Configuration
**Content**:
- App name, description
- App icons
- Display mode
- Start URL

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Dependencies | 18 |
| Dev Dependencies | 1 |
| Components | 6+ |
| Context Providers | 5 |
| API Integrations | 2 (OpenRouter, Firebase) |
| Pages/Tabs | 3 |
| State Variables per Context | 7+ |

---

## Conclusion

MediAssist is a React-based healthcare consultation application utilizing:
- **Modern React Architecture**: Components + Context API for state
- **Styled-Components**: CSS-in-JS for dynamic styling
- **OpenRouter API**: AI-powered chat for medical and mental wellness
- **Firebase**: Backend services and analytics
- **Responsive Design**: Glassmorphic UI with Tailwind CSS

The application is well-structured with clear separation of concerns, proper context management, and modular components. Future improvements should focus on security, error handling, persistent data storage, and mobile responsiveness.

---

**Document Version**: 1.0
**Last Updated**: May 19, 2026
**Created by**: AI Documentation Generator
