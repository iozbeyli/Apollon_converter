import 'jsdom-global/register';
import { ApollonEditor, SVG, UMLModel } from '@ls1intum/apollon';

export class ConversionService {
  /**
   * Gets an uml model of apollon and returns svg of it
   *
   * @param model
   * @returns an svg object with svg string and bounds
   */
  convertToSvg = async (model: UMLModel): Promise<SVG> => {
    document.body.innerHTML = '<!doctype html><html lang="en"><body><div></div></body></html>';

    // JSDOM does not support getBBox so we have to mock it here
    // @ts-ignore
    window.SVGElement.prototype.getBBox = () => ({
      x: 0,
      y: 0,
      width: 10,
      height: 10,
    });

    return ApollonEditor.exportModelAsSvg(model,{});
  };
}
