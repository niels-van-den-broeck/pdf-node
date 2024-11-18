import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf.mjs';
import {Canvas} from 'canvas';

const filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const dirname = path.dirname(filename); // get the name of the directory

const buffer = fs.readFileSync(path.join(dirname, './test.pdf'))
const arr = new Uint8Array(buffer);

PDFJS.getDocument(arr).promise.then(async function (pdf) {
    pdf.getPage(1).then(page => {
        const viewport = page.getViewport({scale: 1.6});

        const canvas = new Canvas(viewport.width, viewport.height);
        const ctx = canvas.getContext('2d');

        page.render({
            canvasContext: ctx,
            viewport: viewport,
            intent: 'print',
        }).promise.then(() => {
            const out = fs.createWriteStream(dirname + '/test.png')
            const stream = canvas.createPNGStream()
            stream.pipe(out)

            out.on('finish', () =>  console.log(`Created file at: ${dirname}/test.png`))
        })
    });
});
