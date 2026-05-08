"use strict";

import { ProduccionTotalesModel } from '../model/ProduccionTotalesModel.js';
import { ProduccionTotalesView } from '../view/ProduccionTotalesView.js';

export class ProduccionTotalesController {
  constructor() {
    this.model = new ProduccionTotalesModel();
    this.view = new ProduccionTotalesView();
  }

  init() {
    const data = this.model.getTotales();
    return this.view.renderTotales(data);
  }
}
