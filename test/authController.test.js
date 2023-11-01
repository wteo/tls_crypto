/* 
import { expect } from 'chai';
import sinon from 'sinon';
import authController from '../controllers/auth.js';
import Users from '../models/users.js';

beforeEach(() => {
    sinon.stub(Users, 'findOne');
});

afterEach(() => {
    Users.findOne.restore();
});

describe('Get Forms', () => {

    let req, res;

    // Set up common mock objects before each test
    beforeEach(() => {
        req = { 
            flash: sinon.stub().returns([]),
            session: { oldInput: {} }  
        };
        res = { render: sinon.spy() };
    });

    it('renders the registration form with expected arguments', () => {
        authController.getRegisterForm(req, res);
        expect(res.render.calledWith(sinon.match.string, sinon.match.object)).to.be.true;
    });

    it('renders the login form with expected arguments', () => {
        authController.getLoginForm(req, res);
        expect(res.render.calledWith(sinon.match.string, sinon.match.object)).to.be.true;
    });
});


describe('postRegisterForm', () => {
    it('should throw an error if the email is invalid', async () => {
        const req = {
            body: {
                username: 'invalidEmail',
                password: 'Test1234',
                confirmedPassword: 'Test1234'
            },
            flash: sinon.spy(),
            session: {}
        };
        const res = {
            redirect: sinon.spy()
        };
        await authController.postRegisterForm(req, res, () => {});
        expect(req.flash.calledWith('error', 'Your username must be a valid email.')).to.be.true;
        expect(res.redirect.calledWith('/register')).to.be.true;
    });

    it('should throw an error if password conditions are not met', async () => {
        // ...
    });

    it('should create a new user if all conditions are met', async () => {
        // ...
    });
});


describe('postLoginForm', () => {
    it('should throw an error if the user does not exist', async () => {
        // ...
    });

    it('should throw an error if the password is incorrect', async () => {
        // ...
    });

    it('should log in the user if the credentials are correct', async () => {
        // ...
    });
});

describe('postLogout', () => {
    it('should log out the user and redirect', () => {
        const req = { session: { destroy: sinon.stub().yields() } };
        const res = { redirect: sinon.spy() };
        authController.postLogout(req, res);
        expect(req.session.destroy.calledOnce).to.be.true;
        expect(res.redirect.calledWith('/')).to.be.true;
    });
});


*/
