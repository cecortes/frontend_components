"use strict";

export class ProduccionGraficaModel {
  constructor(storage) {
    this.storage = storage;
    this.cachedData = [];
  }

  /**
   * Obtiene los totales de producción de un producto en un periodo determinado.
   */
  async fetchDataByPeriod(sku, startDate, endDate) {
    const sessionData = this.storage.loadSessionStorage();
    const token = sessionData ? sessionData.token : "";

    const payload = {
      sku,
      startDate,
      endDate
    };

    const apiUrl = import.meta.env.VITE_API_PRODUCCION_BY_PERIOD || "http://localhost:3000/api/waresmart/produccion/get/byPeriodProduct";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      const error = new Error(result.message || "Error al obtener datos de producción gráfica.");
      if (response.status === 401 || response.status === 403) {
        error.isAuthError = true;
      }
      throw error;
    }

    return result.data;
  }

  /**
   * @method processAndGroupData
   * @description Agrupa y formatea los datos obtenidos según el rango.
   */
  processAndGroupData(ngrData, blncData, rango, startDateObj) {
    let result = [];
    const ngrMap = new Map();
    const blncMap = new Map();
    
    // Normalizar la fecha a formato YYYY-MM-DD para mapeo
    const extractDate = (dateString) => {
      if (!dateString) return "";
      return String(dateString).split('T')[0].split(' ')[0];
    };
    
    // El backend devuelve { fecha: "YYYY-MM-DD", total: X }
    ngrData.forEach(d => {
      const dateVal = d.fecha || d.date || "";
      ngrMap.set(extractDate(dateVal), (d.total || 0) * 40);
    });
    blncData.forEach(d => {
      const dateVal = d.fecha || d.date || "";
      blncMap.set(extractDate(dateVal), (d.total || 0) * 40);
    });
    
    const pad = (n) => String(n).padStart(2, '0');
    const formatYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    if (rango === "semanal") {
        const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
        let start = new Date(startDateObj);
        for (let i = 0; i < 7; i++) {
            const dateStr = formatYMD(start);
            result.push({
                day: days[i],
                ngr: ngrMap.get(dateStr) || 0,
                blnc: blncMap.get(dateStr) || 0
            });
            start.setDate(start.getDate() + 1);
        }
    } else if (rango === "mensual") {
        let start = new Date(startDateObj);
        const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = formatYMD(start);
            result.push({
                day: i.toString(),
                ngr: ngrMap.get(dateStr) || 0,
                blnc: blncMap.get(dateStr) || 0
            });
            start.setDate(start.getDate() + 1);
        }
    } else if (rango === "anual") {
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const ngrMonths = new Array(12).fill(0);
        const blncMonths = new Array(12).fill(0);
        
        ngrData.forEach(d => {
            const dateVal = d.fecha || d.date || "";
            const dateStr = extractDate(dateVal);
            if (dateStr) {
                const monthIndex = parseInt(dateStr.split('-')[1], 10) - 1;
                ngrMonths[monthIndex] += ((d.total || 0) * 40);
            }
        });
        blncData.forEach(d => {
            const dateVal = d.fecha || d.date || "";
            const dateStr = extractDate(dateVal);
            if (dateStr) {
                const monthIndex = parseInt(dateStr.split('-')[1], 10) - 1;
                blncMonths[monthIndex] += ((d.total || 0) * 40);
            }
        });
        
        for (let i = 0; i < 12; i++) {
            result.push({
                day: months[i],
                ngr: ngrMonths[i],
                blnc: blncMonths[i]
            });
        }
    }
    
    this.cachedData = result;
    return result;
  }

  getCachedData() {
    return this.cachedData;
  }

  /**
   * @method getMaxProduction
   * @description Calcula la producción máxima de la data actual para escalar la gráfica
   */
  getMaxProduction() {
    const data = this.cachedData;
    let max = 0;
    data.forEach(item => {
      if (item.ngr > max) max = item.ngr;
      if (item.blnc > max) max = item.blnc;
    });
    // Añadimos un pequeño margen superior (+10%) para que las barras no toquen el techo
    return max > 0 ? Math.ceil(max * 1.1) : 5000;
  }
}
