export interface Level {
    starNum: number;
    starSpeed: number;
    starSize: number;
    starColor: string;
    spaceColor: string;
    ufoSize: number;
    ufoColor: string;
    ufoSpeed: number;
    ufoChance: number;
    maxDepth: number;
    maxShips: number;
    cursorSpeed: number;
    boss?: boolean;
    bossHitsToKill?: number;
    bossUfoSize?: number;
  }
  
  export const levels: Level[] = [
    {
      starNum: 2000,
      starSpeed: 15.0,
      starSize: .5,
      starColor: "white",
      spaceColor: "black",
      ufoSize: 50,
      ufoColor: "silver",
      ufoSpeed: 1,
      ufoChance: 0.005,
      maxDepth: 500,
      maxShips: 10,
      cursorSpeed: 6,
    },
    {
      starNum: 2000,
      starSpeed: 15.0,
      starSize: 0.5,
      starColor: "white",
      spaceColor: "#021526",
      ufoSize: 50,
      ufoColor: "silver",
      ufoSpeed: 1.3,
      ufoChance: 0.006,
      maxDepth: 1000,
      maxShips: 15,
      cursorSpeed: 5,
    },
    {
      starNum: 2000,
      starSpeed: 30.0,
      starSize: 0.5,
      starColor: "white",
      spaceColor: "#6EACDA",
      ufoSize: 50,
      ufoColor: "silver",
      ufoSpeed: 1.6,
      ufoChance: 0.007,
      maxDepth: 1000,
      maxShips: 20,
      cursorSpeed: 7,
    },
    {
      starNum: 2000,
      starSpeed: 25.0,
      starSize: 0.5,
      starColor: "black",
      spaceColor: "grey",
      ufoSize: 50,
      ufoColor: "silver",
      ufoSpeed: 2,
      ufoChance: 0.008,
      maxDepth: 1000,
      maxShips: 25,
      cursorSpeed: 5,
    },
    {
      starNum: 2000,
      starSpeed: 30.0,
      starSize: 0.5,
      starColor: "white",
      spaceColor: "blue",
      ufoSize: 50,
      ufoColor: "silver",
      ufoSpeed: 2.5,
      ufoChance: 0.009,
      maxDepth: 1000,
      maxShips: 30,
      cursorSpeed: 6,
    },
    {
      starNum: 2000,
      starSpeed: 35.0,
      starSize: 0.5,
      starColor: "white",
      spaceColor: "#26355D",
      ufoSize: 50,
      ufoColor: "silver",
      ufoSpeed: 3,
      ufoChance: 0.01,
      maxDepth: 1000,
      maxShips: 35,
      cursorSpeed: 7,
    },
    {
      starNum: 2000,
      starSpeed: 40.0,
      starSize: 0.5,
      starColor: "black",
      spaceColor: "pink",
      ufoSize: 100,
      ufoColor: "silver",
      ufoSpeed: 3.5,
      ufoChance: 0.011,
      maxDepth: 1000,
      maxShips: 40,
      cursorSpeed: 7,
    },
    {
      starNum: 2000,
      starSpeed: 50.0,
      starSize: 0.5,
      starColor: "white",
      spaceColor: "purple",
      ufoSize: 50,
      ufoColor: "silver",
      ufoSpeed: 4,
      ufoChance: 0.012,
      maxDepth: 1000,
      maxShips: 45,
      cursorSpeed: 7,
    },
    {
      starNum: 2000,
      starSpeed: 60.0,
      starSize: 1.5,
      starColor: "white",
      spaceColor: "red",
      ufoSize: 50,
      ufoColor: "silver",
      ufoSpeed: 5,
      ufoChance: 0.013,
      maxDepth: 1000,
      maxShips: 50,
      cursorSpeed: 10,
    },
    {
      starNum: 2000,
      starSpeed: 100.0,
      starSize: 0.5,
      starColor: "white",
      spaceColor: "#021526",
      ufoSize: 50,
      ufoColor: "silver",
      ufoSpeed: 6,
      ufoChance: 0.014,
      maxDepth: 1000,
      maxShips: 55,
      cursorSpeed: 10,
      boss: true,
      bossHitsToKill: 10,
      bossUfoSize: 300
    },
  ];
  