import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Enroll, Student, StudentRelations, User} from '../models';
import {CertificateRepository} from './certificate.repository';
import {EnrollRepository} from './enroll.repository';
import {UserRepository} from './user.repository';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.id,
  StudentRelations
  > {

  public readonly user: HasOneRepositoryFactory<User, typeof Student.prototype.id>;

  public readonly enrolls: HasManyRepositoryFactory<Enroll, typeof Student.prototype.id>;


  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('EnrollRepository') protected enrollRepositoryGetter: Getter<EnrollRepository>, @repository.getter('CertificateRepository') protected certificateRepositoryGetter: Getter<CertificateRepository>,
  ) {
    super(Student, dataSource);
    this.enrolls = this.createHasManyRepositoryFactoryFor('enrolls', enrollRepositoryGetter,);
    this.registerInclusionResolver('enrolls', this.enrolls.inclusionResolver);
    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
