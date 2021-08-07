const adminRouter = require("../routes/admin.routes");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = 'http://localhost:3000'
const should = chai.should();
chai.use(chaiHttp);

let token;

describe("Testing route admin", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post("/api/auth/login")
            .send({
                phone: "0327308126",
                password: "123",
            })
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    });
    describe("Suspend", () => {
        it("susspend user failed", (done) => {
            chai
                .request(server)
                .post("/api/admin/suspendUser")
                .set({ Authorization: `Bearer ${token}` })
                .send({
                    id: "610e3d76919f8f59467b406e"
                })
                .end((err, res) => {
                    console.log("err", err);
                    //   res.should.have.status(300);
                    done();
                });
        });
    });
    describe("Suspend successs", () => {
        it("susspend user success", (done) => {
            chai
                .request(server)
                .post("/api/admin/suspendUser")
                .set({ Authorization: `Bearer ${token}` })
                .send({
                    id: "610e3d76919f8f59467b406d"
                })
                .end((err, res) => {
                    console.log("response", res.body);
                    res.should.have.status(300);
                    done();
                });
        });
    });
    describe("upgrade role user", () => {
        it("upgrade role user success", (done) => {
            chai
                .request(server)
                .post("/api/admin/upgradeUser")
                .set({ Authorization: `Bearer ${token}` })
                .send({
                    id: "610e3d76919f8f59467b406d"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("upgrade role user", () => {
        it("upgrade role user failed", (done) => {
            chai
                .request(server)
                .post("/api/admin/upgradeUser")
                .set({ Authorization: `Bearer ${token}` })
                .send({
                    id: "610e3d76919f8f59467b406e"
                })
                .end((err, res) => {
                    res.should.have.status(300);
                    done();
                });
        });
    });
});