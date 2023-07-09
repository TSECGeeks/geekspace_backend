import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { Blog, BlogSchema } from './model/blog.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3000s' },
    }),

    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    // forwardRef(() => UserModule),
    // PassportModule,
  ],

  controllers: [],
  providers: [BlogService, BlogResolver],
  exports: [],

})
export class BlogModule {}
