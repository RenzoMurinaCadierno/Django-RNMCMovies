RNMC Videos
========================================

Overview
----------------------------------------

A single-page web app to rate movies. 

It is a functional proof-of-concept on how to combine Django to handle the backend API services and React to consume them via frontend, all on a Single Page Application. You can create movie titles and descriptions from the GUI provided in the app, rate -and let other users rate- them, edit and delete them as you please. All CRUD operations are covered up, and I used little bit of vanilla CSS to make the app at least readable instead of a whole framework to do so. The web aesthetics are VERY basic and not so user-friendly, but it was a nice change of pace.

As stated React calls for user authentication and each CRUD operations on movies via AJAX to Django, which handles them and redirect the response back to the frontend to render. JSON is the common language between the two, and a token system is used as Local Storage to keep the user authenticated during their session.

Since this app was created just to learn how to combine both frameworks, error handling is too lazy. Either on the [uploaded working example](https://rnmcmovies.web.app/), or on a launched cloned project, the application will malfunction if not used as intended. This was fine with me, as to make it work was my main goal in first place.

React Native was also dealt with here using *Expo* framework, which is ready for you to test out in development, but I did upload the app anywhere for the same reason as stated above: I just wanted to make it work.

I have put this app together following Krystian Czekalski's proposed exercise on his ["React & Django Full Stack: web app, backend API, mobile apps"](https://www.udemy.com/course/react-django-full-stack/) Udemy course. Go check it out if you want to learn how to combine two of the most demanded frameworks for web development, it definitely helped me out lots. Shout out and credits to him for that!

As for my other projects, please feel free to go to [my GitHub page](https://github.com/RenzoMurinaCadierno) to check them out. I am still on my learning tracks, so you will see new projects frequently. I specialize in Python and Javascript, and whatever I upload is normally related to web, game and app development, or Python scripting for multiple purposes.


Instructions
------------------------------------------

Either go to [my hosted version](https://rnmcmovies.web.app/) for a working example, or clone the project yourself.

The backend on the working example is hosted in a free Heroku server. So, when trying to log in or attempting to do any CRUD operations from React/React Native frontend, give it some time between the first clicks for Heroku's Dynamos to wake up, as the whole app will not work otherwise. There are also some minor bugs explained on the last section below you might want to consider.

If you decide to clone this project, do not forget to install the requirements mentioned in *requirements-dev.txt* for Django backend handling, and *npm install* everything for both React and React Native frontend managing. *requirements.txt* and *Pipfile* hold the requirements for Django deployment via Heroku, if you wish to upload it yourself to your own Heroku server. 

If you do so, do not forget to change the variable inside *.env* file in React app's folder to point to your hosted Heroku server's URL, and to add it to *ALLOWED_HOSTS* inside settings.py on Django's folder.

On the other hand, if you are to run this app locally, make sure to add your own IP address and React/Expo ports to *CORS_ORIGIN_WHITELIST* in settings.py inside Django (format *your_ip:3000* for React, *your_ip:19006* for Expo). Additionally, you might want to add those same IP addresses in *ALLOWED_HOSTS* too.

Finally, if you want to test the React Native version of the app, make sure to have an IDE to run an Android/iOS emulator or to scan the code given to you when you call for *expo start* (or *npm start*), with a mobile device.


What can you do in this project?
------------------------------------------

As an **anonymous user** you can:

- Sign up and log in.
- Do nothing else. This is intended, since I wanted the app to work only on logged-in users.

As a **logged-in user** you can:

- See the list of all upload movie titles.
- Click on them to check their description and rating.
- Edit their title and description.
- Rate them from 1 to 5 stars (once per user).
- Delete them.
- Add a new movie (title and description).

As an **admin** you can:

- Handle user, movie and rating objects from Django Admin site.
- View and control the API itself at /api/movies/


What I learned from this project
------------------------------------------
- On my last project, [**RNMC Videos**](https://github.com/RenzoMurinaCadierno/DjangoProjectsGateway/blob/master/readme.md#rnmc-videos), I stated that AJAX is marvelous. I confirm it again here. Being able to handle the whole app's functionality on a SPA is really convenient, and, if errors and aesthetics are handled correctly, it makes for a wonderful UX.
- This is the first time I come across designing a backend that stores and handles API services, and a framework to consume those services directly from it. An enriching experience to say the least. The opportinities this world has to offer are limitless.
- React makes fetching data and rendering it much easier and faster than other frameworks I came across. I see why it is one of the most popular ones out there.
- CORS policy is really strict, as it is meant to be that way for a reason. Some modules were to be dealt with to allow resource sharing between front and backend when consuming APIs. "django-cors-headers" was the alternative of choice.
- React Native is an amazing alternative to vanilla languages or frameworks that aim to program both for Android and iOS, but some of its modules still need to adapt when compiling from Javascript to native mobile languages. FontAwesome on Android is a clear example, since SVG vectors drawn on using floats instead of strings make the app crash at runtime.
- Besides general Python scripting, this type of web application development is what I like the most of programming. I look forward to do a couple more apps like this in the future.


Bugs
------------------------------------------

I discovered these ones while testing the app thoroughly, but chose not to deal with them since my main purpose was to make this project work by combining both Django and React/React Native. Feel free to ask for a pull request if you would like to work on them yourself. I am always prone to teamwork.

- The working example is hosted in a free Heroku server, which have dynamos that go to sleep each 30 minutes. They need a call to wake up, which is normally the first one. Either it is a click on "Login"/"Signup", or a CRUD operation, you must give it some time to load and fetch the respective resource by the respective callback. If you click again before the first response, the app will crash since it is not designed to handle an exception raised due to a previous callback not being able to resolve properly. It will console.log, though.
- When trying to log in providing no username or password, the site will crash since the callback is not designed to handle a request with sent no data fields.
- Signup/Login and CRUD operations present no UX. With this I mean that no GUI response will be shown to the user displaying that their request is being processed. This might lead to multiple clicks triggering many callbacks on the go, which in time lead to unhandled requests and crashes like the one mentioned first.

### Thank you for reading and for taking your time to check this project out!