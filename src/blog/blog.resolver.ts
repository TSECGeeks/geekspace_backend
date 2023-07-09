import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Blog, BlogInput } from './model/blog.model';
import { BlogService } from './blog.service';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Blog])
  async blogs(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Query(() => Blog)
  async blog(@Args('id', { type: () => ID }) id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }
  @Mutation(() => Blog)
  async createBlog(@Args('input') input: BlogInput): Promise<BlogInput> {
    return this.blogService.create(input);
  }

  @Mutation(() => Blog)
  async updateBlog(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: BlogInput,
  ): Promise<Blog> {
    return this.blogService.update(id, input);
  }

  @Mutation(() => Blog)
  async deleteBlog(@Args('id', { type: () => ID }) id: string): Promise<Blog> {
    return this.blogService.delete(id);
  }
}
