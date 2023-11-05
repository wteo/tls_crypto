import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import sinon from 'sinon';

import groupsController from '../controllers/groups.js';
import Groups from '../models/groups.js';
import Coins from '../models/coins.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Groups Controller', () => {

    let req, res, next, mockError;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            session: { 
                oldInput: {},
                save: sinon.stub().callsFake(callback => callback())
            },
            flash: sinon.stub()
        };
        res = {
            locals: {},
            render: sinon.spy(),
            status: sinon.stub().returnsThis(),
            redirect: sinon.spy(),
            json: sinon.spy()
        };
        next = sinon.spy();
        mockError = new Error('Database error');
    });

    afterEach(() => {
        sinon.restore();
    });
    

    describe('fetchGroup', () => {

        it('should render the group view if group is found', async () => {
            const mockGroupData = {
                group: 'TestGroup',
                description: 'TestDescription',
                coins: ['Coin1', 'Coin2']
            };

            sinon.stub(Groups, 'findOne').callsFake((query) => {
                if (query.hasOwnProperty('group') && !query.hasOwnProperty('_id')) {
                    return Promise.resolve(mockGroupData);
                } else {
                    return Promise.resolve(null);
                }
            });

            req.params.group = 'TestGroup';
            await groupsController.fetchGroup(req, res, next);

            expect(res.render.calledWith(path.join(__dirname, '..', 'views', 'group.ejs'), {
                group: mockGroupData.group,
                description: mockGroupData.description,
                coins: mockGroupData.coins.sort()
            })).to.be.true;
        });

        it('should render 404 page if group is not found', async () => {
            req.params.group = 'NonExistentGroup';
            sinon.stub(Groups, 'findOne').resolves(null);
            await groupsController.fetchGroup(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.render.calledWith(path.join(__dirname, '..', 'views', '404.ejs'))).to.be.true;
        });
          
        it('should call next with an error if there is a database error', async () => {
            sinon.stub(Groups, 'findOne').throws(mockError);
            await groupsController.fetchGroup(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

    describe('addGroup', () => {

        it('should redirect to group admin page if group is added successfully', async () => {
            req.body = { category: 'Sample', group: 'TestGroup', description: 'Test Description' }
            
            sinon.stub(Groups, 'findOne').callsFake((query) => {
                if (query.hasOwnProperty('group')) {
                    return Promise.resolve(null);
                } else {
                    return Promise.resolve({ group: req.body.group }); 
                }
            });           
            sinon.stub(Groups, 'create').resolves({
                category: req.body.category,
                group: req.body.group,
                description: req.body.description
            });
            await groupsController.addGroup(req, res, () => {});
            expect(res.redirect.calledWith('/TestGroup/admin')).to.be.true;
        });

        it('should flash an error message if group already exists in the database', async () => {
            sinon.stub(Groups, 'findOne').resolves({ group: 'TestGroup'});
            await groupsController.addGroup(req, res, next);
            expect(req.flash.calledWith('error', 'This group already exists in our database. Please update the existing group or choose a different group name.')).to.be.true;
            expect(res.redirect.calledWith('/admin/add-group-form')).to.be.true;
        });

        it('should call next with an error if database query fails', async () => {
            sinon.stub(Groups, 'findOne').throws(mockError);
            await groupsController.addGroup(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

    describe('updateGroup', () => {
        
        it('should redirect to admin page if group is updated successfully', async () => {
            req = { 
                body: { 
                    category: 'Sample', 
                    group: 'TestGroup', 
                    description: 'Test Description' 
                }, 
                params: { group: 'TestGroup' } 
            };

            sinon.stub(Groups, 'findOne').callsFake((query) => {
                if (query === null) {
                    return Promise.resolve({ group: null });
                } 
                return Promise.resolve({ group: 'TestGroup' });
            });

            sinon.stub(Groups, 'updateOne').resolves({});

            await groupsController.updateGroup(req, res, () => {});
            expect(res.redirect.calledWith('/admin')).to.be.true;
        });
        
        it('should flash an error message if group name is changed to another existing group\'s name', async () => {
            req.body.group = 'ExistingGroupName';
            req.params.group = 'OriginalGroupName';
            sinon.stub(Groups, 'findOne').callsFake((query) => {
                if (query.group === 'ExistingGroupName') {
                    return Promise.resolve({ group: 'ExistingGroupName' });
                } 
                return Promise.resolve({ group: null });
            });

            await groupsController.updateGroup(req, res, next);
            expect(req.flash.calledWith('error', 'This group already exists in our database. Please update the existing group or choose a different group name.')).to.be.true;
            expect(res.redirect.calledWith(`/${encodeURIComponent(req.params.group)}/admin/update-group-form`)).to.be.true;    

        });

        it('should call next with an error if database query fails', async () => {
            sinon.stub(Groups, 'findOne').throws(mockError);
            await groupsController.updateGroup(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

    describe('deleteGroup', () => {

        it('should redirect to admin page if group is deleted successfully', async () => {
            req.body = { group: 'TestGroup' };
            sinon.stub(Groups, 'deleteOne').resolves({ group: req.body.group });
            await groupsController.deleteGroup(req, res, () => {});
            expect(res.redirect.calledWith('/admin')).to.be.true;
        });

        it('should call next with an error if database query fails', async () => {
            sinon.stub(Groups, 'deleteOne').throws(mockError);
            await groupsController.deleteGroup(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

    describe('addCoin', () => {

        it('should redirect to coin admin page if coin is added successfully', async () => {

            req.body = {
                coin: 'TestCoin',
                description: 'Test Description',
                imageLink: 'www.testlink.com',
                resources: []
            }

            const mockData = {
                _id: '12345',
                category: 'Category Data',
                group: 'Group Data',
                description: 'Group Description',
                coins: []
            }
            
            sinon.stub(Coins, 'findOne').resolves(null);
            sinon.stub(Groups, 'updateOne').resolves(mockData);
            sinon.stub(Coins, 'create').resolves(req.body);
            await groupsController.addCoin(req, res, next);
            expect(res.redirect.calledWith(`/${encodeURIComponent(req.body.group)}/admin`)).to.be.true;
        });

        it('should flash an error message if coin already exists in the database', async () => {
            sinon.stub(Coins, 'findOne').resolves({});
            await groupsController.addCoin(req, res, next);
            expect(req.flash.calledWith('error', 'This coin already exists in our database. Please update the existing coin or choose a different name.')).to.be.true;
            expect(res.redirect.calledWith('/admin/add-coin-form')).to.be.true;
        });

        it('should call next with an error if database query fails', async () => {
            sinon.stub(Coins, 'findOne').throws(mockError);
            await groupsController.addCoin(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

    describe('updateCoin', () => {

        it('should redirect to coin admin page if coin is updated successfully', async () => {
            sinon.stub(Coins, 'findOne').resolves({ coin: req.params.coin });
            sinon.stub(Groups, 'updateOne').resolves({});
            sinon.stub(Coins, 'updateOne').resolves({});
            await groupsController.updateCoin(req, res, next);
            expect(res.redirect.calledWith(`/${encodeURIComponent(req.params.group)}/${encodeURIComponent(req.body.coin)}/admin`)).to.be.true;
        });

        it('should flash an error message if coin name is changed to another existing coin\'s name', async () => {
            req.body.coin = 'ExistingCoinName';
            req.params.coin = 'OriginalCoinName';
            sinon.stub(Coins, 'findOne').callsFake((query) => {
                if (query.coin === 'ExistingCoinName') {
                    return Promise.resolve({ coin: 'ExistingCoinName' });
                }
                return Promise.resolve({ coin: null });
            });
            await groupsController.updateCoin(req, res, next);
            expect(req.flash.calledWith('error', 'This coin already exists in our database. Please update the existing coin or choose a different name.')).to.be.true;
            expect(res.redirect.calledWith(`/${encodeURIComponent(req.params.group)}/${encodeURIComponent(req.params.coin)}/admin/update-coin-form`)).to.be.true;
        });

        it('should call next with an error if database query fails', async () => {
            sinon.stub(Coins, 'findOne').throws(mockError);
            await groupsController.updateCoin(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });


    describe('deleteCoin', () => {

        it('should redirect to admin page if coin is deleted successfully', async () => {
            sinon.stub(Groups, 'updateOne').resolves({});
            sinon.stub(Coins, 'deleteOne').resolves({});
            await groupsController.deleteCoin(req, res, next);
            expect(res.redirect.calledWith(`/${encodeURIComponent(req.body.group)}/admin`)).to.be.true;
        });

        it('should call next with an error if database query fails', async () => {
            sinon.stub(Groups, 'updateOne').throws(mockError);
            await groupsController.deleteCoin(req, res, next);
            expect(next.calledWith(mockError)).to.be.true;
        });
    });

});
