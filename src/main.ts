import { NestFactory } from '@nestjs/core';
import { PostsModule } from './posts/posts.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);

  const options = new DocumentBuilder()
    .setTitle("帖子 example")
    .setDescription("The 帖子 API description")
    .setVersion("1.0")
    .addTag("帖子")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs", app, document); //可能会影响到同名路径

  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
