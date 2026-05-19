"use strict";

import { ProduccionGraficaModel } from '../model/ProduccionGraficaModel.js';
import { ProduccionGraficaView } from '../view/ProduccionGraficaView.js';

export class ProduccionGraficaController {
  constructor(storage, modalErrorController) {
    this.model = new ProduccionGraficaModel(storage);
    this.view = new ProduccionGraficaView();
    this.modalErrorController = modalErrorController;
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
    
    // Renderizado inicial con datos del servidor
    this.loadDataAndRender(this.currentRange);
  }

  handleFilterChange(filterType) {
    this.currentFilterType = filterType;
    // Solo re-dibuja con la data en caché
    this.renderCurrentChart();
  }

  updateChartRange(rango) {
    this.currentRange = rango;
    // Hace un nuevo fetch al cambiar el rango (Semanal, Mensual, Anual)
    this.loadDataAndRender(rango);
  }

  getFechasPorRango(rango) {
    const now = new Date();
    let start, end;
    
    if (rango === "semanal") {
      // Lunes a Domingo de la semana actual
      const day = now.getDay();
      const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);
      start = new Date(now);
      start.setDate(diffToMonday);
      start.setHours(0, 0, 0, 0);
      
      end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else if (rango === "mensual") {
      // Del 1 al último día del mes actual
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else if (rango === "anual") {
      // Del 1 de Enero al 31 de Diciembre del año actual
      start = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    }

    const format = (d) => {
      const pad = (n) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };

    return { startDateStr: format(start), endDateStr: format(end), startDateObj: start };
  }

  async loadDataAndRender(rango) {
    if (!this.rootElement) return;
    
    const { startDateStr, endDateStr, startDateObj } = this.getFechasPorRango(rango);

    try {
      // Hacer las consultas (fetch)
      const ngrData = await this.model.fetchDataByPeriod("BTL-NGR-001", startDateStr, endDateStr);
      const blncData = await this.model.fetchDataByPeriod("BTL-BLN-001", startDateStr, endDateStr);

      // Procesar, agrupar y guardar en memoria
      this.model.processAndGroupData(ngrData, blncData, rango, startDateObj);
      
      // Dibujar la gráfica
      this.renderCurrentChart();

    } catch (error) {
      if (this.modalErrorController) {
        if (error.isAuthError) {
          this.modalErrorController.showError(error.message, () => window.router.navigate("/"));
        } else {
          this.modalErrorController.showError(error.message);
        }
      } else {
        if (error.isAuthError) {
          window.router.navigate("/");
        } else {
          console.error("Error cargando gráfica de producción:", error);
        }
      }
    }
  }

  renderCurrentChart() {
    const data = this.model.getCachedData();
    const maxProduction = this.model.getMaxProduction();
    this.view.renderChart(data, maxProduction, this.currentFilterType, this.rootElement);
  }
}
