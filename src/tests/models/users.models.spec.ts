import { User, UserRepository } from '../../models/user.model';

const repo = new UserRepository()
const testUser = {first_name: 'Test', last_name: 'User', password: 'test123'}
let user_id: Number | undefined

describe('User Model', () => {
    beforeAll(async () => {
        const user = await repo.create(testUser)
        user_id = user.id
    })

    it('should have an index method', () => {
        expect(repo.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(repo.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(repo.create).toBeDefined();
    });

    it('create method should add new user', async () => {
        const anotherUser: User = {
            first_name: 'Another',
            last_name: 'User',
            password: 'test456'
        }
        const result = await repo.create(anotherUser);
        delete result.id
        delete result.password
        expect(result).toEqual({
            first_name: 'Another',
            last_name: 'User'
        });
    });

    it('show method should return a user', async () => {
        const result = await repo.show(user_id as number);
        delete result.id
        delete result.password 
        expect(result).toEqual({
            first_name: 'Test',
            last_name: 'User'
        });
    });

    it('index method should return a list of users', async () => {
        let result = await repo.index();
        result = result.filter((obj) => { //to remove password
            delete obj.password
            return true
        })
        
        expect(result).toContain({
            id:2,
            first_name: 'Test',
            last_name: 'User'
        });
    });
});