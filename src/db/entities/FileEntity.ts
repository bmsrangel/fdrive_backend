import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'file_name', type: 'text', nullable: false })
  fileName: string;

  @Column({ name: 'file_path', type: 'text', nullable: false })
  filePath: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  size: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  format: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'users_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.files)
  @JoinColumn({ name: 'users_id' })
  user: UserEntity;
}
