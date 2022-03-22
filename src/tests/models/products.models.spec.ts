import { Product, ProductRepository } from '../../models/product.model';

const repo = new ProductRepository()
const testProduct = {name: 'Letter Graphic Round Neck Tee', price: 95.50}
let prod_id: Number | undefined

describe('Product Model', () => {
    beforeAll(async () => {
        const product = await repo.create(testProduct)
        prod_id = product.id
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

    it('create method should add new product', async () => {
        const anotherProduct: Product = {
            name: 'Leopard Pattern Bag',
            price: 200.00
        }
        const result = await repo.create(anotherProduct);
        delete result.id
        expect(result).toEqual(anotherProduct);
    });

    it('show method should return a product', async () => {
        const result = await repo.show(prod_id as number);
        delete result.id
        expect(result).toEqual(testProduct);
    });

    it('index method should return a list of products', async () => {
        const result = await repo.index();
        expect(result).toContain({
            id:2,
            name: 'Letter Graphic Round Neck Tee',
            price: 95.50
        });
    });
})