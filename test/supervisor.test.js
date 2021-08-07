const superVisorRouter = require("../routes/admin.routes");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = 'http://localhost:3000'
const should = chai.should();
chai.use(chaiHttp);

let token;

describe("Testing route supervisor", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post("/api/auth/login")
            .send({
                phone: "0327308125",
                password: "123",
            })
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    });
    describe("Upgrade role successs", () => {
        it("Upgrade role success", (done) => {
            chai
                .request(server)
                .post("/api/supervisor/upgradeRole")
                .set({ Authorization: `Bearer ${token}` })
                .send({
                    id: "610e3d76919f8f59467b406d",
                    role:"admin"
                })
                .end((err, res) => {
                    console.log("response", res.body);
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("upgrade role failed", () => {
        it("upgrade role user failed", (done) => {
            chai
                .request(server)
                .post("/api/supervisor/upgradeRole")
                .set({ Authorization: `Bearer ${token}` })
                .send({
                    id: "610e3d76919f8f59467b406e",
                    role:"user"
                })
                .end((err, res) => {
                    res.should.have.status(300);
                    done();
                });
        });
    });
    describe("list profile", () => {
        it("list profile user", (done) => {
            chai
                .request(server)
                .get("/api/supervisor/listProfile")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("profile user", () => {
        it("profile of one user", (done) => {
            chai
                .request(server)
                .get("/api/supervisor/viewProfile?id=610e3d76919f8f59467b406d")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("profile user", () => {
        it("failed profile of one user dont correct id", (done) => {
            chai
                .request(server)
                .get("/api/supervisor/viewProfile?id=610e3d76919f8f59467b406e")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    console.log("response",res.body)
                    res.should.have.status(300);
                    done();
                });
        });
    });
});