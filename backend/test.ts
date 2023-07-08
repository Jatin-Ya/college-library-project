// write a testing script for the books route
// use the chai-http package to send requests to the server
// use the expect package to check the response
// use the mocha package to run the test

// Path: backend/test/booksRouteTest.ts

import chai from "chai";
import chaiHttp from "chai-http";
import app from "./src/app";

import { describe, it, afterEach } from "node:test";

import e, { Request, Response } from "express";


chai.use(chaiHttp);
const expect = chai.expect;

const testBook = {
    title: "The Colour of Magic",
    description: "The Colour of Magic is a 1983 comic fantasy novel by Terry Pratchett, and is the first book of the Discworld series.",
    code: "Test1",
    author: "Terry Pratchett",
    issuedTo: null
};

const testStudent = {
    name: "Test User",
    studentID: "Test2",
    email: "teststudent@test.com",
    phone: "0123456789"
};

describe("Books", () => {
    afterEach(async (done) => {
        try {
            await chai.request(app).delete("/api/v1/books/Test1");
        } catch (err) {}
        try {
            await chai.request(app).delete("/api/v1/students/Test2");
        } catch (err) {}
        // done();
    });
    it ("should return all books", async () => {
        await chai.request(app).post("/api/v1/books").send(testBook);

        const res = await chai.request(app).get("/api/v1/books");
        expect(res.status).to.equal(200);

    });
    it ("should create a new book", async () => {
        const res = await chai.request(app).post("/api/v1/books").send(testBook);
        expect(res.status).to.equal(201);
    });
    it ("should return a single book", async () => {
        await chai.request(app).post("/api/v1/books").send(testBook);

        const res = await chai.request(app).get("/api/v1/books/Test1");
        expect(res.status).to.equal(200);
    });
    it ("should delete a book", async () => {
        await chai.request(app).post("/api/v1/books").send(testBook);

        const res = await chai.request(app).delete("/api/v1/books/Test1");
        expect(res.status).to.equal(200);
    });
    it ("should update a book", async () => {
        await chai.request(app).post("/api/v1/books").send(testBook);

        const res = await chai.request(app).patch("/api/v1/books/Test1").send({title: "The Light Fantastic"});
        expect(res.status).to.equal(200);
    });
    it ("should issue a book", async () => {
        await chai.request(app).post("/api/v1/books").send(testBook);
        await chai.request(app).post("/api/v1/students").send(testStudent);


        const res = await chai.request(app).patch("/api/v1/books/Test1/issue").send({studentID: "Test2"});
        // console.log(res.body);
        expect(res.status).to.equal(200);
    });
});

describe("Students", () => {
    afterEach(async (done) => {
        try {
            await chai.request(app).delete("/api/v1/books/Test1");
        } catch (err) {}
        try {
            await chai.request(app).delete("/api/v1/students/Test2");
        } catch (err) {}
        // done();
    });
    it ("should return all students", async () => {
        await chai.request(app).post("/api/v1/students").send(testStudent);
        const res = await chai.request(app).get("/api/v1/students");
        expect(res.status).to.equal(200);
    });
    it ("should create a new student", async () => {
        const res = await chai.request(app).post("/api/v1/students").send(testStudent);
        expect(res.status).to.equal(201);
    });
    it ("should return a single student", async () => {
        await chai.request(app).post("/api/v1/students").send(testStudent);
        const res = await chai.request(app).get("/api/v1/students/Test2");
        expect(res.status).to.equal(200);
    });
    it ("should delete a student", async () => {
        await chai.request(app).post("/api/v1/students").send(testStudent);
        const res = await chai.request(app).delete("/api/v1/students/Test2");
        expect(res.status).to.equal(200);
    });
    it ("should update a student", async () => {
        await chai.request(app).post("/api/v1/students").send(testStudent);
        const res = await chai.request(app).patch("/api/v1/students/Test2").send({name: "Test User 2"});
        expect(res.status).to.equal(200);
    });
});