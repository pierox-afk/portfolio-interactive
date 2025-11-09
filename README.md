# Piero Sansossio's Interactive Portfolio

Welcome to my interactive portfolio, an immersive web experience inspired by the world of Minecraft. This project was built from the ground up to showcase my skills as a Frontend Developer, combining code, creativity, and a passion for unique user interfaces.

**[➡️ View the Live Demo Here](https://pierox-afk.github.io/portfolio-interactive/)**

## ✨ Features

- **Immersive Minecraft Theme:** The entire portfolio is designed to feel like you're navigating through different dimensions of Minecraft.
- **Multi-Dimensional Navigation:**
  - **Overworld:** The main menu where your journey begins.
  - **Nether:** A fiery dimension showcasing my main projects.
  - **The End:** A mysterious, cosmic space to view my CV, complete with an animated portal transition.
- **Interactive UI Elements:**
  - **About Me:** Presented as an interactive, flippable book.
  - **Contact:** A unique Villager Trading UI where you can "trade" for my contact information.
- **Dynamic Content:** All text, project data, and resume information is loaded from a central `data.json` file.
- **Bilingual Support:** Easily switch between English and Spanish.
- **Sound & Music:** Ambient sounds and UI click effects to enhance the experience.
- **Built with Vanilla JS:** All interactions and animations are coded with pure, dependency-free JavaScript.

## 📂 Project Structure

The project is organized to be simple and maintainable:

```
/
├── index.html            # Main HTML file, contains all sections and scripts.
├── styles.css            # All CSS styles for the application.
├── main.js               # Three.js scene setup for the background (if applicable).
├── data.json             # Centralized data for text, projects, and resume.
└── assets/
    ├── textures/         # All images, icons, and textures.
    ├── sounds/           # Sound effects and music.
    └── fonts/            # Custom fonts like the Minecraft font.
```

## 🚀 Getting Started

To run this project locally, follow these simple steps:

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/pierox-afk/portfolio-interactive.git
    ```

2.  **Navigate to the project directory:**

    ```sh
    cd portfolio-interactive
    ```

3.  **Run a local server:**
    Because the project fetches data from `data.json`, you need to run it on a local server to avoid CORS issues. If you have Python installed, you can use:

    ```sh
    python -m http.server
    ```

    Or, if you have Node.js and `live-server` installed:

    ```sh
    live-server
    ```

4.  Open your browser and go to `http://localhost:8000` (or the address provided by your server).

## 🔧 Customization

All the content in this portfolio can be easily customized by editing the **`data.json`** file.

- **Personal Information:** Update your name, title, and profile summary.
- **Projects:** Add, remove, or modify projects in the `projects` array. Make sure to update titles, descriptions, links, and image paths.
- **Resume/CV:** Change your skills, experience, and education details in the `resume` object.

---

_This project is a creative work and is not affiliated with Mojang Studios._
