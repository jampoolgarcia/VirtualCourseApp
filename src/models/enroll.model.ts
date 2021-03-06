import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Course} from './course.model';
import {Student} from './student.model';
import {Certificate} from './certificate.model';

@model()
export class Enroll extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  finishDate?: string;

  @property({
    type: 'number',
    default: 0,
  })
  approbedSections?: number;

  @belongsTo(() => Course)
  courseId: string;

  @belongsTo(() => Student)
  studentId: string;

  @hasOne(() => Certificate)
  certificate: Certificate;

  constructor(data?: Partial<Enroll>) {
    super(data);
  }
}

export interface EnrollRelations {
  // describe navigational properties here
}

export type EnrollWithRelations = Enroll & EnrollRelations;
