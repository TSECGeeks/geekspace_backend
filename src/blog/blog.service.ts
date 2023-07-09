import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './model/blog.model';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.blogModel.findById(id).exec();
  }
  async create(blog: Blog): Promise<Blog> {
    const newBlog = new this.blogModel(blog);
    console.log('inside service');
    let o: any = newBlog.save();
    console.log(o);
    return o;
  }

  async update(id: string, blog: Blog): Promise<any> {
    return this.blogModel.findByIdAndUpdate(id, blog, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }
}
