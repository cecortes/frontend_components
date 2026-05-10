"use strict";

import { ProduccionGraficaModel } from '../model/ProduccionGraficaModel.js';
import { ProduccionGraficaView } from '../view/ProduccionGraficaView.js';

export class ProduccionGraficaController {
  constructor() {
    this.model = new ProduccionGraficaModel();
    this.view = new ProduccionGraficaView();
  }

  init() {
    // Retorna el cascarón de la gráfica. El renderizado real ocurre en bindEvents().
    return this.view.getTemplate();
  }

  bindEvents(rootElement = document) {
    this.rootElement = rootElement;
    this.currentFilterType = "todos"; // Estado inicial
    this.currentRange = "semanal"; // Estado inicial

    // Registrar el listener del filtro
    this.view.bindFilterChange(this.handleFilterChange.bind(this), this.rootElement);
    
    // Renderizado inicial
    this.renderCurrentChart();
  }

  handleFilterChange(filterType) {
    this.currentFilterType = filterType;
    this.renderCurrentChart();
  }

  updateChartRange(rango) {
    this.currentRange = rango;
    this.renderCurrentChart();
  }

  renderCurrentChart() {
    const data = this.model.getDataByRange(this.currentRange);
    const maxProduction = this.model.getMaxProduction();
    this.view.renderChart(data, maxProduction, this.currentFilterType, this.rootElement);
  }
}
