# BhumiBandhu: Digital Land Record Management System

BhumiBandhu is a prototype application designed to modernize and secure land ownership records using digital technology, focusing on transparency, history tracking, and dispute resolution.

This project is built using a modern React/TypeScript stack and uses local browser storage for persistence (simulating a database connection).

## 🚀 Getting Started

Follow these steps to set up and run the BhumiBandhu application locally on your machine.

### Prerequisites

You must have the following software installed:

1. **Node.js & npm** (Node Package Manager) - <https://nodejs.org/>

2. **Git** - <https://git-scm.com/>

### 1. Clone the Repository

Open your terminal and clone the repository using the HTTPS link:

git clone https://github.com/Sonu1011/bhumi-digi-enhancements.git


### 2. Navigate to the Project Folder

Change directory into the newly cloned project:

cd bhumi-digi-enhancements


### 3. Install Dependencies

Install all required Node.js packages and libraries:

npm install


### 4. Run the Application

Start the development server using the defined `dev` script. This command uses **Vite** to compile and serve the application.

npm run dev


The application will now be running on a local port, typically **`http://localhost:5173/`**. Open this URL in your web browser.

## 🗺️ Site Map & Navigation

The application features a single-page structure managed by **React Router**. All main features are accessible via the top navigation bar.

| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home` | Landing page and project overview. |
| `/dashboard` | `Dashboard` | Key metrics, statistics, and overview of all land records. |
| `/add-land` | `AddLand` | Form for digitizing a new land record, owner, and official data. |
| `/history-disputes` | `HistoryDisputes` | Search function to verify land ownership history and track disputes. |
| `/measurement-tool` | `MeasurementTool` | Interface for simulating GPS/device connection and data capture. |
| `/map-view` | `MapView` | Visualization of all geo-tagged land records. |

## 🛠️ Technology Stack & Dependencies

This project is built on a modern, robust front-end stack.

### I. Core Frontend Framework & Language

| Technology | Type | Creator / Original Company | Official Documentation |
| :--- | :--- | :--- | :--- |
| **React** | JavaScript Library | Facebook (now Meta) | <https://react.dev/> |
| **TypeScript** | Programming Language Superset | Microsoft | <https://www.typescriptlang.org/> |
| **Vite** | Build Tool / Dev Server | Evan You (Creator of Vue.js) | <https://vitejs.dev/> |
| **React Router** | Routing Library | Remix (Acquired by Shopify) | <https://reactrouter.com/> |

### II. Styling, UI, and Utility Libraries

| Technology | Type | Creator / Original Company | Official Documentation |
| :--- | :--- | :--- | :--- |
| **Tailwind CSS** | CSS Framework | Adam Wathan, Steve Schoger | <https://tailwindcss.com/> |
| **Shadcn/ui** | Component Library | shadcn | <https://ui.shadcn.com/> |
| **Lucide** | Icon Library | Lucide Maintainers | <https://lucide.dev/> |
| **Sonner** | Toaster/Notification Library | Emil Kowalski | [https://sonner.emilkowalski.com/](https://sonner.emilkowalski.com/) |
| **TanStack Query** | Data Fetching & State Management | Tanner Linsley / TanStack | <https://tanstack.com/query/latest> |

### III. Data and Browser APIs

| Technology | Purpose | Notes / Origin |
| :--- | :--- | :--- |
| **Local Storage** | Data Persistence (Mock) | Standard Browser API (W3C) |
| **Geolocation API** | Location Capture | Standard Browser API (W3C) |
| **File API** | Document/File Handling | Standard Browser API (W3C) |

## 📝 Data Structure

The application uses a Context Provider (`LandRecordsContext`) to simulate data management. Data is initialized from `src/data/gandhiNagarData.ts` and persisted using **Browser Local Storage**.


