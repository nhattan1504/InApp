const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);
var authRoutes = require('../routes/auth.routes');
let token;
const server = 'http://localhost:3000'
describe("Login", () => {
    it("login api success", (done) => {
        chai.request(server).post('/api/auth/login').send({
            phone: "0327308125",
            password: "123",
        })
            .end((err, res) => {
                token = res.body.token;
                console.log('token', token)
                res.should.have.status(200);
                done();
            });
    })
});
describe('Wrong password', () => {
    it("login api wrong password", (done) => {
        chai.request(server).post('/api/auth/login').send({
            phone: "0327308125",
            password: "1234",
        })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    })
});
describe('Wrong phone', () => {
    it("login api wrong phone", (done) => {
        chai.request(server).post('/api/auth/login').send({
            phone: "0327308127",
            password: "1234",
        })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    })
});
describe('Properti is required', () => {
    it("Register dont renough property", (done) => {
        chai.request(server).post('/api/auth/register').send({
            name: "tan",
            birthDate: "2021-08-07T07:42:56.768Z",
            phone: "0327308125",
            address: "duong xxxx"

        })
            .end((err, res) => {
                res.should.have.status(300);
                done();
            });
    })
})