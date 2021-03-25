// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake.min';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import convertToSvg from '../services/convertToPdf';
import express from 'express';
import { UMLModel } from '@ls1intum/apollon';

const controllers = {
  convert: (req: express.Request, res: express.Response) => {
    if (req.body && req.body.model) {
      let model = req.body.model;
      if (typeof model === 'string') {
        model = JSON.parse(model);
      }
      const { svg, clip } = convertToSvg(<UMLModel>(<unknown>model));
      const { width, height } = clip;
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      var doc = pdfMake.createPdf({
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
