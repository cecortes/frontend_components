"use strict";

export class ProduccionTotalesModel {
  constructor() {
    // Datos harcodeados calculados del mockup para distintos rangos
    this.totales = {
      semanal: { totalNGR: 23500, totalBLNC: 18800 },
      mensual: { totalNGR: 105400, totalBLNC: 85200 },
      anual: { totalNGR: 1250000, totalBLNC: 980000 }
    };
  }

  getTotales(rango = "semanal") {
    // Si el rango no existe, devolvemos el semanal por defecto
    return this.totales[rango] || this.totales.semanal;
  }
}
