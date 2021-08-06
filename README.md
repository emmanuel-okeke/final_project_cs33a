Github URL: https://github.com/emmanuel-okeke/final_project_cs33a


HOW TO SET UP THE PROJECT.

1. Make sure you have python3 installed on your computer :)
2. Create a new folder and then within that, create a new python virtual environment. 
3. copy the 'FINAL PROJECT\reminderly' folder into the same folder as your virtual environment

NOTE: If you do not want to bother with creating a virtual environment, the just copy the folder in step 3
    to anywhere on your pc and skip 2. 

4. If you created a virtual environment, make sure to start it up beofre you continue!
5. Install the packages from the 'reminderly/requirements.txt' file using 'pip install -r requirements.txt'
6. Now you have your initial setup all done!

HOW TO SET UP DJANGO

1. I used postgres as my database backend, so you want to install it as well. Also install PG Admin, as it will help 
    with seeing the db changes.
2. Once You have PG Admin and postgres installed, keep track of the master user and password name you entered, you will need 
    that later.
3. Go into PG Admin and create a new Database. Keep track of its name and connection port. you will also need this as well. 
2. Go to the settings.py file under 'reminderly/reminderly' and edit the details specific to your postgres install 
    in the DATABASES['default] object.
3. After that, you should be ready to go!


HOW TO RUN SERVER

1. make sure you're in the root folder for the project and then run 'python manage.py migrate' (you only need to do this once!)
2. Then once your done, run 'python manage.py runserver' 
3. Go to the link shown to see the working app.