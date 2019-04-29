const products = require('../controllers/product_controller.js');
const auth = require('../controllers/auth');
const authMiddleware = require('../middleware/auth_middleware');


module.exports = (app) => {
    app.get('/', authMiddleware, products.getAll);    
    app.post('/', authMiddleware, products.create);    
    app.put('/:id', authMiddleware, products.update);    
    app.delete('/:id', authMiddleware, products.remove);

    app.post('/signin', auth.signIn);
    
};