import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getById);

        this.router.post(`${this.path}`, this.addData);

        this.router.delete(`${this.path}/:id`, this.deleteById);

        this.router.get(`${this.path}s/:id`, this.getNData);

        this.router.get(`${this.path}s`, this.getAll);

        this.router.delete(`${this.path}s`, this.deleteAll);

        // this.router.get(`${this.path}/latest`, this.getAll);
        // this.router.post(`${this.path}/:id`, this.addData);
    }

    private getById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const itemId = parseInt(id, 10);

        if (itemId > 0 && itemId <= testArr.length) {
            response.status(200).json(testArr[itemId - 1]);
        } else {
            response.status(404).json({ message: 'Element not found' });
        }
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;

        testArr.push(elem);

        response.status(200).json(testArr[testArr.length - 1]);
    };

    private deleteById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const itemId = parseInt(id, 10);

        if (itemId > 0 && itemId <= testArr.length) {
            const removed = testArr.splice(itemId - 1, 1);

            response.status(200).json(removed);
        } else {
            response.status(404).json({ message: 'Element not found' });
        }
    };

    private getNData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const itemId = parseInt(id, 10);

        if (itemId >= 0 && itemId <= testArr.length) {
            response.status(200).json(testArr.slice(0, itemId));
        } else {
            response.status(404).json({ message: 'Element not found' });
        }
    };

    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    };

    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        // testArr.length = 0;

        response.status(200).json(testArr);
    };
}

export default PostController;
