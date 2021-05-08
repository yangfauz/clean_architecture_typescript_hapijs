import * as Joi from '@hapi/joi';
export default {
  create: {
    payload: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required()
    }),
  },
  updateById: {
    params: Joi.object({
        id : Joi.required()
    }),
    payload: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required()
    }),
  },
  getById: {
    params: Joi.object({
        id : Joi.required()
    }),
  },
  deleteById: {
    params: Joi.object({
        id : Joi.required()
    })
  }
};