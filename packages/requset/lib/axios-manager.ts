import PetRequest from "./index";

/**
 * PetRequestApiManager
 */
export default class PetRequestAxiosManager {
  public root: PetRequest
  constructor(root: PetRequest) {
    this.root = root
  }

  get config() {
    return this.root.options.axiosOptions
  }
}