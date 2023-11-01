import { expect } from 'chai';
import sinon from 'sinon';
import FAQItemsController from '../controllers/FAQ_items.js'; // Update the path accordingly
import FAQItems from '../models/FAQ_items.js';

describe('FAQItemsController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getFAQItems', () => {
        it('should return all FAQ items with a status of 200', async () => {
            const mockItems = [
                { question: 'What is this?', answer: 'This is a test.' },
                { question: 'How does this work?', answer: 'Like this.' }
            ];
            sinon.stub(FAQItems, 'find').resolves(mockItems);

            await FAQItemsController.getFAQItems(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                message: 'Success',
                data: {
                    items: mockItems
                }
            })).to.be.true;
        });

        it('should call next with an error if there is a database error', async () => {
            const mockError = new Error('Database error');
            sinon.stub(FAQItems, 'find').throws(mockError);

            await FAQItemsController.getFAQItems(req, res, next);

            expect(next.calledWith(mockError)).to.be.true;
        });
    });
});
