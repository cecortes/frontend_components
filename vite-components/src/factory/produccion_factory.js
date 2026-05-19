import { ProduccionView } from "../components/Produccion/view/ProduccionView.js";
import { ProduccionModel } from "../components/Produccion/model/ProduccionModel.js";
import { ProduccionController } from "../components/Produccion/controller/ProduccionController.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { AuthController } from "../components/Auth/controller/AuthController.js";
import { ModalFactory } from "./modal_factory.js";
import { SidebarFactory } from "./sidebar_factory.js";
import { icons } from "../components/Dashboard/icons/svg_icons.js";
import { createProduccionTotalesComponent } from "../components/ProduccionTotales/_factory.js";
import { createProduccionGraficaComponent } from "../components/ProduccionGrafica/_factory.js";

export class ProduccionFactory {
  static async produccionComponent() {
    const { element: modalErrorElement, controller: modalErrorController } =
      ModalFactory.modalComponent();
    const sidebarController = SidebarFactory.createSidebar();

    const storage = new SessionStorage();
    const auth = new AuthController();

    const produccionTotalesController = createProduccionTotalesComponent(
      storage,
      modalErrorController
    );
    const produccionGraficaController = createProduccionGraficaComponent(
      storage,
      modalErrorController
    );

    const view = new ProduccionView(icons);
    const model = new ProduccionModel();

    const controller = new ProduccionController(
      view,
      model,
      storage,
      auth,
      modalErrorController,
      sidebarController,
      produccionTotalesController,
      produccionGraficaController
    );
    const element = await controller.init();

    return { element, modalError: modalErrorElement, controller };
  }
}
