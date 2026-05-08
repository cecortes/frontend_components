"use strict";

import { ProduccionTotalesController } from './controller/ProduccionTotalesController.js';

/**
 * @function createProduccionTotalesComponent
 * @description Factory para ensamblar el componente de ProduccionTotales.
 */
export const createProduccionTotalesComponent = () => {
  return new ProduccionTotalesController();
};
