import { ID, Client, Account } from 'appwrite';
import { apiEndpoint, projectId } from '../../env.config.js';

class Auth {
    appWriteClient;
    account;

    constructor() {
        this.appWriteClient = new Client()
            .setEndpoint(apiEndpoint) // Ensure apiEndpoint is valid
            .setProject(projectId)     // Ensure projectId is valid
            // .setKey(apiKey);  
        this.account = new Account(this.appWriteClient);
    }
    
    // Send verification email
    async sendVerificationEmail() {
        try {
            const response = await this.account.createVerification('http://localhost:5173/EmailVerificationPage'); 
            console.log('Verification email sent:', response);
        } catch (error) {
            console.log('Error sending verification email:', error.message);
            throw error;
        }
    }

    // Create a new user
    async createAccount({ username, email, password }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                username
            );
            
            // if (!userAccount) {
            //     throw new Error("Account creation failed.");
            // }
            
            // // Send email verification after account creation
            // await this.sendVerificationEmail();
            // console.log("Verification email sent. Please check your inbox.");

            return userAccount;
        } catch (error) {
            console.log("Error while creating the account:", error.message);
            throw error;
        }
    }

    // Log in the user
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            const user = await this.getCurrentUserDetails();

            // // Check if the user's email is verified
            // if (!user || !user.emailVerification) {
            //     throw new Error("Email not verified. Please verify your email to log in.");
            // }

            return user;
        } catch (error) {
            console.log("Error while logging in:", error.message);
            throw error;
        }
    }

    async getCurrentUserDetails() {
        try {
            const accountDetails = await this.account.get();
            return accountDetails;
        } catch (error) {
            console.log("Error while fetching user details:", error.message);
            throw error;
        }
    }

    async logout() {
        try {
            const session = await this.account.getSession('current');
            if (!session) {
                throw new Error("No valid session found");
            }
            return await this.account.deleteSession(session.$id);
        } catch (error) {
            console.log("Error while logging out:", error.message || error);
            throw error;
        }
    }

    getUserDetailsFromLocalStorage() {
        const userData = localStorage.getItem("userData");
        return userData ? JSON.parse(userData) : null;
    }
}

const authService = new Auth();
export default authService;
