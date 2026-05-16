"use strict";

import { ProduccionTotalesModel } from '../model/ProduccionTotalesModel.js';
import { ProduccionTotalesView } from '../view/ProduccionTotalesView.js';

export class ProduccionTotalesController {
  constructor(storage, modalErrorController) {
    this.model = new ProduccionTotalesModel(storage);
    this.view = new ProduccionTotalesView();
    this.modalErrorController = modalErrorController;
  }

  init() {
    const initialData = { totalNGR: 0, totalBLNC: 0 };
    return this.view.renderTotales(initialData);
  }

  bindEvents(rootElement, onRangoChangeCallback) {
    this.rootElement = rootElement;
    this.view.bindRangoChange((nuevoRango) => {
      // Notifica al mediador
      if (onRangoChangeCallback) {
        onRangoChangeCallback(nuevoRango);
      }
    }, this.rootElement);

    // Carga inicial
    this.updateTotales("semanal");
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

    return { startDate: format(start), endDate: format(end) };
  }

  async updateTotales(rango) {
    if (!this.rootElement) return;
    
    const { startDate, endDate } = this.getFechasPorRango(rango);

    try {
      // Botella Negra
      const ngrData = await this.model.fetchTotalesByPeriod("BTL-NGR-001", startDate, endDate);
      const totalNGR = ngrData.reduce((acc, curr) => acc + curr.total, 0) * 40;

      // Botella Blanca
      const blncData = await this.model.fetchTotalesByPeriod("BTL-BLN-001", startDate, endDate);
      const totalBLNC = blncData.reduce((acc, curr) => acc + curr.total, 0) * 40;

      // Actualizar DOM
      const ngrEl = this.rootElement.querySelector('#totalNGR');
      const blncEl = this.rootElement.querySelector('#totalBLNC');

      if (ngrEl) ngrEl.textContent = totalNGR.toLocaleString();
      if (blncEl) blncEl.textContent = totalBLNC.toLocaleString();

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
          console.error("Error cargando totales de producción:", error);
        }
      }
    }
  }
}
