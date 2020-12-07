import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Enroll>) {
    super(data);
  }
}

export interface EnrollRelations {
  // describe navigational properties here
}

export type EnrollWithRelations = Enroll & EnrollRelations;
