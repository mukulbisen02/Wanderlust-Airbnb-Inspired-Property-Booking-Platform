const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const mongoURI = "mongodb://localhost:27017/wanderlust";

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

async function main() {
   await mongoose.connect(mongoURI);
}
app.get("/", (req, res) => {
    res.send("Hello, World!");
});


//Index route to display all listings
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
});

//New route to display a form for creating a new listing
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show route to display a single listing
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create route to add a new listing to the database
app.post("/listings", async (req, res) => {
    const { title, description, price, image, location, country } = req.body;
    const newListing = new Listing({
        title,
        description,
        price,
        image,
        location,
        country
    });
    await newListing.save();
    res.redirect("/listings");
});

// Edit route to display a form for editing an existing listing
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update route to update an existing listing in the database
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, price, image, location, country } = req.body;
    await Listing.findByIdAndUpdate(id, {
        title,
        description,
        price,
        image,
        location,
        country
    });
    res.redirect(`/listings/${id}`);
});

// Delete route to remove a listing from the database
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
});

// Test route to create a sample listing in the database
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Sample Listing",
//         description: "This is a sample listing for testing.",
//         price: 100,
//         location: "Sample Location",
//         country: "Sample Country"
//     });

//     await sampleListing.save();
//     console.log("Sample listing saved to the database.");
//     res.send("Sample listing created and saved to the database.");
// });



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});