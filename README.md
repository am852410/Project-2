# Project-2

Craft Tacos & Beer United (Full Stack Application)

* # Problem: I would like a source where I can search for taco recipes and paired with craft beer all in one place. 

* # General App Idea/Purpose: Create a blog where people can showcase their taco recipes and craft beer pairing where the recipes are organized in one place.

* # Who would use it: Taco and craft beer lovers, amateur chefs, people looking for taco recipes, good beers to pair with tacos.

Stretch Goal:  Users that wish to submit taco recipes must sign up/sign in: 

Models (recipes.js) : An array of objects that contain recipes.

Keys: The name of the recipe, name of the creator, and an image

Main Page (index.ejs)

Welcome to Craft Tacos and Beer United

This blog was made to invite people from all over to post their taco recipes paired with their choice of craft beer. Below, you will find our latest taco recipe submissions. 

* CSS format 

Picture of the Taco and Beer (Full Recipe) (show.ejs)

When the user clicks, it will redirect them to the full entire recipe of the taco. 

At the top, the type of taco, the name of the recipe creator, and the date it was submitted 

A small description of the taco below the picture and the beer that was chosen to be paired with. 

YIELD: 

INGREDIENTS: 

PREPARATION:

LEAVE REVIEW:

Create New Recipe (new.ejs)

Name of the taco: 

Name of the recipe creator (for stretch goal this will be the logged in users name): 

Date (stretch goal use moment.js to get current date automatically): Month/Year 

Picture of the finished taco and beer pairing (url):

Beer Pairing: 

Small description of the taco and beer chosen to be paired: 

Yield: 

Ingredients: 

Preparation: 



Make a profile - Stretch Goal

Username:

Password: 

Profile Pic: 

Name: 

Location: 

Email:

Describe yourself in three words: 



ROUTES

GET "/recipes" allows users to look at an index of all the recipes available

GET "/recipes/:id" allows users to look at recipe that they click at

GET "/recipes/new" allows users to create their own recipe

POST "/recipes" submits new recipe




