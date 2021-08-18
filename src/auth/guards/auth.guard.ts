import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConsoleLogger,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { SessionService } from '../services/session.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest()

    if (request.originalUrl.includes('/login')) return true

    if(!request['headers']['authorization']) throw new ForbiddenException({ message : 'Necessário efetuar o login'})

    var authbasic = request['headers']['authorization'].split(' ')

    if (authbasic[0] != 'Basic') throw new ForbiddenException({message: 'Autenticação é do tipo Basic'})

    const user = Buffer.from(authbasic[1], 'base64').toString().split(':')

    const isSigned = this.sessionService.exists(user[0])

    if(!isSigned && request['headers']['authorization']) throw new ForbiddenException({ message : 'Necessário efetuar o login'})

    if (isSigned && request.originalUrl.includes('/logout')){
        this.sessionService.remove(user[0])
        return true
    } 

    return isSigned
  }
}
