import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Certificate, CertificateRelations, Enroll} from '../models';
import {CourseRepository} from './course.repository';
import {EnrollRepository} from './enroll.repository';
import {StudentRepository} from './student.repository';

export class CertificateRepository extends DefaultCrudRepository<
  Certificate,
  typeof Certificate.prototype.id,
  CertificateRelations
  > {


  public readonly enroll: BelongsToAccessor<Enroll, typeof Certificate.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>, @repository.getter('EnrollRepository') protected enrollRepositoryGetter: Getter<EnrollRepository>,
  ) {
    super(Certificate, dataSource);
    this.enroll = this.createBelongsToAccessorFor('enroll', enrollRepositoryGetter,);
    this.registerInclusionResolver('enroll', this.enroll.inclusionResolver);

  }
}
