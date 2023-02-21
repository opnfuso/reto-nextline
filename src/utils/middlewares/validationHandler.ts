import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

const validate = (data: any, schema: ObjectSchema) => {
  const { error } = schema.validate(data);
  return error;
};

export const validationHandler = (schema: ObjectSchema) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const error = validate(req.body, schema);

    if (error) {
      res.status(400).send({ message: error.message });
    } else {
      next();
    }
  };
};
