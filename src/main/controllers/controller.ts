// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake.min";
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";
import convertToPdf from "../services/convertToPdf";
import express from "express";
import { UMLModel } from "@ls1intum/apollon";

const controllers = {
  convert: (req: express.Request, res: express.Response) => {
    console.log("converts");
    if (req.query && req.query.model && typeof req.query.model === "string") {
      const model = JSON.parse(req.query.model);
      const { svg, clip } = convertToPdf(<UMLModel>(<unknown>model));
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
};

export default controllers;
