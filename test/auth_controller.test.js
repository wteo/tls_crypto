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

    let req, res, next, bcryptHashStub, userCreateStub, userFindOneStub, userMock;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
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
            redirect: sinon.spy(),
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

    describe('postLogout', () => {

        let sessionDestroyStub;

        beforeEach(() => {
            req.session.destroy = sinon.stub();
            sessionDestroyStub = req.session.destroy;
            next = sinon.stub();
        });

        it('should destroy the session and redirect to the home page', () => {

            sessionDestroyStub.callsFake((callback) => {
                callback(null); // Simulate no error on session destroy
            });
       
            authController.postLogout(req, res, next);
        
            expect(sessionDestroyStub.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
            expect(next.notCalled).to.be.true;
        });
    
        it('should call next with an error if session destruction fails', () => {
            const error = new Error('Session destruction failed');
            sessionDestroyStub.callsFake((callback) => {
                callback(error); // Simulate error on session destroy
            });
        
            authController.postLogout(req, res, next);
        
            expect(sessionDestroyStub.calledOnce).to.be.true;
            expect(res.redirect.notCalled).to.be.true;
            expect(next.calledWith(error)).to.be.true;
        });
    });

    describe('getPasswordResetForm', () => {

        it('should render the forgot_password template with success and error messages', () => {

            req.flash.withArgs('success').returns(['Success message']);
            req.flash.withArgs('error').returns(['Error message']);

            const expectedPath = path.join(__dirname, '..', 'views', 'auth', 'forgot_password.ejs');
            const expectedOptions = {
                successMessage: 'Success message',
                errorMessage: 'Error message',
            };
        
            authController.getPasswordResetForm(req, res);
        
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith(expectedPath, expectedOptions)).to.be.true;
        });
    });

    /*
    describe('postPasswordResetForm', () => {

    });

    describe('getNewPasswordForm', () => {

        beforeEach(() => {
            req.params = { token: 'valid-token' };
            userMock = {
                _id: 'valid-user-id'
            }
        });

        it('should render the new password form if the user exists', async () => {
            userFindOneStub.resolves(userMock);
            await authController.getNewPasswordForm(req, res, next);
            expect(Users.findOne.calledOnce).to.be.true;
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal(path.join(__dirname, '..', 'views', 'auth', 'new_password.ejs'));
            expect(res.render.firstCall.args[1]).to.deep.equal({
                userId: userMock._id.toString(),
                errorMessage: undefined,
                passwordToken: 'valid-token',
            });
        });
        
        it('should render the 404 page if the user does not exist', async () => {
            userFindOneStub.resolves(null);
            await authController.getNewPasswordForm(req, res, next);
            expect(Users.findOne.calledOnce).to.be.true;
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal(path.join(__dirname, '..', 'views', '404.ejs'));
        });

        it('should call next with an error if there is a database error', async () => {
            const mockError = new Error('Database Error');
            userFindOneStub.rejects(mockError);
            await authController.getNewPasswordForm(req, res, next);
            expect(next.calledOnce).to.be.true;
            expect(next.calledWith(mockError)).to.be.true;
        });

    });
    */

    describe('postNewPasswordForm', () => {

        beforeEach(() => {
            req.body = {
                newPassword: 'NewPass123!',
                confirmedNewPassword: 'NewPass123!',
                passwordToken: 'valid-token',
                userId: 'valid-user-id'
            }
    
            userMock = {
                password: '',
                resetToken: undefined,
                tokenExpiration: undefined,
                save: sinon.stub().resolves()
            };
            userFindOneStub.resolves(userMock);
            bcryptHashStub.resolves('hashed-password');
        });

        it('should redirect to login after successfully updating password', async () => {
            await authController.postNewPasswordForm(req, res, next);
            expect(bcryptHashStub.calledOnce).to.be.true;
            expect(userMock.save.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/login')).to.be.true;
        });

        it('should redirect to reset page with an error if passwords do not match', async () => {
            req.body.confirmedNewPassword = 'DifferentPass123!';
            await authController.postNewPasswordForm(req, res, next);
            expect(req.flash.calledWith('error', 'Passwords do not match.')).to.be.true;
            expect(res.redirect.calledWith(`/reset/${req.body.passwordToken}`)).to.be.true;
        });

        it('should redirect to reset page with an error if password does not meet criteria', async () => {
            req.body.newPassword = 'short';
            await authController.postNewPasswordForm(req, res, next);
            expect(req.flash.calledWith('error')).to.be.true;
            expect(res.redirect.calledWith(`/reset/${req.body.passwordToken}`)).to.be.true;
        });

    })

});
