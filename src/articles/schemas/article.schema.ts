import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ _id: false })
export class Comment {
  @Prop({ required: true })
  author: string;
  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop()
  authors?: string;

  @Prop()
  abstract?: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
