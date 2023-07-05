// write a testing script for the books route
// use the chai-http package to send requests to the server
// use the expect package to check the response
// use the mocha package to run the test

// Path: backend/test/booksRouteTest.ts

import chai from "chai";
import chaiHttp from "chai-http";
import app from "./src/app";

import { describe, it, beforeEach } from "node:test";

import e, { Request, Response } from "express";


chai.use(chaiHttp);
const expect = chai.expect;

const testBook = {
    title: "The Colour of Magic",
    description: "The Colour of Magic is a 1983 comic fantasy novel by Terry Pratchett, and is the first book of the Discworld series.",
    code: "1",
    author: "Terry Pratchett",
    issuedTo: null
};

describe("Books", () => {
    describe("GET /books", () => {
        it("should return all books", (done: any) => {
            chai
                .request(app)
                .get("/api/v1/books")
                .end((err: any, res: any) => {
                    // console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body.books).to.be.an("array");

                    // done();
                });
        });
        it("should return one book", async (done: any) => {

            await chai
                .request(app)
                .post("/api/v1/books")
                .send(testBook)

            const res = await chai
                .request(app)
                .get("/api/v1/books/1")
            await chai
                .request(app)
                .delete("/api/v1/books/1")
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            // expect(res.body.book).to.be.equal(testBook);
            // done();



        })

        it("should create a new book", async (done: any) => {
            const res = await chai
                .request(app)
                .post("/api/v1/books")
                .send(testBook)
            await chai
                .request(app)
                .delete("/api/v1/books/1")
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            // expect(res.body.book).to.be.equal(testBook);
        })

        it("should delete a book", async (done: any) => {

            await chai
                .request(app)
                .post("/api/v1/books")
                .send(testBook)

            const res = await chai
                .request(app)
                .delete("/api/v1/books/1")
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            // expect(res.body.book).to.be.equal(testBook);

        })

        it("should update a book", async (done: any) => {

            await chai
                .request(app)
                .post("/api/v1/books")
                .send(testBook)

            const res = await chai
                .request(app)
                .patch("/api/v1/books/1")
                .send({ title: "The Light Fantastic" })
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.book.title).to.be.equal("The Light Fantastic");
            await chai
                .request(app)
                .delete("/api/v1/books/1")

        })


    });
    // describe("GET /books/:id", () => {
    //     it("should return one book", (done) => {
    //         chai
    //             .request(app)
    //             .get("/books/1")
    //             .end((err, res) => {
    //                 expect(res).to.have.status(200);
    //                 expect(res.body).to.be.an("object");
    //                 expect(res.body.title).to.be.equal("The Colour of Magic");
    //                 done();
    //             });
    //     });
    // });
    // describe("POST /books", () => {
    //     it("should create a new book", (done) => {
    //         chai
    //             .request(app)
    //             .post("/books")
    //             .send({
    //                 title: "The Light Fantastic",
    //             })
    //             .end((err, res) => {
    //                 expect(res).to.have.status(201);
    //                 expect(res.body).to.be.an("object");
    //                 expect(res.body.title).to.be.equal("The Light Fantastic");
    //                 done();
    //             });
    //     });
    // });
});