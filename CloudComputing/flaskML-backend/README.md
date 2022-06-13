# Redteam ML Backend

This is backend for put our model ML. So it can be access by our nodejs backend. 

## Backend
  This backend user user python as base and flask for the framework. This backend deploy in Google Cloud Compute Engine and we reserve the public IP so it can't change if the VM down or restart. We install nginx server and open proxy for public access. For secure purpose, we buy domain in niagahoster and register to cloudflare to install SSL for our endpoint compute engine. We make subdomain for this ML backend.
  
There is some depedencies you must install in your code editor to run RedTeam Backend (the list is in requirement.txt:
 - Flask == 2.0.3
 - Werkzeug == 2.0.2
 - tensorflow == 2.9.1
 - numpy == 1.22.3
 - keras == 2.9.0
 - gunicorn

## Get Started Backend (Flask)
- Install python3 and pip (if you don't have)
  - Check in your terminal or command prompt
    ```
    ptyon3 --version
    pip --version
    ```
- clone our project to your directory
- Install all depedencies above
  - You can use this command to install the package
    ```
    pip install flask
    ```
  - Try to install all package in the list above. You can also use this command to install all package in requirements.txt
    ```
    pip install -r requirements.txt
    ```
- There are some folder you must install. We already zip the saved_model folder. You can download and extract to the project root
  - https://drive.google.com/drive/folders/1hliugwJGfAiffqj7Her0mEdYHibTIUKz?usp=sharing 

- Just start our backend server with this command (linux)
  ```
  export FLASK_APP = app.py
  flask run
  ```

