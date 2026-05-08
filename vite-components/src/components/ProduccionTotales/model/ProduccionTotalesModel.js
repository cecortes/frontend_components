"use strict";

export class ProduccionTotalesModel {
  constructor() {
    // Datos harcodeados calculados del mockup (total sum of array)
    this.totales = {
      totalNGR: 23500,
      totalBLNC: 18800
    };
  }

  getTotales() {
    return this.totales;
  }
}
