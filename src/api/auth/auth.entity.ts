import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "../../common/base/base.entity";

@Entity({
  name: 'users'
})

export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn()
        public id: number;

    @Column({ name: 'firstname', length: 50, nullable: false })
        firstname: string;

    @Column({ name: 'lastname', length: 50, nullable: true })
        lastname: string;

    @Column({ name: 'email', length: 255, nullable: false })
        email: string;

    @Column({ name: 'password', length: 255, nullable: false })
        password: string;
}