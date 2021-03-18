// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake.min';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import convertToSvg from '../services/convertToPdf';
import express from 'express';
import { UMLModel } from '@ls1intum/apollon';

const controllers = {
  convert: (req: express.Request, res: express.Response) => {
    if (req.body && req.body.model && typeof req.body.model === 'string') {
      const model = JSON.parse(req.body.model);
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

      document.pipe(res);
      document.end();
    }
  },
  status: (req: express.Request, res: express.Response) => {
    res.sendStatus(200);
  },
};

export default controllers;
