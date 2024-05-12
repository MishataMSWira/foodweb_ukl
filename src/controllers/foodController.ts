import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs"
import { BASE_URL } from "../global";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllFoods = async (request: Request, response: Response) => {
    try {
        const { search } = request.query
        const allFoods = await prisma.food.findMany({
            where: { name: { contains: search?.toString() || "", } }
        })
        /** contains means search name of egg based on sent keyword */
        return response.json({
            status: true,
            data: allFoods,
            message: `Foods has retrieved`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const createFood = async (request: Request, response: Response) => {
    try {
        const { name, spicy_level, price } = request.body /** get requested data (data has been sent from request) */

        /** variable filename use to define of uploaded file name */
        let filename = ""
        if (request.file) filename = request.file.filename /** get file name of uploaded file */

        /** process to save new egg */
        const newFood = await prisma.food.create({
            data: { name, price: Number(price), spicy_level, image: filename }
        })
        /** price and stock have to convert in number type */

        return response.json({
            status: true,
            data: newFood,
            message: `New Food has created`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const updateFood = async (request: Request, response: Response) => {
    try {
        const { id } = request.params /** get id of egg's id that sent in parameter of URL */
        const { name, spicy_level, price } = request.body /** get requested data (data has been sent from request) */

        /** make sure that data is exists in database */
        const findFood = await prisma.food.findFirst({ where: { id: Number(id) } })
        if (!findFood) return response
            .status(200)
            .json({ status: false, message: `Food is not found` })

        let filename = findFood.image /** default value of variable filename based on saved information */
        if (request.file) {
            filename = request.file.filename
            let path = `${BASE_URL}/public/food-image/${findFood.image}`
            let exists = fs.existsSync(path)
            if (exists && findFood.image !== ``) fs.unlinkSync(path)

            /** this code use to delete old exists file if reupload new file */
        }

        /** process to update egg's data */
        const updatedFood = await prisma.food.update({
            data: {
                name: name || findFood.name,
                spicy_level: spicy_level || findFood.spicy_level,
                price: price ? Number(price) : findFood.price,
                image: filename
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updatedFood,
            message: `Food has been updated`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const dropFood = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        /** make sure that data is exists in database */
        const findFood = await prisma.food.findFirst({ where: { id: Number(id) } })
        if (!findFood) return response
            .status(200)
            .json({ status: false, message: `Food is not found` })

        /** prepare to delete file of deleted egg's data */
        let path = `${BASE_URL}/public/food-image/${findFood.image}` /** define path (address) of file location */
        let exists = fs.existsSync(path)
        if (exists && findFood.image !== ``) fs.unlinkSync(path) /** if file exist, then will be delete */

        /** process to delete egg's data */
        const deletedFood = await prisma.food.delete({
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: deletedFood,
            message: `Food has been deleted`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}