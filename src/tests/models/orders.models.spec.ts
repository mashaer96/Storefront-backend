import DB from '../../database'
import { Order, OrderRepository } from "../../models/order.model";
import { UserRepository } from '../../models/user.model';

const orderRepo = new OrderRepository()
const testOrder = {user_id: 1, status:'Active'}
const userRepo = new UserRepository()
const testUser = {first_name: 'Test', last_name: 'User', password: '$2b$10$mywczs5CxtfuChW5SdRUHOXoQFyaDcwE7OZQsyvOI5E/p3h3ErcQ2'}

describe('Order Model', () => {
    beforeAll(async () => {
            //create user
            const user = await userRepo.create(testUser)

            //create Completed order
            const order = await orderRepo.create(testOrder)
    })

    it('should have a showActive orders method', () => {
        expect(orderRepo.showActive).toBeDefined();
    });

    it('showActive orders method should return the active order', async () => {
        const result = await orderRepo.showActive(1);
        
        expect(result).toContain({
            id: 1,
            status: 'Active',
            user_id: 1,
            // customer: 'Test User',
        });
    });
});