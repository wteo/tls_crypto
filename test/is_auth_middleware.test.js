import { expect } from 'chai';
import sinon from 'sinon';
import checkAuth from '../middlewares/is_auth.js';

describe('Is Auth Middleware', () => {

    let req, res, next;

    beforeEach(() => {
        req = { session: { isLoggedIn: {} } };
        res = { redirect: sinon.spy() };
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.resetHistory();
    })
    
    it('should call next when the user is logged in', () => {
        req.session.isLoggedIn = true;
        checkAuth(req, res, next);
        expect(next.calledOnce).to.be.true;
    });

    it('should redirect to login page and not call next when the user is logged out', () => {
        req.session.isLoggedIn = false;
        checkAuth(req, res, next);
        expect(next.notCalled).to.be.true;
        expect(res.redirect.calledWith('/login')).to.be.true;
    });
});