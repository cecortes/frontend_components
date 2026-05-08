"use strict";

import { ProduccionGraficaController } from './controller/ProduccionGraficaController.js';

/**
 * @function createProduccionGraficaComponent
 * @description Factory para ensamblar el componente de ProduccionGrafica.
 */
export const createProduccionGraficaComponent = () => {
  return new ProduccionGraficaController();
};
