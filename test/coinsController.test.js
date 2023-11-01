import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import sinon from 'sinon';
import coinsController from '../controllers/coins.js'; 
import Coins from '../models/coins.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Coins Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: {},
            body: {}
        };
        res = {
            render: sinon.spy(),
            redirect: sinon.spy(),
            status: sinon.stub().returnsThis()
        };
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getSelectedCoin', () => {
        it('should render a 404 page if coin is not found', async () => {
            sinon.stub(Coins, 'findOne').resolves(null);
            await coinsController.getSelectedCoin(req, res, next);
            expect(res.render.calledWith(path.join(__dirname, '..', 'views', '404.ejs'))).to.be.true;
        });

        it('should render the coin page if coin is found', async () => {
            const mockCoinData = {
                coin: 'TestCoin',
                description: 'Test Description',
                imageLink: 'TestImageLink',
                resources: []
            };
            sinon.stub(Coins, 'findOne').resolves(mockCoinData);
            await coinsController.getSelectedCoin(req, res, next);
            const expectedPath = path.join(__dirname, '..', 'views', 'coin.ejs');
            const expectedData = {
                group: req.params.group,
                coin: 'TestCoin',
                description: 'Test Description',
                imageLink: 'TestImageLink',
                resources: []
            };
            expect(res.render.calledWith(expectedPath, expectedData)).to.be.true;
        });

        it('should call next with an error if there is a database error', async () => {
            const mockError = new Error('Database error');
            sinon.stub(Coins, 'findOne').throws(mockError);
            await coinsController.getSelectedCoin(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

    describe('deleteResource', () => {
        it('should delete the resource and redirect to the admin page', async () => {
            req.body = {
                coin: 'TestCoin',
                resourceId: '123456'
            };
            sinon.stub(Coins, 'updateOne').resolves();
            await coinsController.deleteResource(req, res, next);
            const expectedRedirectPath = `/${encodeURIComponent(req.params.group)}/${encodeURIComponent(req.body.coin)}/admin`;
            expect(res.redirect.calledWith(expectedRedirectPath)).to.be.true;
        });

        it('should call next with an error if there is a database error', async () => {
            const mockError = new Error('Database error');
            sinon.stub(Coins, 'updateOne').throws(mockError);
            await coinsController.deleteResource(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

    describe('addResource', () => {
        it('should add a new resource and redirect to the admin page', async () => {
            req.params = {
                group: 'TestGroup',
                coin: 'TestCoin'
            };
            req.body = {
                resource: 'TestResource',
                imageLink: 'TestImageLink',
                hyperlink: 'TestHyperlink'
            };
            sinon.stub(Coins, 'updateOne').resolves();
            await coinsController.addResource(req, res, next);
            const expectedRedirectPath = `/${encodeURIComponent(req.params.group)}/${encodeURIComponent(req.params.coin)}/admin`;
            expect(res.redirect.calledWith(expectedRedirectPath)).to.be.true;
        });

        it('should call next with an error if there is a database error', async () => {
            const mockError = new Error('Database error');
            sinon.stub(Coins, 'updateOne').throws(mockError);
            await coinsController.addResource(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

    describe('updateResource', () => {
        it('should update the resource and redirect to the admin page', async () => {
            req.params = {
                group: 'TestGroup',
                coin: 'TestCoin'
            };
            req.body = {
                resource: 'UpdatedResource',
                imageLink: 'UpdatedImageLink',
                hyperlink: 'UpdatedHyperlink',
                resourceId: '123456'
            };
            sinon.stub(Coins, 'updateOne').resolves();
            await coinsController.updateResource(req, res, next);
            const expectedRedirectPath = `/${encodeURIComponent(req.params.group)}/${encodeURIComponent(req.params.coin)}/admin`;
            expect(res.redirect.calledWith(expectedRedirectPath)).to.be.true;
        });

        it('should call next with an error if there is a database error', async () => {
            const mockError = new Error('Database error');
            sinon.stub(Coins, 'updateOne').throws(mockError);
            await coinsController.updateResource(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

});

