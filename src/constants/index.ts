import { highlightFifthView, highlightFirstView, highlightFourthView, highlightSecondView, highlightSixthView, highlightThirdView } from "../utils";

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
