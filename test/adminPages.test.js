import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import sinon from 'sinon';

import groupsController from '../controllers/admin/pages.js';
import Coins from '../models/coins.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Get Admin Pages', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: {},
        };
        res = {
            render: sinon.spy(),
            status: sinon.stub().returnsThis(),
            locals: {
                groups: []
            }
        };
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getMainPage', () => {
        it('should render the main page', () => {
            groupsController.getMainPage(req, res);
            const expectedPath = path.join(__dirname, '..', 'views', 'admin', 'pages', 'groups.ejs');
            expect(res.render.calledWith(expectedPath)).to.be.true;
        });
    });

    describe('getGroupPage', () => {
        it('should render a 404 page if no group is found', () => {
            req.params.group = 'NonExistentGroup';
            groupsController.getGroupPage(req, res);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith(path.join(__dirname, '..', 'views', '404.ejs'))).to.be.true;
        });

        it('should render the group page if the group is found', () => {
            req.params.group = 'TestGroup';
            res.locals.groups = [{ group: 'TestGroup', description: 'Test Description', coins: [] }];
            groupsController.getGroupPage(req, res);
            const expectedPath = path.join(__dirname, '..', 'views', 'admin', 'pages', 'group.ejs');
            const expectedData = {
                group: 'TestGroup',
                description: 'Test Description',
                coins: []
            };
            expect(res.render.calledWith(expectedPath, expectedData)).to.be.true;
        });
    });

    describe('getCoinPage', () => {
        it('should render the coin page', async () => {
            req.params.group = 'TestGroup';
            req.params.coin = 'TestCoin';
            const mockCoinData = {
                coin: 'TestCoin',
                description: 'Test Description',
                imageLink: 'TestImageLink',
                resources: []
            };
            sinon.stub(Coins, 'findOne').resolves(mockCoinData);
            await groupsController.getCoinPage(req, res, next);
            const expectedPath = path.join(__dirname, '..', 'views', 'admin', 'pages', 'coin.ejs');
            const expectedData = {
                group: 'TestGroup',
                coin: 'TestCoin',
                description: 'Test Description',
                imageLink: 'TestImageLink',
                resources: []
            };
            expect(res.render.calledWith(expectedPath, expectedData)).to.be.true;
        });

        it('should call next with an error if there is a database error', async () => {
            req.params.coin = 'TestCoin';
            const mockError = new Error('Database error');
            sinon.stub(Coins, 'findOne').throws(mockError);
            await groupsController.getCoinPage(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });
});
