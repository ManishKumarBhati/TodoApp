export const EVENTS_SCHEMA = 'todo';
export const EventsSchema = {
  name: EVENTS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    task: 'string',
    completed: {type: 'bool', default: false},
  },
};

export const LOGIN_SCHEMA_TABLE = 'todo_login';
export const LoginSchema = {
  name: LOGIN_SCHEMA_TABLE,
  properties: {
    uId: 'string',
    pass: 'string',
  },
};
export const REALM_PATH = 'realm';
export const SCHEMA_LIST = [EventsSchema, LoginSchema];
