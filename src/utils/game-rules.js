export const getTimeForLevel = (level) => {
  switch (level) {
    case 0:
      return 130;
    case 1:
      return 120;
    case 2:
      return 110;
    case 3:
      return 100;
    case 4:
      return 90;
    case 5:
      return 80;
    case 6:
      return 70;
    case 7:
      return 60;
    case 8:
      return 50;
    case 9:
      return 40;
    case 10:
      return 30;
    default:
      return 0;
  }
};

export const getPointsForLevel = (level) => {
  switch (level) {
    case 0:
      return 100;
    case 1:
      return 120;
    case 2:
      return 140;
    case 3:
      return 160;
    case 4:
      return 180;
    case 5:
      return 200;
    case 6:
      return 220;
    case 7:
      return 240;
    case 8:
      return 260;
    case 9:
      return 280;
    case 10:
      return 300;
    default:
      return 0;
  }
};

export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
