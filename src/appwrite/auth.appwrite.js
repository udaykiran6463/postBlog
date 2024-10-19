import { ID, Client, Account } from 'appwrite';
import { apiEndpoint, projectId } from '../../env.config.js';
// Removed unused 'use' from 'framer-motion/client'

class Auth {
    appWriteClient;
    account;

    constructor() {
        this.appWriteClient = new Client()
            .setEndpoint(apiEndpoint)
            .setProject(projectId);
        this.account = new Account(this.appWriteClient);
    }

    // Create a new user
    async createAccount({ username, email, password }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                username // Correct parameter name
            );

            if (!userAccount) {
                throw new Error("Account creation failed.");
            }

            // Automatically log in after account creation
            return this.login({ email, password });
        } catch (error) {
            console.log("Error while creating the account:", error.message);
            throw error; // Optional: rethrow the error for further handling
        }
    }

    async login({ email, password }) {
        try {
            const userSession = await this.account.createEmailPasswordSession(email, password);
            let accountDetails = await this.getCurrentUserDetails();
            return accountDetails;
        } catch (error) {
            console.log("Error while logging in:", error.message);
            throw error; // Optional: rethrow the error for further handling
        }
    }

    async getCurrentUserDetails() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error while fetching user details:", error.message);
            throw error; // Optional: rethrow the error for further handling
        }
    }

    async logout() {
        try {
            // Fetch the current session
            const session = await this.account.getSession('current');
            const sessionId = session.$id;
            if (!sessionId) {
                throw new Error("No valid session found");
            }
            // Delete the current session
            return await this.account.deleteSession(sessionId);
        } 
        catch (error) {
            console.log("Error while logging out:", error.message || error);
            throw error;
        }
    }
    

    getUserDetailsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("userData"));
    }
}

const authService = new Auth();
export default authService;
