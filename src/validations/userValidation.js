import Joi from 'joi';

export const validateLogin = login => {
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const { error } = loginSchema.validate(login);

if (error) {
    return { result: false, error };
}

return { result: true };
};

export const validateAuthentication = authentication => {
    const authenticationSchema = Joi.object({
        user_id: Joi.number().required(),
        token: Joi.string().required()
    });
    
    const { error } = authenticationSchema.validate(authentication);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
    };

export const validateSignup = signup => {
    const signupSchema = Joi.object({
        names: Joi.string().min(3).required(),
        last_name: Joi.string().min(2).required(),
        phone: Joi.string().min(8).required(),
        password: Joi.string().required(),
        email: Joi.string().pattern(new RegExp(/^[^\s@]+@[^\s@]+$/)).required(),
        role: Joi.string().required(),
        active: Joi.boolean().required()
    });
    
    const { error } = signupSchema.validate(signup);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
    };

export const validateUpdate = update => {
    const updateSchema = Joi.object({
        names: Joi.string().min(3).required(),
        last_name: Joi.string().min(2).required(),
        phone: Joi.string().min(8).required(),
        password: Joi.string(),
        email: Joi.string().email().required(),
        role: Joi.required(),
        active: Joi.boolean().required()
    });
    
    const { error } = updateSchema.validate(update);

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