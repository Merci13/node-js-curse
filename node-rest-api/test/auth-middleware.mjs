

import { expect } from 'chai';
const authMiddleware = require('../middleware/is-auth');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');


describe('Auth', function() {
    it("should throw an error if no authorization header is present", function(done){

        const req = {
            get: function(headerName){
                return null;
            }

        }
        sinon.stub(jwt, 'verify'); //replace only for this test, after return the library for the original state
        //override a method -> downside is global replace the function
        // jwt.verify = function  () {
        //     return { userId: "abc"};
        // }
        jwt.verify.returns({userId: "abc"});
        expect(
            authMiddleware.bind(this,req, {}, ()=>{})).to.throw('Not authenticated!');
            jwt.verify.restore();
        done();
    });
    
});
