import { PostOrm } from "./post.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostOrm)
    private readonly postRepository: Repository<PostOrm>
  ) {}

  async findAll(): Promise<PostOrm[]> {
    return this.postRepository.find();
  }

  async create(data: PostOrm): Promise<PostOrm> {
    this.postRepository.save(data);
    return data;
  }

  async findOne(id: number): Promise<PostOrm[]> {
    const result = await this.postRepository.find({ id: id });
    return result;
  }
  /**
   * @description: 修改
   */
  // async edit(data: PostOrm): Promise<PostOrm> {
  //   let index = this.postRepository.findIndex(item => item.id == data.id);

  //   if (index >= 0) {
  //     this.postRepository.data[index] = data;
  //   }

  //   return this.postRepository.data[index];
  // }

  /**
   * @description: 删除
   */
  async remove(id: number): Promise<PostOrm[]> {
    // 肯定还有最优方案
    const result = await this.postRepository.find({ id: id });
    return await this.postRepository.remove(result);;
  }
}
