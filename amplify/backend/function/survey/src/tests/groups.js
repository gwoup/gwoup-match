// TODO: add backend tests

let data = [
  {userId: 1, full_name: "User 1"},
  {userId: 2, full_name: "User 2"},
  {userId: 3, full_name: "User 3"},
  {userId: 4, full_name: "User 4"},
  {userId: 5, full_name: "User 5"},
  {userId: 6, full_name: "User 6"},
  {userId: 7, full_name: "User 7"},
  {userId: 8, full_name: "User 8"},
  {userId: 9, full_name: "User 9"},
  {userId: 10, full_name: "User 10"},
  {userId: 11, full_name: "User 11"},
  {userId: 12, full_name: "User 12"},
];
let minGroupSize = 2, maxGroupSize=8, preferredGroupSize=6;

console.log(generateUserGroups(data, minGroupSize, maxGroupSize, preferredGroupSize));