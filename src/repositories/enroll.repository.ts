import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {Enroll, EnrollRelations, Course, Student, Certificate} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CourseRepository} from './course.repository';
import {StudentRepository} from './student.repository';
import {CertificateRepository} from './certificate.repository';

export class EnrollRepository extends DefaultCrudRepository<
  Enroll,
  typeof Enroll.prototype.id,
  EnrollRelations
> {

  public readonly course: BelongsToAccessor<Course, typeof Enroll.prototype.id>;

  public readonly student: BelongsToAccessor<Student, typeof Enroll.prototype.id>;

  public readonly certificate: HasOneRepositoryFactory<Certificate, typeof Enroll.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>, @repository.getter('CertificateRepository') protected certificateRepositoryGetter: Getter<CertificateRepository>,
  ) {
    super(Enroll, dataSource);
    this.certificate = this.createHasOneRepositoryFactoryFor('certificate', certificateRepositoryGetter);
    this.registerInclusionResolver('certificate', this.certificate.inclusionResolver);
    this.student = this.createBelongsToAccessorFor('student', studentRepositoryGetter,);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
    this.course = this.createBelongsToAccessorFor('course', courseRepositoryGetter,);
    this.registerInclusionResolver('course', this.course.inclusionResolver);
  }
}
