"use strict";

import { ProduccionTotalesModel } from '../model/ProduccionTotalesModel.js';
import { ProduccionTotalesView } from '../view/ProduccionTotalesView.js';

export class ProduccionTotalesController {
  constructor() {
    this.model = new ProduccionTotalesModel();
    this.view = new ProduccionTotalesView();
  }

  init() {
    const data = this.model.getTotales("semanal"); // Inicial por defecto
    return this.view.renderTotales(data);
  }

  bindEvents(rootElement, onRangoChangeCallback) {
    this.rootElement = rootElement;
    this.view.bindRangoChange((nuevoRango) => {
      // Notifica al mediador
      if (onRangoChangeCallback) {
        onRangoChangeCallback(nuevoRango);
      }
    }, this.rootElement);
  }

  updateTotales(rango) {
    if (!this.rootElement) return;
    const data = this.model.getTotales(rango);
    const ngrEl = this.rootElement.querySelector('#totalNGR');
    const blncEl = this.rootElement.querySelector('#totalBLNC');

    if (ngrEl) ngrEl.textContent = data.totalNGR.toLocaleString();
    if (blncEl) blncEl.textContent = data.totalBLNC.toLocaleString();
  }
}
