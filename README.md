# Melophiliacs Frontend

This is the official frontend for Melophiliacs, a web application designed for music lovers who want to dive deeper into their Spotify listening habits. It provides a clean, visual dashboard to display your top artists and albums based on your liked songs.

This project is built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/), and it interacts with the [Melophiliacs Core API](https://github.com/JP-Reddy/melophiliacs-core) to fetch data from Spotify.

## Features

- **Spotify Integration:** Securely log in with your Spotify account.
- **Top Artists Dashboard:** View a list of your top artists from your liked songs.
- **Top Albums Dashboard:** See a ranked list of the albums that appear most frequently in your liked songs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running instance of the [Melophiliacs Core API](https://github.com/JP-Reddy/melophiliacs-core).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/JP-Reddy/melophiliacs-frontend.git
    cd melophiliacs-frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Create an environment file:**

    Create a file named `.env.development` in the root of the project directory. This file will store the URL of your backend API.

    ```
    VITE_API_BASE_URL="http://127.0.0.1:8000"
    ```

    *Note: Ensure this URL matches the address where your backend server is running.*

4.  **Run the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```

5.  **Open the application:**

    The development server will start, typically on `http://127.0.0.1:5173`. Open this URL in your browser to use the application.

## How It Works

The application uses a secure OAuth2 flow handled by the backend. When you log in, the backend sets a secure, HTTP-only cookie in your browser. All subsequent requests from the frontend to the backend API are authenticated using this cookie. This is a robust and secure method that avoids storing tokens on the client-side.
