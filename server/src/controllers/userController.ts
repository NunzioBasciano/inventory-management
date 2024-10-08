import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await prisma.users.findMany();
        res.json(user);        
    } catch (error) {
        res.status(500).json({message: 'Error retrieving dashboard metrics'});
    }
}