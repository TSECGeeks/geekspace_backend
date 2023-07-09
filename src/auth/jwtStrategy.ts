import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  logger: Logger;
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly UserService: UserService,
    private config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
    this.logger = new Logger(JwtStrategy.name);
    this.logger.log(process.env.JWT_SECRET);
  }

  async validate(payload: any) {
    this.logger.log('wtf');
    this.logger.log('Validate passport:', payload);
    return await this.UserService.findOne({ email: payload.email });
  }
}
