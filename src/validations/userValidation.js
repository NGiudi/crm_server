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
return { result: true }
};