require('dotenv').config();
const assert = require("chai").assert;
const mocha = require("mocha");

const UserService = require('../services/user');
// const UserModel = require('../models/user');
const {ROLE} = require('../constant/index');

//todo mock data access layer

// const mockUserModel={
//     usersObj:{},
// };
// mockUserModel.findAll=async(options)=>{
//
// }

// const userServiceInstance = new UserService({UserModel});


mocha.describe("User Service", () => {

    mocha.describe("User Register", () => {
        it("User can register", async () => {
            let email = 'fran113885@gmail.com'
            let password = 'pass';
            let name = 'frank1235';
            let role = ROLE.STUDENT;

            // let registerResult = await userServiceInstance.registerUser({name, email, password, role});
            // assert(registerResult.message === undefined, 'register fail');

        });

    });

    mocha.describe("User Login", () => {
        it("User can login when email and password correct", async () => {
            let email = 'fran113884@gmail.com'
            let password = 'pass';
            // let loginResult = await userServiceInstance.login({email, password});
            // assert(loginResult.message === undefined, 'login fail');

        });

    });

});