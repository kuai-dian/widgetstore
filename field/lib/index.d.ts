export namespace NotionPetField {
  interface callbackProps {
    fields: FieldList;
    values: any
  }

  type CallbackFunction = (props: callbackProps) => void;

  /**
   * callback function to be called when the field is initialized
   */
  type CommonFunction = (method: FunctionType, callback: CallbackFunction) => any;

  export interface FieldConfig {
    id?: string; // The id of the field. If not provided, it will be generated.
    on?: CommonFunction; // The function to call when the field is changed.
    getValues?: () => object;
  }

  type FunctionType = 'change' | 'get' | 'getList' | 'set' | 'remove' | 'add' | 'update';

  export interface FiledItem {
    key: string; // The key of the field.
    type: string;
    /**
     * The value of the field.
     */
    option: string;
    defaultValue: any;
    value: any;
    props: any;
  }

  export interface Fields {
    [key: string]: FiledItem;
  }

  export type FieldList = FiledItem[];

  type Add = Array<FiledItem> | FiledItem;
  type Update = Array<FiledItem> | string
  type Set = Object | string
}