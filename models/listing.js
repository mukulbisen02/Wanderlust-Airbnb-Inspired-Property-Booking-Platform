const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String },
  description: { type: String },
  images: { 
    type: String, 
    set: (v) => v === "" ? "https://tse3.mm.bing.net/th/id/OIP.aINbyiwpyIZV9VUE25NyFgHaE9?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" : v, 
    default: "https://tse3.mm.bing.net/th/id/OIP.aINbyiwpyIZV9VUE25NyFgHaE9?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"},
  price: { type: Number },
  location: { type: String },
  country: { type: String },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
