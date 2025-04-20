import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies["access_token"];

    if (!token) {
      throw new UnauthorizedException("No token provided");
    }

    try {
      const user = this.tokenService.verify(token);
      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
