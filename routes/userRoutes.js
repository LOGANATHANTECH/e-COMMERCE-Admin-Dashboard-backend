import express from "express";
import { getAllUsers,createUser,deleteUser,getAdminUser } from "../services/userService.js"; 

const UserRouter = express.Router();

// Example route

UserRouter.get("/admin", async (req, res) => {
    try {
        const adminUser = await getAdminUser();
        res.status(200).json(adminUser);
    } catch (error) {
        res.status(500).send({
            message: "Could not fetch admin user",
            error: error.message
        });

    }
});


UserRouter.get("/", async (req, res) => {
    console.log("Fetching all users...");
    
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message:"Could not fetch users",
            error: error.message
        } );
        
    }
});

UserRouter.post("/", async(req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(`status : ok ${newUser}`);

    } catch (error) {
        res.status(500).json({
            message:"something went wrong while creating user ",
            error: error.message
        } );
    }
   
});

UserRouter.delete("/:id", async (req, res) => {
    const userId = parseInt(req.params.id,10);
    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID provided." });
    }
    try {
        const deletedUser = await deleteUser(userId);
        res.status(200).json({
            message: `User with ID ${userId} deleted successfully.`,
            deletedUser: deletedUser
        });
    } catch (error) {
            return res.status(404).json({ message: error.message });
    }       
});

export default UserRouter;