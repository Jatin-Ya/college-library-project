// write a testing script for the books route
// use the chai-http package to send requests to the server
// use the expect package to check the response
// use the mocha package to run the test

// Path: backend/test/booksRouteTest.ts

import chai from "chai";
import chaiHttp from "chai-http";
import app from "./src/app";
import mongoose from 'mongoose';
import assert from "assert"
import { should } from "chai";
import { beforeEach, afterEach, before, after } from "node:test";

import { describe, it } from "node:test";

import { Request, Response } from "express";
import Book from "./src/models/booksModel";




chai.use(chaiHttp);
const expect = chai.expect;







mongoose.Promise = global.Promise;
// const MONGODB_URI = 'mongodb+srv://driverApp:bc6ilrYWVeoZxH13@maincluster.zxzjnaq.mongodb.net/test?retryWrites=true&w=majority';
// const db = mongoose.connect(MONGODB_URI);
// console.log(db)
// console.log("connected");

describe("Books", async (done) => {
    before(async (done) => {
        const MONGODB_URI = 'mongodb+srv://driverApp:bc6ilrYWVeoZxH13@maincluster.zxzjnaq.mongodb.net/test?retryWrites=true&w=majority';
        const db = await mongoose.connect(MONGODB_URI);
        // console.log(db)
        console.log("connected");
        done();
    });
    after(async () => {
        await mongoose.connection.close();
        console.log("disconnected");
    });
    beforeEach((done) => {
        // console.log("before");

        chai
            .request(app)
            .post("/api/v1/books")
            .send({
                title: "The Colour of Magic",
                code: "1234567",
                description: "The Colour of Magic is a 1983 comic fantasy novel by Terry Pratchett, and is the first book of the Discworld series. The first printing of the British edition consisted of only 506 copies.",
                author: "Terry Pratchett"
            })
            .end((err: any, res: any) => {
                console.log(res.body)
                // ();
                done();
            });
    });

    afterEach(async (done) => {
        // console.log("after");
        await mongoose.connection.collections.books.drop();
        done();
    });

    it("testing 1", (done) => {
        assert.equal(1, 1);
        done();
    });

    it("should return all books", (done) => {
        chai
            .request(app)
            .get("/api/v1/books")
            .end((err, res) => {
                // expect(res).to.have.status(200);
                // expect(res.body.data).to.be.an("object");
                // // console.log(res.body)
                // expect(res.body.data.title).to.be.equal("The Colour of Magic");
                // ();
                done();
            });
    })
    done();
})
// mongoose.connection.close();
// console.log("disconnected");

// afterEach(() => {
//     console.log(mongoose.connection.collections)
// });


// describe("Books", () => {
//     let testcnt = 0;
//     

    // afterEach(() => {
    //     // console.log("after");
    //     mongoose.connection.collections.books.drop();
    // });

//     describe("GET /books",() => {
//         it("should return all books", () => {
//             chai
//                 .request(app)
//                 .get("/api/v1/books")
//                 .end((err: any, res: any) => {
//                     // should().equal(res.status, 200);
//                     assert.fail(res.status, 200, "status code is not 200");
//                     expect(res.body.data).to.be.an("array");
//                     // console.log(res.body.data)
//                     // ();
//                 });
//         });
//     });
//     describe("GET /books/:id", () => {
//         it("should return one book", () => {
            // chai
            //     .request(app)
            //     .get("/api/v1/books/1234567")
            //     .end((err, res) => {
            //         expect(res).to.have.status(200);
            //         expect(res.body.data).to.be.an("object");
            //         // console.log(res.body)
            //         expect(res.body.data.title).to.be.equal("The Colour of Magic");
            //         // ();
            //     });
//         });
//     });
//     describe("POST /books", () => {
//         it("should create a new book", () => {
//             chai
//                 .request(app)
//                 .post("/api/v1/books")
//                 .send({
//                     title: "The Colour of Magic",
//                     code: "12345678",
//                     description: "The Colour of Magic is a 1983 comic fantasy novel by Terry Pratchett, and is the first book of the Discworld series. The first printing of the British edition consisted of only 506 copies.",
//                     author: "Terry Pratchett"
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(201);
//                     expect(res.body.data).to.be.an("object");
//                     expect(res.body.data.title).to.be.equal("The Colour of Magic");
//                     // ();
//                 });
//         });
//     });
//     describe("delete /books/:id", () => {
//         it("should delete a book", () => {
//             chai
//                 .request(app)
//                 .delete("/api/v1/books/1234567")
//                 .end((err, res) => {
//                     expect(res).to.have.status(200);
//                     // ();
//                 });
//         });
//     }
//     );
// });

    // mongoose.connection.close();
    // console.log("disconnected");
