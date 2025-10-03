# FinWise Dashboard

FinWise is a modern, AI-powered personal finance dashboard designed to provide users with a clear and insightful overview of their financial activities. With tailored interfaces for both normal users and students, FinWise offers a range of tools to help manage budgets, track savings, and achieve financial goals.

<img width="815" height="724" alt="image" src="https://github.com/user-attachments/assets/228ced68-3b83-4dd6-b6a4-84ebbaf7b094" />


## ✨ Key Features

- **🔐 Secure Authentication**: Sign up and log in securely using Email & Password or with a single click via Google Sign-In, all powered by Firebase Authentication.
- ** dashboards**: Two distinct dashboard experiences tailored to the needs of different user types:
  - **Normal User Dashboard**: A comprehensive view with detailed expense tracking, income vs. expense analysis, trend analysis, savings projections, and investment growth charts.
  - **Student User Dashboard**: A simplified interface focusing on managing allowances, tracking fee payments, and providing relevant financial tips.
- **🤖 AI-Powered Finance Assistant**: An integrated chatbot that provides personalized financial advice, suggests budget plans, and offers savings tips using Google's generative AI.
- **🎯 Goal-Oriented Savings Tracker**: Set, visualize, and track progress towards personal financial goals like saving for a new gadget, a vacation, or an emergency fund.
- **📊 Interactive Charts & Reports**: A rich set of dynamic charts and reports to visualize spending habits, track savings progress, and generate monthly financial summaries.
- **💡 Financial Tools**:
  - **Budget Planner**: Generate a personalized budget plan based on your income and expenses.
  - **Savings Projector**: Forecast your savings growth over time based on your contributions and interest rates.
- **📱 Responsive Design**: A clean, modern, and fully responsive user interface built with Shadcn/UI and Tailwind CSS, ensuring a great experience on any device.
- **🌙 Light & Dark Mode**: Switch between light and dark themes to suit your preference.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Generative AI**: [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Charting**: [Recharts](https://recharts.org/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🏁 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/finwise-dashboard.git
cd finwise-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Firebase Setup

This project is configured to work with Firebase.

1.  Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2.  Enable **Firestore** and **Firebase Authentication** (with Email/Password and Google providers).
3.  Copy your Firebase project configuration and paste it into `src/firebase/config.ts`.
4.  Set up Firestore security rules to manage access to your data.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## 📁 Folder Structure

```
.
├── src
│   ├── app                 # Next.js App Router pages and layouts
│   ├── components          # Reusable UI components (Shadcn, custom)
│   ├── ai                  # Genkit flows for AI features
│   ├── firebase            # Firebase configuration, hooks, and providers
│   ├── hooks               # Custom React hooks
│   ├── lib                 # Utility functions and libraries
│   └── ...
├── docs
│   └── backend.json        # Data schema for Firebase
└── ...
```


This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## SCREENSHOTS 
1. Login / Sign Up page
<img width="815" height="724" alt="image" src="https://github.com/user-attachments/assets/fe5383b8-a586-4758-869f-8432dc9ddbdf" />
2. Normal User Interface 
<img width="1137" height="861" alt="image" src="https://github.com/user-attachments/assets/f7805f24-ea43-415e-9369-30bd1c4e8d85" />
<img width="1123" height="500" alt="image" src="https://github.com/user-attachments/assets/64d92321-acdb-4d2f-8562-f57d0df48bfa" />
3. Student User Interface
<img width="1205" height="817" alt="image" src="https://github.com/user-attachments/assets/8b4b9972-f9aa-4aad-b528-b76e83f0c6c0" />
<img width="1203" height="861" alt="image" src="https://github.com/user-attachments/assets/16f2e3a5-b25f-4a1a-b9ce-b2818f3723d0" />
<img width="1189" height="391" alt="image" src="https://github.com/user-attachments/assets/722d4aed-b577-47c1-92c8-a42871a18b1d" />




