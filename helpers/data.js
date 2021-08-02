import mountFuji from "../public/mountFuji.jpg";
import tokyoTower from "../public/tokyoTower.jpg";
import harajuku from "../public/harajuku.jpg";
import shibuya from "../public/shibuya.jpg";
import foodpicker from "../public/foodpicker.jpg";
import foodpicker1 from "../public/foodpicker1.png";
import foodpicker2 from "../public/foodpicker2.png";
import wannabuy from "../public/wannabuy.png";
import wannabuy1 from "../public/wannabuy1.png";
import wannabuy2 from "../public/wannabuy2.png";

export const projects = [
  {
    title: "FoodPicker",
    subtitle: "Can't Decide What To Eat?",
    description:
      "Designed and built for people who have trouble deciding what to eat. Randomly generates a cuisine and a dish. Showcases images and provides recipes of different dishes with the help of the Unsplash and Edamam API.",
    technology: ["React", "Material UI", "Node.js", "Express.js"],
    image: "./foodpicker.jpg",
    img: foodpicker,
    img1: foodpicker1,
    img2: foodpicker2,
    link: "https://react-foodpicker-app.herokuapp.com",
    year: "2021",
    id: 0,
  },
  {
    title: "WannaBuy",
    subtitle: "Can't Find What To Buy?",
    description:
      "Designed for online shoppers to better keep track of interested items. Tired of having a million tabs open and struggling to find what to buy? Wannabuy is the website for you.",
    technology: [
      "HTML",
      "CSS",
      "Javascript",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    image: "./wannabuy.png",
    img: wannabuy,
    img1: wannabuy1,
    img2: wannabuy2,
    link: "https://powerful-journey-37111.herokuapp.com",
    year: "2020",
    id: 1,
  },
];

export const skills = [
  "JavaScript",
  "React/Redux",
  "Vue/Vuex",
  "Node.js",
  "Express.js",
  "jQuery",
  "Python",
  "SQL",
  "MongoDB",
  "Material UI",
];

export const images = [
  {
    src: mountFuji,
    title: "Mount Fuji",
    author: "aditya anjagi",
  },
  {
    src: tokyoTower,
    title: "Tokyo Tower",
    author: "Jezael Melgoza",
  },
  {
    src: harajuku,
    title: "Harajuku",
    author: "Elton Sa",
  },
  {
    src: shibuya,
    title: "Shibuya",
    author: "Jezael Melgoza",
  },
];
