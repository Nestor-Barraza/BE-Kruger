import { Body, Controller, Post, Route, Tags } from "tsoa";
import { AuthService } from "./Auth.services";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  @Post("login")
  public async login(
    @Body() credentials: { email: string; password: string }
  ): Promise<{ token: string }> {
    const token = await this.authService.login(credentials);
    return { token };
  }
}
