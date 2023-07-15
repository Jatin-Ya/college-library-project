# COLLEGE LIBRARY MANAGEMENT SYSTEM

The College Library Management System app is designed to track the student records and book records of a library. There are various problems also faced by the student in library such as finding any particular book, information whether book is available or not, for what time this book will be available, searching of books using ISBN number etc. To eliminate this manual system, College Library Management System has been developed.
This project was developed by a taem during the AFourathon 3.0 Hackathon, by AFOUR Technologies.

# Problem Statement

**Project B: College Library Project:**

College Library Project is broken up as 3 problem statements. You can implement as many working solutions for problem statements as you can. You can use same or different tech stack/languages for coding each problem statement.

**Problem Statement 1 -** Student Details App
Build an application that can be run as a container on the cloud for creating/updating/deleting a student. The functionality of the application is:

* Allow user to add, update, delete a student
Each student should have: Student Name, Student ID Number, Student Email, Student Phone Number
* Persist all student details in the database

**Problem Statement 2 -** Books App
Build an application that can be run as a container on the cloud for creating/updating/deleting a library book. The functionality of the application is:

* Allow user to add, update, delete a book
Each book should have: Book Title, Book Author, Book Description, Book Code
* Persist all subjects in the database

Problem Statement 3 - Book Lending App
Build an application that can be run as a container on the cloud for lending/updating/deleting book for each student. The functionality of the application is:

* There should be 2 pages/screens/views – Student Page and Book Page.
* On the Student Page: The user should be able to select a student from a list of students (From Problem Statement 1), Then let them select, update, delete the book(s) (From Problem Statement 2) for that student.
* On the Books Page: The user should be able to select a book from list of books (From Problem Statement 2), Then let them select, update, delete the student that have chosen the book.
* Persist all details in the database.

# Technologies Used

The College Library Management System app utilizes the following technologies:
* Node.ts: Evented I/O for the backend
* Express: Fast node network app framework
* MongoDB: NoSQL database
* React: Typescript library for building web interfaces
* ChakraUI: A react component library
* Recoil: A state management library for React

# Backend Architecture
The backend api is constructed using Node and Express in typescript. It follows microservice architecture. It consists of two fine-grained services, books service and students service, and another backend service to intigrate all the microservices. Books services handles all the logic for handling books related api calls. Students services handles all the logic for handling Students related api calls. Both the services are connected to the same mongo database which contains the data documents with refrences for records related to issuing books.

# Features

**Features for Students Page**
* Adding a new student
* Deleting a student
* Updating a student's details
* Get the details of books issued to every student
* Search student via search bar

**Features for Books Page**
* Adding a new book
* Deleting a book
* Updating a book's details
* Get the status of the books
* Get the details of the student to whom the book is issued to
* Search book via search bar

# Functionality Overview

**Students Page**
* Homepage

<p align="center">
    <img src="./images/students page/home.png" width="80%"/>
</p>

* Add student

<p align="center">
    <img src="./images/students page/add student.png" width="80%"/>
</p>

* View Student Details

<p align="center">
    <img src="./images/students page/student details.png" width="80%"/>
</p>

* Edit student Details

<p align="center">
    <img src="./images/students page/edit student.png" width="80%"/>
</p>

* Delete Student

<p align="center">
    <img src="./images/students page/delete student.png" width="80%"/>
</p>

* Issue Book

<p align="center">
    <img src="./images/students page/issue book.png" width="80%"/>
</p>

**Books Page**
* Homepage

<p align="center">
    <img src="./images/books page/home.png" width="80%"/>
</p>

* Add Book

<p align="center">
    <img src="./images/students page/add book.png" width="80%"/>
</p>

* Book Details

<p align="center">
    <img src="./images/books page/book details.png" width="80%"/>
</p>

* Edit Book Details

<p align="center">
    <img src="./images/books page/edit book.png" width="80%"/>
</p>

* Delete Book

<p align="center">
    <img src="./images/books page/delete book.png" width="80%"/>
</p>

* Issue Book

<p align="center">
    <img src="./images/books page/issue book.png" width="80%"/>
</p>

# Team
The team behind the app consists of the following members:

* Jatin Yadav
* Tushar Joshi
* Indrayudh Ghosh