import { ABMGenericFormField } from './generic-form-field';

export class TableColumns {
  name: string;
  key?: string;
  isAction?: boolean;
  actions?: any[];
  type?: ABMGenericFormField;
  notShow?: boolean;
  filtrable?: boolean;
}
