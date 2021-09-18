import { EventEmitter } from 'events';

export enum SessionStatusEnum {
  CONNECTED = 'connected',
  PUBLISHING = 'publishing',
  SUBSCRIBED = 'subscribed',
  DISCONNECTED = 'disconnected',
}

export enum SessionTypeEnum {
  CONNECTED = 'connected',
  ACCEPTED = 'accepted',
  PUBLISHER = 'publisher',
  SUBSCRIBER = 'subscriber',
}
export interface Session {
  run();
  stop();
  reject();
}