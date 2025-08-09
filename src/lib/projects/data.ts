export interface Project {
  title: string;
  description: string;
  image?: string;
  alt?: string;
  previewLink?: string;
  sourceLink?: string;
  downloadLink?: string;
}

export const projects: Project[] = [
  {
    title: "Wellbe",
    image: "/projects/wellbe.png",
    alt: "Wellbe Image",
    previewLink: "https://wellbe-dz.netlify.app/",
    description:
      "Wellbe is a platform that connects patients with healthcare providers and allows them to book appointments, access their medical records, and communicate with their healthcare providers.",
  },
  {
    title: "Crafti E-Commerce",
    image: "/projects/crafti.png",
    alt: "Crafti E-Commerce",
    description:
      "A simple e-commerce website with a simple design and user experience.",
  },
  {
    title: "HealthCompass Desktop Application",
    alt: "HealthCompass Desktop Application",
    image: "/projects/healthCompass.png",
    description:
      "A simple desktop application that helps doctors track and manage their patients",
  },
  {
    title: "CV Maker",
    image: "/projects/CvMaker.png",
    alt: "Cv maker",
    description:
      "A modern look website that helps users create their CVs online and export them as PDFs",
  },

  {
    title: "Weather App",
    image: "/projects/weatherApp.png",
    alt: "Weather Application",
    sourceLink: "https://github.com/PLMohamed/Weather-App",
    downloadLink: "https://github.com/PLMohamed/Weather-App/releases",
    description:
      "A simple desktop application that helps user track the weather in their location and other locations, with features like temperature , time and there is also tray , autoLaunch , settings and notification support.",
  },
  {
    title: "Super tic tac toe",
    image: "/projects/SuperTicTacToe.png",
    alt: "Super Tic Tac Toe",
    sourceLink: "https://github.com/PLMohamed/Super-Tic-Tac-Toe",
    downloadLink: "https://github.com/PLMohamed/Super-Tic-Tac-Toe/releases",
    description:
      "A simple desktop application that helps user play the classic tic tac toe game with a twist, the game is played on a 3x3 grid of 3x3 grids, and the player has to win 3 grids in a row to win the game.",
  },
  {
    title: "Todo List App",
    sourceLink: "https://github.com/PLMohamed/Todo-list-",
    description:
      "A simple desktop application that helps user track their daily tasks and manage them, with features like adding and deleting  tasks, and also the ability to mark tasks as done.",
  },
];
