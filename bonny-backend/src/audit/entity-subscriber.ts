import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Auditable } from './auditable.entity';

@Injectable()
@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface<Auditable> {
  constructor(private readonly moduleRef: ModuleRef) {}

  listenTo() {
    return Auditable;
  }

  async beforeInsert(event: InsertEvent<Auditable>) {
    const currentUser = this.getCurrentUser(event);
    if (currentUser) {
      event.entity.createdBy = currentUser.username;
    }
    // console.debug('BEFORE ENTITY INSERTED: ', event.entity);
  }

  async afterInsert(event: InsertEvent<Auditable>) {
    // console.debug('AFTER ENTITY INSERTED: ', event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Auditable>) {
    const currentUser = this.getCurrentUser(event);
    if (currentUser) {
      event.entity.updatedBy = currentUser.username;
    }
    // console.debug('BEFORE ENTITY UPDATED: ', event.entity);
  }

  async afterUpdate(event: UpdateEvent<Auditable>) {
    // console.debug('AFTER ENTITY UPDATED: ', event.entity);
  }

  private getCurrentUser(
    event: InsertEvent<Auditable> | UpdateEvent<Auditable>,
  ): any {
    if (event.queryRunner && event.queryRunner.data) {
      return event.queryRunner.data.user;
    }
    return null;
  }
}
