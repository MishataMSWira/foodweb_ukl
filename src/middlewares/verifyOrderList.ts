import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

/** create schema when add new egg's data, all of fileds have to be required */
const addDataSchema = Joi.object({
    customer_name: Joi.string().required(),
    table_number : Joi.string().required(),
    order_date: Joi.string().required(),
    order_detail: Joi.array().required().items({
        food_id: Joi.required(),
        quantity: Joi.number().required().min(1), // Added validation for minimum quantity
        price: Joi.number().required()
      })
})

/** create schema when edit egg's data, all of fileds allow and optional to sent in request */
const updateDataSchema = Joi.object({
    customer_name: Joi.string().optional(),
    table_number : Joi.string().optional(),
    order_date: Joi.string().required(),
    id: Joi.number().optional(), // Allow specifying ID for updating specific order detail
    food_id: Joi.number().optional(),
    quantity: Joi.number().optional().min(1), // Optional quantity with minimum validation
    price: Joi.number().optional()
  })

export const verifyAddOrderList = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = addDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details[0].message
        })
    }
    return next()
}

export const verifyEditOrderList = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = updateDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}