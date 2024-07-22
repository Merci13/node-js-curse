
const expect = require('chai').expect;
const sinon = require('sinon');
const moongose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controller/auth');


describe('Auth COntroller - Login', function(){
    before(function(done){
        const MONGO_DB_URI = 'mongodb+srv://mrjorxe:6WGskEOsiBdWVqzW@nodejsproyect.kfi6ldo.mongodb.net/test-message?retryWrites=true&w=majority';
        moongoose
        .connect(MONGO_DB_URI)
        .then(result => {
        //    const server = 
            app.listen(8080);//port to be listen for request
            // const io = require('./socket.io').init(server);
            // io.on('connection', socket => {
            //     console.log("Client connected");
            // });
    
        }
        ).then(result => {
            const user = new User({
                email: 'test@test.com',
                password: 'tester',
                name: "Test",
                posts: [],
                _id: '5c0f66b979af55031b34728a'
            });
            return user.save();

        }).then(()=>{
            done();
        })

    });
    beforeEach(function (){});//runs before each test case
    afterEach(function(){});// runs after each test case

    it('Should throw an error if accessing the database fails', function(done){

        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: "test@test.com",
                password: "tester"
            }
        }

        AuthController.login(req, {}, ()=>{}).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            done();
        });


        User.findOne.restore();
    });

    it('should send a response with a valid user status for an existing user', function(done){
        
        
            const req = {userId: '5c0f66b979af55031b34728a'};
            const res = {
                statusCode : 500,
                userStatus: null, 
                status: function(code){
                    this.statusCode =code;
                    return this;
                },
                json: function(data){
                    this.userStatus = data.status;
                
                }
            };
            AuthController.getUserStatus(req, res, ()=>{}).then(()=>{
                expect(res.statusCode).to.be.equal(200);
                expect(res.userStatus).to.be.equal('I am new!');
                done();
                    

            });
          
       




    });

    after(function(done){
        User.deleteMany({}).then(()=>{
            mongoose.disconect().then(()=> {
                done();
            });
        });
            
    });


});