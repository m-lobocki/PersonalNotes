import {Controller, Post} from "./Annotations";
import {getRepository} from "typeorm";
import User from "../entity/User";
import {CONFLICT, CREATED, FORBIDDEN} from "http-status-codes";
import {Request, Response} from "express";

@Controller('/')
export default class AuthenticationController {
    @Post('/login')
    public async logIn(request: Request, response: Response): Promise<void> {
        const userRepository = getRepository(User);
        const {email, password} = request.body as User;
        const user = await userRepository.findOne({where: {email, password}});
        if (user) {
            request.session.email = email;
            response.send();
        } else {
            response.status(FORBIDDEN).send();
        }
    }

    @Post('/register')
    public async register(request: Request, response: Response): Promise<void> {
        const userRepository = getRepository(User);
        const userToRegister = request.body as User;
        const user = await userRepository.findOne({where: {email: userToRegister.email}});
        if (user) {
            response.status(CONFLICT).send();
        } else {
            await userRepository.save(userToRegister);
            response.status(CREATED).send();
        }
    }
}
