import Joi from 'joi';

export const validateSale = sale => {

    const productsSchema = Joi.object({
        discount: Joi.number().min(0).required(),
        price: Joi.number().min(0).required(),
        product_id: Joi.number().min(1).required(),
        quantity: Joi.number().min(1).required(),
    });

    const saleSchema = Joi.object({
        client: Joi.string().required(),
        products: Joi.array().items(productsSchema).min(1).required(),
        seller_id: Joi.number().required(),
    });

    const { error } = saleSchema.validate(sale);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
};

export const validateId = id => {
    const idSchema = Joi.object({
        id: Joi.number().min(1).required(),
    });

    const { error } = idSchema.validate(id);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
};

export const validatePage = page => {
    const pageSchema = Joi.object({
        page: Joi.number().min(1),
    });

    const { error } = pageSchema.validate(page);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
};