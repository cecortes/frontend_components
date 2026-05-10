"use strict";

export class ProduccionGraficaModel {
  constructor() {
    this.weeklyData = [
      { day: "Lun", ngr: 4200, blnc: 3100 },
      { day: "Mar", ngr: 3800, blnc: 3500 },
      { day: "Mié", ngr: 4500, blnc: 2900 },
      { day: "Jue", ngr: 4100, blnc: 4000 },
      { day: "Vie", ngr: 4800, blnc: 3800 },
      { day: "Sáb", ngr: 2100, blnc: 1500 },
      { day: "Dom", ngr: 0, blnc: 0 },
    ];

    // 31 días hardcodeados
    this.monthlyData = Array.from({ length: 31 }, (_, i) => ({
      day: `${i + 1}`,
      ngr: Math.floor(Math.random() * 3000) + 2000, // Datos simulados diarios entre 2000 y 5000
      blnc: Math.floor(Math.random() * 3000) + 1500
    }));

    // 12 meses hardcodeados
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    this.yearlyData = months.map(m => ({
      day: m,
      ngr: Math.floor(Math.random() * 80000) + 40000, // Datos simulados mensuales
      blnc: Math.floor(Math.random() * 80000) + 30000
    }));

    this.currentRange = "semanal";
  }

  getWeeklyData() {
    return this.weeklyData;
  }

  /**
   * @method getDataByRange
   * @description Retorna los datos según el rango. Si es mensual, filtra hasta la cantidad de días del mes actual.
   */
  getDataByRange(rango) {
    this.currentRange = rango;
    if (rango === "anual") {
      return this.yearlyData;
    } else if (rango === "mensual") {
      const now = new Date();
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      return this.monthlyData.slice(0, daysInMonth);
    }
    // Default semanal
    return this.weeklyData;
  }

  /**
   * @method getMaxProduction
   * @description Calcula la producción máxima de la data actual para escalar la gráfica
   */
  getMaxProduction() {
    const data = this.getDataByRange(this.currentRange);
    let max = 0;
    data.forEach(item => {
      if (item.ngr > max) max = item.ngr;
      if (item.blnc > max) max = item.blnc;
    });
    // Añadimos un pequeño margen superior (+10%) para que las barras no toquen el techo
    return max > 0 ? Math.ceil(max * 1.1) : 5000;
  }
}
