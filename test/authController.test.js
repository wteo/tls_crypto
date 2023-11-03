import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';

import path from 'path';
import { fileURLToPath } from 'url';

import authController from '../controllers/auth.js'; 
import Users from '../models/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('authController', () => {

    let req, res, next, bcryptHashStub, userCreateStub, userFindOneStub;

    beforeEach(() => {
        req = {
            body: {},
            flash: sinon.stub(),
            session: {
                save: sinon.stub().yields(null),
                destroy: sinon.stub().yields(null),
                oldInput: {}
            },
            save: sinon.stub()
        };
        res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };
        next = sinon.spy();
        bcryptHashStub = sinon.stub(bcrypt, 'hash');
        userCreateStub = sinon.stub(Users, 'create');
        userFindOneStub = sinon.stub(Users, 'findOne');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getRegisterForm', () => {
        it('should render the registration form with expected variables', () => {
        req.flash.returns([]);
        req.session.oldInput = { username: 'test@example.com' }; 
        authController.getRegisterForm(req, res);
        expect(res.render.calledOnce).to.be.true;

        const expectedPath = path.join(__dirname, '..', 'views', 'auth', 'register.ejs');
        const expectedOptions = {
            errorMessage: undefined, 
            oldInput: req.session.oldInput
        };

        expect(res.render.firstCall.args[0]).to.equal(expectedPath);
        expect(res.render.firstCall.args[1]).to.deep.equal(expectedOptions);
        });
    });

    describe('postRegisterForm', () => {
        
        beforeEach(() => {
            req.body = {
                username: 'test@example.com',
                password: 'Password123!',
                confirmedPassword: 'Password123!'
            };
        });

        it('should redirect to /register with an error if username is not a valid email', async () => {
          req.body.username = 'invalidemail';
          await authController.postRegisterForm(req, res, next);
          expect(req.flash.calledWith('error')).to.be.true;
          expect(res.redirect.calledWith('/register')).to.be.true;
        });
    
        it('should redirect to /register with an error if password does not meet criteria', async () => {
          req.body.password = 'short';
          req.body.confirmedPassword = 'short';
          await authController.postRegisterForm(req, res, next);
          expect(req.flash.calledWith('error')).to.be.true;
          expect(res.redirect.calledWith('/register')).to.be.true;
        });
    
        it('should redirect to /register with an error if passwords do not match', async () => {
          req.body.confirmedPassword = 'DifferentPassword123!';
          await authController.postRegisterForm(req, res, next);
          expect(req.flash.calledWith('error')).to.be.true;
          expect(res.redirect.calledWith('/register')).to.be.true;
        });
    
        it('should create a new user and redirect to /login on successful registration', async () => {
          userFindOneStub.resolves(null);
          bcryptHashStub.resolves('hashedPassword');
          userCreateStub.resolves({ _id: 'newUserId' });
    
          await authController.postRegisterForm(req, res, next);
    
          expect(userCreateStub.calledOnce).to.be.true;
          expect(req.flash.calledWith('success')).to.be.true;
          expect(res.redirect.calledWith('/login')).to.be.true;
        });
    
        it('should redirect to /register with an error if username is already registered', async () => {
          userFindOneStub.resolves({ _id: 'existingUserId' });
    
          await authController.postRegisterForm(req, res, next);
    
          expect(req.flash.calledWith('error')).to.be.true;
          expect(res.redirect.calledWith('/register')).to.be.true;
        });
    
        it('should call next with an error if there is a problem during registration', async () => {
          userFindOneStub.rejects(new Error('Database error'));
    
          await authController.postRegisterForm(req, res, next);
    
          expect(next.calledOnce).to.be.true;
          expect(next.firstCall.args[0]).to.be.instanceOf(Error);
        });
    });

    describe('getLoginForm', () => {

        it('should render the login view with messages and old input', () => {
            // Setup flash messages and old input
            req.flash.withArgs('success').returns(['Success message']);
            req.flash.withArgs('error').returns(['Error message']);
            req.session.oldInput = { username: 'test@example.com' };
        
            // Call the function to test
            authController.getLoginForm(req, res);
        
            // Path to the ejs file
            const expectedPath = path.join(__dirname, '..', 'views', 'auth', 'login.ejs');
        
            // Assert that res.render was called with the correct arguments
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal(expectedPath);
            expect(res.render.firstCall.args[1]).to.deep.equal({
                successMessage: 'Success message',
                errorMessage: 'Error message',
                oldInput: { username: 'test@example.com' }
            });
        });
    
        it('should render the login view with default values if no messages or old input', () => {
            // Setup flash messages and old input
            req.flash.withArgs('success').returns([]);
            req.flash.withArgs('error').returns([]);
            req.session.oldInput = undefined;
        
            // Call the function to test
            authController.getLoginForm(req, res);
        
            // Path to the ejs file
            const expectedPath = path.join(__dirname, '..', 'views', 'auth', 'login.ejs');
        
            // Assert that res.render was called with the correct arguments
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal(expectedPath);
            expect(res.render.firstCall.args[1]).to.deep.equal({
                successMessage: undefined,
                errorMessage: undefined,
                oldInput: {}
            });
        });
    });

    
    describe('postLoginForm', () => {

        let bcryptCompareStub;

        beforeEach(() => {
            req.body = {
                username: 'test@example.com',
                password: 'password123'
            },
            bcryptCompareStub = sinon.stub(bcrypt, 'compare');
        });

        it('should redirect to /login with an error if no user exists', async () => {
            userFindOneStub.resolves(null);

            await authController.postLoginForm(req, res, next);

            expect(userFindOneStub.calledWith({ username: req.body.username })).to.be.true;
            expect(req.flash.calledWith('error', 'No username exists. Please register a new account.')).to.be.true;
            expect(res.redirect.calledWith('/login')).to.be.true;
        });

        it('should redirect to /admin if password is correct', async () => {
            const user = { username: req.body.username, password: 'hashedPassword' };
            userFindOneStub.resolves(user);
            bcryptCompareStub.resolves(true);

            await authController.postLoginForm(req, res, next);

            expect(bcryptCompareStub.calledWith(req.body.password, user.password)).to.be.true;
            expect(req.session.isLoggedIn).to.be.true;
            expect(req.session.user).to.equal(user);
            expect(res.redirect.calledWith('/admin')).to.be.true;
        });

        it('should redirect to /login with an error if password is incorrect', async () => {
            const user = { username: req.body.username, password: 'hashedPassword' };
            userFindOneStub.resolves(user);
            bcryptCompareStub.resolves(false);

            await authController.postLoginForm(req, res, next);

            expect(req.flash.calledWith('error', 'Invalid password!')).to.be.true;
            expect(res.redirect.calledWith('/login')).to.be.true;
        });

        it('should call next with an error if an exception occurs', async () => {
            const error = new Error('An error occurred');
            userFindOneStub.throws(error);

            await authController.postLoginForm(req, res, next);

            expect(next.calledWith(error)).to.be.true;
        });
    });

    

});
