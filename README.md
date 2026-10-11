# AcraPath Mobile Application

[![React Native](https://img.shields.io/badge/React%20Native-0.87.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.13.0-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?style=flat-square&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![PostHog](https://img.shields.io/badge/PostHog-Analytics-1D63FF?style=flat-square&logo=posthog&logoColor=white)](https://posthog.com)
[![Version](https://img.shields.io/badge/Version-2.3.0-success?style=flat-square)](#)

> **Lead Developer**: **Prashant Kumar** | **Application ID**: `com.acrapath`

---

## 📌 Project Overview

**AcraPath** is a high-performance cross-platform recruitment platform built with **React Native (0.87.1)** and **React 19**. It features a unified dual-mode experience connecting job seekers (**Candidates**) and employers (**Recruiters**).

### Core Features
- **Dual-Role Switching**: Seamless toggle between Candidate and Recruiter modes with dynamic navigation.
- **Candidate Hub**: Search bar with suggestion autocomplete, dynamic filter drawer, infinite scrolling job feed with skeleton loaders, and detailed role specifications.
- **Recruiter Wizard**: 3-step structured job posting flow (Details, Preferences, Description), multi-location support, and salary confidentiality settings.
- **Security & Analytics**: Hardware-backed token encryption via `react-native-keychain`, centralized Axios interceptors, and PostHog session replay & analytics.

---

## 🏗️ Architecture & Tech Stack

```
[ Presentation Layer ]  React 19, React Native 0.87.1, React Navigation v7, Lucide Icons
          │
[ State & Sync Layer ]  Redux Toolkit (jobPostSlice, jobFilterSlice) + TanStack Query v5
          │
[ Network & Security ]  apiClient (Axios Interceptors) + react-native-keychain (JWT)
          │
[ Backend Services ]   REST API (https://acrapathapi.schooldb.in) + PostHog Analytics
```

- **Navigation**: Dual-stack routing in `src/main.tsx` (Candidate Bottom Tabs vs. Recruiter Stack).
- **Client Cache**: TanStack React Query v5 handles server pagination and caching (`useJobs`, `useJobDetails`).
- **Form State**: Redux Toolkit manages multi-step posting and active search filter criteria.
- **Centralized API**: Routes registered in `src/app/lib/EndPoint.ts`, executed through `src/app/lib/apiClient.ts` with auto-injected Bearer tokens.

---

## ⚙️ Environment Configuration

Define the following in your root `.env` file:

```env
API_URL=https://acrapathapi.schooldb.in
POSTHOG_API_KEY=phc_t8sYLHCCUPij9ouFk6zk576GMqHjowudUig2Sj6Cnmiy
POSTHOG_HOST=https://eu.i.posthog.com
```

| Variable | Description |
| :--- | :--- |
| `API_URL` | Base endpoint for the AcraPath REST API |
| `POSTHOG_API_KEY` | Public key for PostHog event tracking |
| `POSTHOG_HOST` | PostHog telemetry ingestion host |

---

## 🚀 Setup & Run

### 1. Prerequisites
- **Node.js**: `>= 22.11.0` | **Java**: JDK 17
- **Android**: Android Studio, Android SDK (API 34+), Build-Tools 37.0.0
- **iOS** (macOS): Xcode 15+, CocoaPods & Bundler

### 2. Installation
```bash
npm install

# For iOS only:
bundle install && bundle exec pod install --project-directory=ios
```

### 3. Start Metro Bundler
```bash
npm start
# To reset cache if needed:
npm start -- --reset-cache
```

### 4. Run Application
```bash
# Android (Emulator or connected USB device)
npm run android

# iOS (Simulator)
npm run ios
```

### 5. Production Builds
```bash
# Android Release APK
cd android && ./gradlew assembleRelease

# Android App Bundle (AAB for Play Store)
cd android && ./gradlew bundleRelease
```

---

## 🤖 Multi-Agent Run & AI Assistant Workflow

AcraPath supports autonomous multi-agent development workflows (Antigravity, GSD, pair-programming agents). Follow these operational boundaries:

### Agent Responsibilities
| Agent Domain | Scope | Constraints |
| :--- | :--- | :--- |
| **UI Agent** | `src/components/`, `src/screens/` | Functional components only, use `useTheme` design tokens, responsive layouts. |
| **State Agent** | `src/stores/` | Pure Redux reducers, typed actions, avoid side-effects in slices. |
| **API Agent** | `src/app/lib/`, `src/hooks/` | Register routes in `EndPoint.ts`, use TanStack Query hooks, token via Keychain. |
| **Native Agent** | `android/`, `ios/` | Maintain Gradle dependencies, SDK versions, and signing configurations. |

### Quality Gates for AI Execution
Run before submitting code changes:
```bash
npm run lint         # Check code quality and style
npx tsc --noEmit     # Verify TypeScript types
npm test             # Run test suites
```

---

## 🔗 Key Endpoints & Troubleshooting

- `auth`: `/api/auth/login`, `/api/auth/register`
- `jobs`: `/api/jobs` (create & paginated list), `/api/jobs/:id` (details)
- `search`: `/api/locations/suggest`, `/api/keywords/suggest`

| Issue | Quick Fix |
| :--- | :--- |
| **Metro bundler stale cache** | Run `npm start -- --reset-cache` |
| **Gradle lock or build failure** | Run `cd android && ./gradlew clean --stop && cd ..` |
| **Keychain reinstall error** | Uninstall existing debug APK from device before reinstalling |

---

## 👨‍💻 Author

- **Developer**: **Prashant Kumar**
- **Project**: AcraPath Mobile (`v2.3.0`)
