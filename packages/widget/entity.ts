import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity({ name: 'blog_plugin_test' })
export class BlogPluginEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'timestamp',
    comment: '创建时间'
  })
  public gmt_create: Date;

  @Column({
    type: 'timestamp',
    comment: '更新时间'
  })
  public gmt_modified: Date;
}