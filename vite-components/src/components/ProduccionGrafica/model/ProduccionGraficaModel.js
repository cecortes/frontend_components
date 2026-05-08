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
    this.maxProduction = 5000;
  }

  getWeeklyData() {
    return this.weeklyData;
  }

  getMaxProduction() {
    return this.maxProduction;
  }
}
