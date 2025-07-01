interface ConnectionPair {
  user1: string;
  user2: string;
}
  
export const connectionPairs: ConnectionPair[] = [
  // Single step
  { user1: "214328887", user2: "34428380" },
  { user1: "380580781", user2: "18996905" },
  { user1: "17116707", user2: "28465635" },
  { user1: "221036078", user2: "153460275" },
  { user1: "107830991", user2: "17868918" },

  // Two steps
  { user1: "222261763", user2: "222411742" },
  { user1: "88097807", user2: "109740608" },
  { user1: "254839786", user2: "35359596" },
  { user1: "74107696", user2: "221036078" },
  { user1: "400689940", user2: "131613362" },
  { user1: "133055665", user2: "187773078" },

  // Three steps
  { user1: "17759158", user2: "355823615" },
  { user1: "18996905", user2: "8163442" },
  { user1: "34428380", user2: "260769396" },
  { user1: "394263193", user2: "176222605" },
  { user1: "394263193", user2: "26649453" },

  // Four steps
  { user1: "21146135", user2: "404376053" },

  // Five steps
  { user1: "283306479", user2: "14050306" },

  // Invalid
  { user1: "2704495328", user2: "8163442" },
  { user1: "2704498", user2: "2163442" },
];

