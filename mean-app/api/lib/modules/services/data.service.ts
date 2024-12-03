import { IPost, Query } from "../models/data.model";
import PostModel from '../schemas/data.schema';

class DataService {
  public async createPost(postParams: IPost) {
    try {
      const dataModel = new PostModel(postParams);
      await dataModel.save();
    } catch (error) {
      console.error('An error occurred during data creation:', error);
      throw new Error('An error occurred during data creation');
    }
  }

  public async query(query: Query<number | string | boolean>) {
    try {
      const result = await PostModel.find(query, { __v: 0, _id: 0 });
      return result;
    } catch (error) {
      throw new Error(`Query failed: ${error}`);
    }
  }

  public async deleteData(query: Query<number | string | boolean>) {
    try {
      await PostModel.deleteMany(query);
    } catch (error) {
      console.error('An error occurred while deleting data:', error);
      throw new Error('An error occurred while deleting data');
    }
  }


  public async getAllPosts() {
    try {
      const posts = await PostModel.find();
      return posts;

    } catch (error) {
      console.error('An error occurred while downloading posts:', error);
      throw new Error('An error occurred while downloading posts');
    }
  }

  public async getPosts(n: number) {
    try {
      const posts = await PostModel.find().limit(n);;
      return posts;
    } catch (error) {
      console.error('An error occurred while downloading posts:', error);
      throw new Error('An error occurred while downloading posts');
    }
  }

  public async deleteAllPosts() {
    try {
      await PostModel.deleteMany();
    } catch (error) {
      console.error('An error occurred while deleting data:', error);
      throw new Error('An error occurred while deleting data');
    }
  }

}

export default DataService;
