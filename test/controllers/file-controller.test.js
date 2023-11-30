import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../../src/server.js'; //figure chai
chai.use(chaiHttp);
chai.should();
describe("files", () => {
    describe("GET /data", () => {
        // Test to get all students record
        it("should get all files record", (done) => {
             chai.request(app)
                 .get('/files/data')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.have.header("Content-Type",'application/json; charset=utf-8')
                     expect(res.body).to.be.an('array').that.has.length.greaterThanOrEqual(0);
                     done();
                  });
         }); 

    });
});