export interface Project {
  title: string;
  description: string;
  image?: string;
  alt?: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "Crafti E-Commerce",
    image: "/crafti.png",
    alt: "Crafti E-Commerce",
    link: "https://github.com/PLMohamed/Crafti",
    description:
      "A simple e-commerce website with a simple design and user experience.",
  },
  {
    title: "HealthCompass Desktop Application",
    alt: "HealthCompass Desktop Application",
    image: "/healthCompass.png",
    link: "https://github.com/PLMohamed/HealthCompass",
    description:
      "A simple desktop application that helps doctors track and manage their patients",
  },
  {
    title: "Todo List Web Application",
    link: "https://github.com/PLMohamed/next-todolist",
    description:
      "A simple web application that helps user track their daily tasks and manage them, with features like adding and deleting  tasks, and also the ability to mark tasks as done.",
  },
  {
    title: "CV Maker",
    image: "/CvMaker.png",
    alt: "Cv maker",
    link: "/",
    description:
      "A modern look website that helps users create their CVs online and export them as PDFs",
  },

  {
    title: "Weather App",
    image: "/weatherApp.png",
    alt: "Weather Application",
    link: "https://github.com/PLMohamed/Weather-App",
    description:
      "A simple desktop application that helps user track the weather in their location and other locations, with features like temperature , time and there is also tray , autoLaunch , settings and notification support.",
  },
  {
    title: "Super tic tac toe",
    image: "/SuperTicTacToe.png",
    alt: "Super Tic Tac Toe",
    link: "https://github.com/PLMohamed/Super-Tic-Tac-Toe",
    description:
      "A simple desktop application that helps user play the classic tic tac toe game with a twist, the game is played on a 3x3 grid of 3x3 grids, and the player has to win 3 grids in a row to win the game.",
  },
  {
    title: "Todo List App",
    link: "https://github.com/PLMohamed/Todo-list-",
    description:
      "A simple desktop application that helps user track their daily tasks and manage them, with features like adding and deleting  tasks, and also the ability to mark tasks as done.",
  },
];
