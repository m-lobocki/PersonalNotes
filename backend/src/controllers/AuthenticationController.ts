import {Controller, Post} from "./Annotations";

@Controller('/')
export default class AuthenticationController {
    @Post('/login')
    public logIn(): void {
    }
}
