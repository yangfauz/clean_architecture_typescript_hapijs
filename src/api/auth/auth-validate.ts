import * as Joi from '@hapi/joi';
export default {
  register: {
    payload: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
  },
  login: {
    payload: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
  }
};