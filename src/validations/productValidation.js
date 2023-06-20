import Joi from 'joi';

export const validateProduct = product => {
    const productSchema = Joi.object({
        brand_name: Joi.string().required(),
        description: Joi.string().required(),
        discount: Joi.number().min(0),
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        stock: Joi.number().min(0).required(),
    });

    const { error } = productSchema.validate(product);

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