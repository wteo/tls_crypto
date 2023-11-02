import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import sinon from 'sinon';

import groupsController from '../controllers/admin/forms.js';
import Coins from '../models/coins.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

describe('Get Admin Forms', () => {

    let req, res, next, mockCoinData;
    
    beforeEach(() => {
        req = { 
            flash: sinon.stub().returns([]),
            session: { oldInput: {} }, 
            params: {}
        };
        res = { 
            render: sinon.spy(),
            status: sinon.stub().returnsThis(),
            locals: {
                categories: [],
                groups: []
            } 
        };
        next = sinon.spy();
        mockCoinData = {};
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Group Form', () => {
        
        beforeEach(() => {
            res.locals.groups = [{ category: 'Sample', group: 'TestGroup', description: 'Test Description' }];
        });

        afterEach(() => {
            res.locals.groups = [];
        })

        it('Add Group Form - renders form with expected arguments', () => {
            groupsController.getAddGroupForm(req, res);
            
            const expectedPath = path.join(__dirname, '..', 'views', 'admin', 'forms', 'add_group.ejs');
            const expectedData = {
                errorMessage: undefined,
                oldInput: {}
            };
            
            expect(res.render.calledWith(expectedPath, expectedData)).to.be.true;
        });

        it('Update Group Form - renders a 404 page when the specified group is not found', () => {
            req.params.group = 'NonExistentGroup';
            groupsController.getUpdateGroupForm(req, res);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith(path.join(__dirname, '..', 'views', '404.ejs'))).to.be.true;
        });
    
        it('Update Group Form renders the Update Group form with expected arguments when the specified group is found', () => {
            req.params.group = 'TestGroup';
            groupsController.getUpdateGroupForm(req, res);
            const expectedPath = path.join(__dirname, '..', 'views', 'admin', 'forms', 'update_group.ejs');
            const expectedData = {
                category: 'Sample',
                group: 'TestGroup',
                description: 'Test Description',
                errorMessage: undefined
            };
            expect(res.render.calledWith(expectedPath, expectedData)).to.be.true;
        });

    })

    describe('Coin Form', () => {

        it('Add Coin Form - renders a 404 page when there are no categories or groups', () => {
            groupsController.getAddCoinForm(req, res);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith(path.join(__dirname, '..', 'views', '404.ejs'))).to.be.true;
        });

        it('Add Coin Form - renders the Add Coin form with expected arguments when there are categories and groups', () => {
            res.locals.categories = ['SampleCategory'];
            res.locals.groups = ['SampleGroup'];
            groupsController.getAddCoinForm(req, res);
            const expectedPath = path.join(__dirname, '..', 'views', 'admin', 'forms', 'add_coin.ejs');
            const expectedData = {
                categories: ['SampleCategory'],
                groups: ['SampleGroup'],
                errorMessage: undefined,
                oldInput: {}
            };
            expect(res.render.calledWith(expectedPath, expectedData)).to.be.true;
        });

        it('Update Coin Form - renders form with expected arguments', async () => {
            req.params = {
                group: 'TestGroup',
                coin: 'TestCoin'
            };
            res.locals.groups = [{
                group: 'TestGroup',
                coins: [{
                    coin: 'TestCoin',
                    coinLogoLink: 'TestLink'
                }]
            }];
            mockCoinData = {
                description: 'Test Description',
                imageLink: 'TestImageLink'
            }
            sinon.stub(Coins, 'findOne').resolves(mockCoinData);
            await groupsController.getUpdateCoinForm(req, res, next);
            const expectedPath = path.join(__dirname, '..', 'views', 'admin', 'forms', 'update_coin.ejs');
            const expectedData = {
                group: 'TestGroup',
                paramsCoin: 'TestCoin',
                coin: 'TestCoin',
                coinLogoLink: 'TestLink',
                description: 'Test Description',
                imageLink: 'TestImageLink',
                errorMessage: undefined
            };
            expect(res.render.calledWith(expectedPath, expectedData)).to.be.true;
        });

    });

    describe('Resource Form', () => {

        it('Add Resource Form - renders form with expected arguments', async () => {

            req.params = {
                group: 'TestGroup',
                coin: 'TestCoin'
            };

            await groupsController.getAddResourceForm(req, res, next);
            
            const expectedPath = path.join(__dirname, '..', 'views', 'admin', 'forms', 'add_resource.ejs');
            const expectedData = {
                group: 'TestGroup',
                coin: 'TestCoin'
            };
            
            expect(res.render.calledWith(expectedPath, expectedData)).to.be.true;

        });

        it('Update Resource Form - renders form with expected arguments', async () => {
            
            req.params = {
                group: 'TestGroup',
                coin: 'TestCoin',
                resourceId: '1234567890abcdef'
            };

            mockCoinData = {
                resources: [{
                    _id: '1234567890abcdef',
                    resource: 'TestResource',
                    imageLink: 'TestImageLink',
                    hyperlink: 'TestHyperlink'
                }]
            };

            sinon.stub(Coins, 'findOne').resolves(mockCoinData);

            await groupsController.getUpdateResourceForm(req, res, next);

            const expectedPath = path.join(__dirname, '..', 'views', 'admin', 'forms', 'update_resource.ejs');
            const expectedData = {
                group: 'TestGroup',
                coin: 'TestCoin',
                resource: 'TestResource',
                imageLink: 'TestImageLink',
                hyperlink: 'TestHyperlink',
                resourceId: '1234567890abcdef'
            };
            expect(res.render.calledWith(expectedPath, expectedData)).to.be.true;

        });

    })

});
