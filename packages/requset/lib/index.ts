import md5 from 'md5'
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import axios from 'axios';
import PetRequestApiManager from './api';

/**
 * PetRequest
 */
export default class PetRequest {
  public api: PetRequestApiManager
  constructor(options: IPetRequestOptions) {
    this.api = new PetRequestApiManager()
  }
}