import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiPropertyOptional, ApiCreatedResponse, ApiBadRequestResponse } from "@nestjs/swagger";
import { PostService } from "./post.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Length } from "class-validator"; //使用验证时必须使用ApiCreatedResponse，错误code使用ApibadRequesTResponse

//数据交互实体
class postsCreateDTO {
  id: number;
  @ApiPropertyOptional({ name: "title" })
  @Length(3, 40, { message: "名字必须在3-40之间" })
  title: string;

  @ApiPropertyOptional({ name: "descripation" })
  descripation: string;
}

@Controller("posts")
@ApiTags("默认")
@UsePipes(new ValidationPipe())
export class PostsController {
  constructor(private readonly PostService: PostService) {}

  @Get()
  @ApiOperation({ summary: "获取列表", description: "获取列表" })
  async list() {
    return this.PostService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "新增列表", description: "新增列表" })
  @ApiCreatedResponse({ type: postsCreateDTO })
  @ApiBadRequestResponse({ description: "名字必须在3-40之间" })
  async create(@Body() data: postsCreateDTO) {
    try {
      await this.PostService.create(data);
      return new HttpException("success", HttpStatus.OK);
    } catch (error) {
      throw new HttpException("创建失败", HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: "根据id获取列表详情",
    description: "根据id获取列表详情"
  })
  async idDetails(@Param("id") id: number) {
    // 根据id查询id的类型是number类型，切记，否则severice文件接收错误
    //异常错误未做
    return await this.PostService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "根据id修改帖子详情",
    description: "根据id修改帖子详情"
  })
  update(@Param("id") id: String, @Body() data: postsCreateDTO) {
    return [
      {
        id: 1,
        descripation: "春节快乐"
      }
    ];
  }

  @Delete(":id")
  @ApiOperation({
    summary: "根据id删除列表详情",
    description: "根据id删除列表详情"
  })
  async deleteId(@Param("id") id: number) {
    try {
      await this.PostService.remove(id);
      return new HttpException("success", HttpStatus.OK);
    } catch (error) {
      throw new HttpException("删除失败",HttpStatus.NOT_FOUND);
    }
  }
}
