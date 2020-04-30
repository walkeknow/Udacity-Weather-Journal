# Weather Journal App Project

## Overview
This is an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Features
* Sets up server and client side GET & POST routes
* Temperature of a region is fetched from openweathermap.org's Weather API according to the zipcode entered by the user by making use of JS promises
* The user is alerted if the zipcode is invalid, i.e., when the promise throws an error
* Temperature, current date, and user comments are sent to the server side for local storage
* Data is then retrieved from the server side to update the UI dynamically on the client side
