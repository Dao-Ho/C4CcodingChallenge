# C4CcodingChallenge
The technical challenge for Code4Community.

How to run the application: 
1. cd to the c4c_challenge repo

2. install necessary components:
    npm install
    npm install -D tailwindcss (may not be needed)
    npm install @supabase/supabase-js


Application overview:

The webapp follows a relatively simple structure, most to all of the code logic and content is housed in the page.js page. the page is structured so that it is 
responsive to most screensizes (except mobile). Users can upload new partners by entering the partner's name, bio, status, and import a logo image from their local computer.
In addition, once partners are displayed on the page, users also have the option to remove them from the list by deleting the partner (button).

Design decisions:
I decided to use Supabase for this project since it's one that I'm most familiar with. I would like to note my decision in publicly displaying the secret key to the database, 
since this coding challenge is a demo, having instructions for users to create their own .env file and ensuring correct variable assignment would be error prone. 

Reflection: 

Overall, I am really proud of how the web app turned out. However, there are some improvements I would like to make if I had the chance to code this again:
    - MVC structure: as a current OOD student, I have recently realized the importance of scalability. Through my latest assignment, I had the opportunity to understand
        just how important it is to structure a project that can be built/extended upon, and retrospectively speaking-- I didn't do a very good job on that aspect, which 
        I hope to explore and experiment with on my next web application project.
    - Device responsiveness: due to time constraints I was not able to refactor my screen responsiveness for mobile devices. 

However, through this challenge, I've got to learn alot about querying and post to certain columns of a superbase relation. All of my supabase data that I've worked with in the past has primarily been storing one-attribute, therefore I never had to query or set data for a specific column. This project also allowed me to explore different design techniques that can be used on a UI (such as the side bar for posting partner data rather than my usual horizontal form) which I am very grateful to have the opportunity to do.
