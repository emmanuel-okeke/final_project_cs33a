GENERAL APP DESCRIPTION

The app can be used to create reminders and share them with other users. It also lets you flag reminders to separate them as important or priority.


API 

I built the api for this project using django\postgres db. In the django project, i have 3 apps, 

    accounts -- used to handle users and authentication
    reminders -- handles storing reminders and other related features
    frontend -- handles the react based front end

A key decision i made was to use the django-rest-framework to create the rest api. I learnt how to use the serializers and viewsets to make my life easy, especially with translating json to python objects and vice versa. the library was also key in handling database objects vs python object conversions. 

Going into more detail, I spent a good amount of time on the accounts app, creating a custom user object and corresponding manager, to make sure that i could use the users email for validation and not djangos default username method. I was able to implement token based authentication with the knox library, and that meant that all i needed was to request tokens from the integrated knox django app and the app would handle all of the details regarding the token life, mapping to users etc. 

The reminders app was the most straightforward to create as using the models, viewset class, writing the handlers for the different http methods typically used in rest api's was straight forward. I created 3 models in total in this app, one to store basic data about the reminder, another one to store people tagged to the reminders and another to store flags for the reminders. 

I used the defualt django rest framework URL definitions to save time and ensure uniformity. So for the accounts and reminders apps i used the defualt router providded by the framework. For the frontend app i defined the urls myself because i had issues with the defualt one provided by the rest framework not serving as a catchall and redirecting any unrecognzed urls to my homepage. 

FRONTEND

This was the most tasking part of this project for a couple reasons. I decided to use redux to keep state globally for the app and to handle all my api interactions.I decided to use the react-bootstrap library for Modals specifically and pure html for everything else just because i wanted to follow the react style as much as i could while still using this project as an oppurtunity to get more comfortable with writing stand alone html.

I bootstrapped the project with create-react-app since that's i used in the past when i started learning. I think(hope) that my code was arranged in a pretty standard format with all the working files in the src folder and the builds in the build folder. 

I used react-router-dom to handle the routing for my web pages, so in my App.js i used the BrowserRouter and Switch classes to handle all page routing. I decided to create a Wrapper around default Route component called Private Route that would redirect to the login page if the user was not authenticated.

Redux was the most fun of all the new things i learnt while doing this because i was used to having a lots of state, props and api calls duplicated across components making it a hassle to debug. Once i understood(somewhat) what actions and reducers where i decided to use actions to make calls to my server and have the reducers update the state in my redux store. Another reason i used it was because as i add more features and things, it would be a more streamlined way of managing how my components interacted with each other. 

Also regarding redux, i managed to implement persistence of my store so that refreshing didn't force the user to log in again. I read "The Definitive Guide to Redux Persist" by Mark Newton. Its a short Medium article that was very helpful in understanding the redux persist library!

Moving on, I was able to create lots of custom components, like for the sidebar and reminders etc and those helped me keep more contol of the super simple UI i was going for. 

I tried to use very readable names and structured my project in a way that it would be easy to follow. Please do comment if you have any design suggestions, libraries etc. that i can try out.