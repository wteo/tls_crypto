import { expect } from 'chai';
import sinon from 'sinon';

import CSRFProtection from '../middlewares/csrf_protection.js';

describe('CSRF Token Middleware', () => {

    let req, res, next;

    beforeEach(() => {
        req = { 
            session: {},
            body: {},
            headers: {}
        }
        res = { 
            locals: {},
            status: sinon.stub().returnsThis(),
            send: sinon.spy()
        }
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('generateCSRFToken', () => {
        
        it('should create a csrf session token if there is none', () => {
            expect(req.session.csrfToken).to.be.undefined;
            CSRFProtection.generateCSRFToken(req, res, next);
            expect(req.session.csrfToken).to.be.a('string').and.to.have.lengthOf(32);
            expect(res.locals.csrfToken).to.equal(req.session.csrfToken);
            expect(next.calledOnceWithExactly()).to.be.true;
        });

        it('should not overwrite an existing csrf session token', () => {
            req.session.csrfToken = 'existing-token';
            CSRFProtection.generateCSRFToken(req, res, next);
            expect(req.session.csrfToken).to.equal('existing-token');
            expect(res.locals.csrfToken).to.equal('existing-token');
            expect(next.calledOnceWithExactly()).to.be.true;
        });

    });

    describe('verifyCSRFToken', () => {

        it('should send a 403 status and an "Invalid CSRF token" message if the token in the session does not match the submitted token', () => {
            req.session.csrfToken = 'existing-token';
            req.body.csrfToken = 'different-token';
            CSRFProtection.verifyCSRFToken(req, res, next);
            expect(res.status.calledWith(403)).to.be.true;
            expect(res.send.calledWith('Invalid CSRF token')).to.be.true;
            expect(next.notCalled).to.be.true; 
        });

        it('should call next if the token in the session matches the submitted token', () => {
            req.session.csrfToken = 'existing-token';
            req.body.csrfToken = 'existing-token';
            CSRFProtection.verifyCSRFToken(req, res, next);
            expect(res.status.notCalled).to.be.true;
            expect(res.send.notCalled).to.be.true;
            expect(next.calledOnceWithExactly()).to.be.true;
        });

        it('should send a 403 status if the CSRF token in headers does not match the session token', () => {
            req.session.csrfToken = 'existing-token';
            req.headers['x-csrf-token'] = 'different-token';
            CSRFProtection.verifyCSRFToken(req, res, next);
            expect(res.status.calledWith(403)).to.be.true;
        });        

        it('should call next if the token in the session matches the token in headers', () => {
            req.session.csrfToken = 'existing-token';
            req.headers['x-csrf-token'] = 'existing-token';
            CSRFProtection.verifyCSRFToken(req, res, next);
            expect(next.calledOnce).to.be.true;
        });                
    });
});
