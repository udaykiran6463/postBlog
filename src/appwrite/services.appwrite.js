import { ID, Account, Client, Storage, Databases } from "appwrite";
import { bucketId, apiEndpoint, projectId, databaseId, collectionId } from "../../env.config.js";
import { Query } from 'appwrite';

class Services {
    client;
    account;
    storage;
    database;

    constructor() {
        this.client = new Client()
            .setEndpoint(apiEndpoint)
            .setProject(projectId);
        this.account = new Account(this.client);
        this.storage = new Storage(this.client);
        this.database = new Databases(this.client);
    }

    addPost = async (file, title, caption, userData) => {
        let storageResponse = null;
        try {
            const user = await this.account.get();
            if (user) {
                storageResponse = await this.storage.createFile(bucketId, ID.unique(), file);
                const databaseResponse = await this.database.createDocument(
                    databaseId,
                    collectionId,
                    ID.unique(),
                    {
                        heading: title,
                        caption,
                        image: storageResponse.$id,
                        user_id: userData.$id,
                    }
                );
                return databaseResponse;
            } else {
                console.log("User is not logged in.");
                return null;
            }
        } catch (error) {
            console.log("Error while adding post:", error.message);
            if (storageResponse && storageResponse.$id) {
                try {
                    await this.storage.deleteFile(bucketId, storageResponse.$id);
                } catch (deleteError) {
                    console.error("Error while deleting the image:", deleteError.message);
                }
            }
            throw error;
        }
    };

    fetchAllPosts = async () => {
        try {
            const user = await this.account.get();
            if (user) {
                const posts = await this.database.listDocuments(
                    databaseId,
                    collectionId
                );
                return posts.documents;
            } else {
                console.log("User is not logged in.");
                return [];
            }
        } catch (error) {
            console.log("Error while fetching posts:", error.message);
            throw error;
        }
    };

    fetchDataFromId = async (id) => {
        try {
            const user = await this.account.get();
            if (user) {
                const post = await this.database.getDocument(
                    databaseId,
                    collectionId,
                    id
                );
                return post;
            } else {
                console.log("User is not logged in.");
                return null;
            }
        } catch (error) {
            console.log("Error while fetching data from id:", error.message);
            throw error;
        }
    };

    fetchUserDocuments = async (userId) => {
        if (!userId) {
            console.error("No user ID provided for fetching documents.");
            return;
        }
        try {
            const response = await this.database.listDocuments(
                databaseId,
                collectionId,
                [Query.equal('user_id', userId)]
            );
            return response;
        } catch (error) {
            console.error("Error fetching user documents:", error.message);
            throw error;
        }
    };

    deletePost = async (post) => {
        try {
            await this.storage.deleteFile(bucketId, post.image);
            const postDeleteResponse = await this.database.deleteDocument(
                databaseId,
                collectionId,
                post.$id
            );
            return postDeleteResponse;
        } catch (error) {
            console.error("Error while deleting post:", error.message);
            throw error;
        }
    };

    editPost = async (file, title, caption, userData, postData) => {
        console.log("file: ",file);
        console.log("title: ",title);
        console.log("caption: ",caption);
        console.log("userData: ",userData);
        console.log("postData: ",postData);

        
        try {
            let imageStorageResponse = null;
            if (file !== undefined) {
                imageStorageResponse = await this.storage.createFile(bucketId, ID.unique(), file);
    
                if (imageStorageResponse) {
                    console.log("New image uploaded, now deleting old image");
                    await this.storage.deleteFile(bucketId, postData.image);
                }
            }
    
            // // Create a new document
            const newDocumentResponse = await this.database.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                {
                    heading: title,
                    caption,
                    image: imageStorageResponse ? imageStorageResponse.$id : postData.image,
                    user_id: userData.$id,
                }
            );
    
            // // Delete the previous document only if the new document was created successfully
            if (newDocumentResponse) {
                await this.database.deleteDocument(databaseId, collectionId, postData.$id);
            }
    
            // return newDocumentResponse;
            return imageStorageResponse;
        } catch (error) {
            console.error("Error while updating post:", error.message);
            throw error; // Propagate the error to the calling function
        }
    };
    







}

const appwriteService = new Services();
export default appwriteService;
