import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtContants } from './constants/auth.constants';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/domina'),
    MongooseModule.forFeature([
      {
        name: User.name, schema: UserSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtContants.secret,
      signOptions: {expiresIn: '300s'},
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
