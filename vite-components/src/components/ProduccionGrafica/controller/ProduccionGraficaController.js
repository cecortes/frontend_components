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
    // Registrar el listener del filtro
    this.view.bindFilterChange(this.handleFilterChange.bind(this), this.rootElement);
    
    // Renderizado inicial
    this.handleFilterChange("todos");
  }

  handleFilterChange(filterType) {
    const weeklyData = this.model.getWeeklyData();
    const maxProduction = this.model.getMaxProduction();
    this.view.renderChart(weeklyData, maxProduction, filterType, this.rootElement);
  }
}
