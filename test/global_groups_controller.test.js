import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import sinon from 'sinon';

import globalGroupsController from '../controllers/global_groups.js'; // Update the path accordingly
import GlobalGroupsModel from '../models/global_groups.js';
import Groups from '../models/groups.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('globalGroupsController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            query: {}
        };
        res = {
            locals: {},
            render: sinon.spy()
        };
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getCategories', () => {
        it('should set categories and groups in res.locals and call next', async () => {
            const mockCategories = ['Category1', 'Category2'];
            const mockGroups = [{ group: 'Group1' }, { group: 'Group2' }];
            sinon.stub(Groups, 'distinct').resolves(mockCategories);
            sinon.stub(GlobalGroupsModel.prototype, 'getGroupsWithSortedCoins').resolves(mockGroups);
            await globalGroupsController.getCategories(req, res, next);
            expect(res.locals.categories).to.deep.equal(mockCategories);
            expect(res.locals.groups).to.deep.equal(mockGroups);
            expect(next.calledOnce).to.be.true;
        });

        it('should call next with an error if there is a database error', async () => {
            const mockError = new Error('Database error');
            sinon.stub(Groups, 'distinct').throws(mockError);
            await globalGroupsController.getCategories(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

    describe('getGroups', () => {
        it('should render the groups view with groups from res.locals', () => {
            const mockGroups = [{ group: 'Group1' }, { group: 'Group2' }];
            res.locals.groups = mockGroups;
            globalGroupsController.getGroups(req, res);
            expect(res.render.calledWith(path.join(__dirname, '..', 'views', 'groups.ejs'), { groups: mockGroups })).to.be.true;
        });
    });

    describe('fetchSearchResults', () => {
        it('should render the results view with search results', async () => {
            const mockQuery = 'TestCoin';
            const mockResults = [{ coin: 'TestCoin1' }, { coin: 'TestCoin2' }];
            req.query.coin = mockQuery;

            sinon.stub(GlobalGroupsModel.prototype, 'searchByCoin').resolves(mockResults);

            await globalGroupsController.fetchSearchResults(req, res, next);

            expect(res.locals.results).to.deep.equal(mockResults);
            expect(res.render.calledWith(path.join(__dirname, '..', 'views', 'results.ejs'))).to.be.true;
        });

        it('should call next with an error if there is a database error', async () => {
            const mockError = new Error('Database error');
            sinon.stub(GlobalGroupsModel.prototype, 'searchByCoin').throws(mockError);
            await globalGroupsController.fetchSearchResults(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });
});
