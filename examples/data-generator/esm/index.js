import generateCustomers from './customers';
import generateCategories from './categories';
import generateProducts from './products';
import generateCommands from './commands';
import generateReviews from './reviews';
import finalize from './finalize';

export default (function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { serializeDate: true };

    var db = {};
    db.customers = generateCustomers(db, options);
    db.categories = generateCategories(db, options);
    db.products = generateProducts(db, options);
    db.commands = generateCommands(db, options);
    db.reviews = generateReviews(db, options);
    finalize(db);

    return db;
});