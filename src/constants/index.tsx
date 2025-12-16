import React from "react";
import {
  blackImg,
  blueImg,
  highlightFifthView,
  highlightFirstView,
  highlightFourthView,
  highlightSecondView,
  highlightSixthView,
  highlightThirdView,
  whiteImg,
  yellowImg,
  titaniumImg1,
  titaniumImg2,
  titaniumImg3,
  titaniumImg4,
  camera2Video,
  camera1Video,
  camera3Video,
  camera4Video
} from "../utils";

export const highlightsSlides = [
  {
    id: 1,
    textLists: [
      "So fast. So fluid.",
      "Get a feel for the all-new",
      "Camera Control."
    ],
    video: highlightFirstView,
    videoDuration: 5
  },

  {
    id: 2,
    textLists: [
      "4K 120 fps Dolby Vision.",
      "4 studio-quality mics.",
      "A Pro studio in your pocket."
    ],
    video: highlightSecondView,
    videoDuration: 5
  },
  {
    id: 3,
    textLists: ["Thinner borders — for even larger", "displays. Brilliant."],
    video: highlightThirdView,
    videoDuration: 4
  },
  {
    id: 4,
    textLists: [
      "All-new A18 Pro chip. Unrivaled",
      "performance. Unprecedented",
      "efficiency."
    ],
    video: highlightFourthView,
    videoDuration: 3.63
  },
  {
    id: 5,
    textLists: ["A huge leap in battery life.", "Game on."],
    video: highlightFifthView,
    videoDuration: 3.5
  },
  {
    id: 6,
    textLists: [
      "The first iPhone designed",
      "for Apple Intelligence.",
      "Personal, private, powerful."
    ],
    video: highlightSixthView,
    videoDuration: 4
  }
];

export const models = [
  {
    id: 1,
    title: "iPhone 16 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg
  },
  {
    id: 2,
    title: "iPhone 16 Pro in Blue Titanium",
    color: ["#53596E", "#6395ff", "#21242e"],
    img: blueImg
  },
  {
    id: 3,
    title: "iPhone 16 Pro in White Titanium",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    img: whiteImg
  },
  {
    id: 4,
    title: "iPhone 16 Pro in Black Titanium",
    color: ["#454749", "#3b3b3b", "#181819"],
    img: blackImg
  }
];

export const sizes = [
  { label: '6.3"', value: "small" },
  { label: '6.9"', value: "large" }
];

export const titaniumCarouselData = [
  {
    id: 1,
    img: titaniumImg1,
    text: "iPhone 16 Pro Max has our largest iPhone display ever"
  },
  {
    id: 2,
    img: titaniumImg2,
    text: "The thinnest borders on any Apple product"
  },
  {
    id: 3,
    img: titaniumImg3,
    text: "Premium Grade 5 titanium is exceptionally durable"
  },
  {
    id: 4,
    img: titaniumImg4,
    text: "Four striking colors, from Black Titanium to new Desert Titanium"
  }
];

export const cameraControlData = [
  {
    id: 1,
    video: camera1Video,
    text: [
      <p
        key="0"
        className="font-semibold text-[17px]  text-custom-gray-200"
      >
        Click to launch the Camera app.
      </p>,
      <p
        key="1"
        className="font-semibold text-[17px] text-custom-gray-200"
      >
        Click again to{" "}
        <span className="text-custom-white-100">instantly take a photo</span>.
      </p>
    ]
  },
  {
    id: 2,
    video: camera2Video,
    text: [
      <p
        key="0"
        className="font-semibold text-[17px] leading-[1.1] text-custom-gray-200"
      >
        Click and hold to{" "}
        <span className="text-custom-white-100">start recording video</span>.
      </p>
    ]
  },
  {
    id: 3,
    video: camera3Video,
    text: [
      <p
        key="0"
        className="font-semibold text-[17px] leading-[1.1] text-custom-gray-200"
      >
        A light press{" "}
        <span className="text-custom-white-100">opens controls like zoom</span>.
      </p>
    ]
  },
  {
    id: 4,
    video: camera4Video,
    text: [
      <p
        key="0"
        className="font-semibold text-[17px] leading-[1.1] text-custom-gray-200"
      >
        With a double light press, you can{" "}
        <span className="text-custom-white-100">select another</span>
      </p>,
      <p
        key="1"
        className="font-semibold text-[17px] leading-[1.1] text-custom-gray-200"
      >
        <span className="text-custom-white-100">camera setting</span>. Then
        slide to adjust that setting.
      </p>
    ]
  }
];
