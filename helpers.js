/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require("fs");

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require("moment");

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = obj => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one
exports.staticMap = ([lng, lat]) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&maptype=roadmap&style=feature:road|element:geometry|color:0x2a164b&style=feature:landscape|element:geometry.fill|color:0xffffff&style=feature:all|element:labels|visibility:off&zoom=14&size=1550x450&key=${
    process.env.MAP_KEY
  }&markers=${lat},${lng}&scale=2`;
//https://maps.googleapis.com/maps/api/staticmap?center=48.85661400000001,2.3522219000000177&maptype=roadmap&style=feature:road|element:geometry|color:0x2a164b&style=feature:landscape|element:geometry.fill|color:0xffffff&style=feature:all|element:labels|visibility:off&zoom=14&size=1550x450&key=AIzaSyDqsni7qoN4OksOUGRW0eZtDgLx6qwOYKI&markers=48.85661400000001,2.3522219000000177&scale=2
// inserting an SVG
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Some details about the site
exports.siteName = `Explore with a locals view`;

exports.menu = [
  { slug: "/quests", title: "Quests", icon: "store" },
  { slug: "/search", title: "Search", icon: "map" },
  //{ slug: '/tags', title: 'Categories', icon: 'tag', },
  //{ slug: '/top', title: 'Top', icon: 'top', },
  { slug: "/completed", title: "Completed", icon: "" },
  { slug: "/add", title: "Add", icon: "add" }
  //{ slug: '/map', title: 'Map', icon: 'map', },
];
