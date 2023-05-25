import pdfMake from 'pdfmake/build/pdfmake.min';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import express from 'express';
import { UMLModel } from '@ls1intum/apollon';
import { ConversionService } from '../services/convertToPdf';

const controllers = {
  async convert (req: express.Request, res: express.Response) {
    if (req.body && req.body.model) {
      let model = req.body.model;
      if (typeof model === 'string') {
        model = JSON.parse(model);
      }
      const artemisDiagram: boolean = req.body.artemisDiagram;
      const service: ConversionService = new ConversionService();
      const { svg, clip } = await service.convertToSvg((model as unknown) as UMLModel, artemisDiagram);
      const { width, height } = clip;
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const doc = pdfMake.createPdf({
        content: [
          {
            svg,
          },
        ],
        pageSize: { width, height },
        pageMargins: 0,
      });
      const document = doc.getStream();
      res.type('application/pdf');
      document.pipe(res);
      document.end();
    } else {
      res.status(400).send({ error: 'Model must be defined!' });
    }
  },
  status: (req: express.Request, res: express.Response) => {
    res.sendStatus(200);
  },
};

export default controllers;
