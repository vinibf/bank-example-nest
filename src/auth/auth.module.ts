import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './controllers/user.controller'
import { User } from './entities/user.entity'
import { AuthGuard } from './guards/auth.guard'
import { SessionService } from './services/session.service'
import { UserService } from './services/user.service'

const AuthProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
}

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, SessionService, AuthProvider],
})
export class AuthModule {}
