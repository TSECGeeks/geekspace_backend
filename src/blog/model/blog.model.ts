import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Blog {
  @Field({ nullable: true })
  @Prop()
  title: string;

  @Field({ nullable: true })
  @Prop()
  author: string;

  @Field({ nullable: true })
  @Prop()
  content: string;

  @Field({ nullable: true })
  @Prop()
  timestamp: number;
}

export type BlogDocument = Blog & Document;

export const BlogSchema = SchemaFactory.createForClass(Blog);

@InputType()
export class BlogInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  content: string;

  @Field()
  timestamp: number;
}
