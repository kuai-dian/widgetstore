import { NotionPetField } from ".";
import { deepClone } from './deepClone';
import { NotionPetEvent, IEvent } from "./event";

export class Field {
    fields: NotionPetField.Fields = {}

    config: NotionPetField.FieldConfig = {}

    Event: IEvent

    constructor(config: NotionPetField.FieldConfig) {
      this.config = config
      this.Event = new NotionPetEvent()
      this.fire = this.fire.bind(this)
    }

    /**
     * add a field to the field list
     * @param options
     */
    add(options: NotionPetField.Add) {
      if (Array.isArray(options)) {
        options.forEach(item => {
          this.fields[item.key] = item
        })
      } else {
        this.fields[options.key] = options
      }
      this.fire('add')
    }

    /**
     * remove
     * @param key
     */
    remove(key?: string) {
      if (key) {
        delete this.fields[key]
      } else {
        this.fields = {}
      }
      this.fire('remove')
    }

    /**
     * update a field
     * @param key
     * @param field
     */
    update(key: NotionPetField.Update, field: NotionPetField.FiledItem) {
      if (Array.isArray(key)) {
        key.forEach(item => {
          Object.assign(this.fields[item.key], deepClone(item))
        })
      } else {
        Object.assign(this.fields[key], deepClone(field))
      }
      this.fire('update')
    }

    private getValues() {
      return Object.values(this.fields).reduce((acc, item) => {
        acc[item.key] = item.value || item.defaultValue
        return acc
      })
    }

    get(key? :string) {
      const values = this.getValues()
      this.fire('get')
      if (key) {
        return values[key]
      } else {
        return values
      }
    }

    getList() {
      this.fire('getList')
      return this.fields
    }

    set(key: NotionPetField.Set, value: any) {
      if (typeof key === 'string') {
        this.fields[key].value = value
      } else {
        Object.keys(key).forEach(item => {
          this.fields[item].value = key[item]
        })
      }
      this.fire('set')
    }

    fire(method: NotionPetField.FunctionType) {
      if (method !== 'change') {
        this.Event.call(method, {fields: this.fields, values: this.getValues()})
      }
      this.Event.call('change', {fields: this.fields, values: this.getValues()})
    }

    on(method: NotionPetField.FunctionType, callback: NotionPetField.CallbackFunction) {
      this.on(method, callback)
    }
}