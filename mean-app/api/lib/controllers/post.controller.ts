import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import Controller from '../interfaces/controller.interface';
import DataService from '../modules/services/data.service';
import { Request, Response, NextFunction, Router } from 'express';
import Joi from 'joi';

// let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    private dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getElementById);

        this.router.post(`${this.path}`, this.addData);

        this.router.delete(`${this.path}/:id`, this.removePost);

        // this.router.get(`${this.path}s/:id`, this.getNData);
        this.router.get(`${this.path}s/:id`, checkPostCount, this.getPostByNum)

        this.router.get(`${this.path}s`, this.getAll);

        this.router.delete(`${this.path}s`, this.deleteAll);

        // this.router.get(`${this.path}/latest`, this.getAll);
        // this.router.post(`${this.path}/:id`, this.addData);
    }

    // private getById = async (request: Request, response: Response, next: NextFunction) => {
    //     const { id } = request.params;
    //     const itemId = parseInt(id, 10);

    //     if (itemId > 0 && itemId <= testArr.length) {
    //         response.status(200).json(testArr[itemId - 1]);
    //     } else {
    //         response.status(404).json({ message: 'Element not found' });
    //     }
    // };

    // private addData = async (request: Request, response: Response, next: NextFunction) => {
    //     const { elem } = request.body;

    //     testArr.push(elem);

    //     response.status(200).json(testArr[testArr.length - 1]);
    // };

    // private deleteById = async (request: Request, response: Response, next: NextFunction) => {
    //     const { id } = request.params;
    //     const itemId = parseInt(id, 10);

    //     if (itemId > 0 && itemId <= testArr.length) {
    //         const removed = testArr.splice(itemId - 1, 1);

    //         response.status(200).json(removed);
    //     } else {
    //         response.status(404).json({ message: 'Element not found' });
    //     }
    // };

    // private getNData = async (request: Request, response: Response, next: NextFunction) => {
    //     const { id } = request.params;
    //     const itemId = parseInt(id, 10);

    //     if (itemId >= 0 && itemId <= testArr.length) {
    //         response.status(200).json(testArr.slice(0, itemId));
    //     } else {
    //         response.status(404).json({ message: 'Element not found' });
    //     }
    // };

    // private getAll = async (request: Request, response: Response, next: NextFunction) => {
    //     response.status(200).json(testArr);
    // };

    // private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
    //     testArr = [];
    //     // testArr.length = 0;

    //     response.status(200).json(testArr);
    // };

    // ==========================================
    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { title, text, image } = request.body;
        // const readingData = {
        //     title,
        //     text,
        //     image
        // };

        const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required()
            });

        try {
            const validatedData = await schema.validateAsync({title, text, image});
            await this.dataService.createPost(validatedData);
            response.status(200).json(validatedData);
        } catch (error) {
            console.log('eeee', error)
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    }

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query({ _id: id });
        response.status(200).json(allData);
    }

    private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({ _id: id });
        response.sendStatus(200);
    };

    private getPostByNum = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const n = parseInt(id, 10);
        const allData = await this.dataService.getPosts(n);
        response.status(200).json(allData);
        return;
    };

    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        const allData = await this.dataService.getAllPosts();
        response.status(200).json(allData);
    };

    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deleteAllPosts();
        response.sendStatus(200);
    };

}

export default PostController;
