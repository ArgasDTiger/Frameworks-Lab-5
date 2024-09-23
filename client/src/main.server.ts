import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

enableProdMode();

const app = express();
const PORT = 4000;

app.engine('html', ngExpressEngine({
  bootstrap: AppComponent,
  providers: [
    provideRouter(routes),
  ],
}));

app.set('view engine', 'html');
app.set('views', join(__dirname, '../dist')); // Adjust path as needed

app.get('*.*', express.static(join(__dirname, '../dist'), { maxAge: '1y' }));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
