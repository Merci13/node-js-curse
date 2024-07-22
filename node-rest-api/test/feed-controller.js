
const expect = require('chai').expect;
const sinon = require('sinon');
const moongose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controller/feed');


describe('Feed Controller - Login', function(){
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

    it('Should add a created post to the posts of the creator', function(done){


        const req = {
            body: {
                title: "Test Post",
                content: "A test Post"
            },
            file:{
                path: 'abc'
            },
            userId: '5c0f66b979af55031b34728a'

        }
            const res = {status: function(){
                return this;
            }, json: function(){} };
            FeedConstroller(req, res, () =>{}).then((savedUser => {

                expect(savedUser).to.have.property('posts');
                expect(savedUser.posts).to.have.length(1);
                done();

            }));


    });


    after(function(done){
        User.deleteMany({}).then(()=>{
            mongoose.disconect().then(()=> {
                done();
            });
        });
            
    });


});