import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostOrm } from "./post.model";
import { PostService } from "./post.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([PostOrm]),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456", 
      database: "test",
      entities: [PostOrm],
      synchronize: true
    })
  ],
  controllers: [PostsController],
  providers: [PostService]
})
export class PostsModule {}
