const axios = require('axios');
const xlsx = require('xlsx');

const URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/15-10-2024';

async function downloadFuelPrices() {
  try {
    console.log('Descargando datos...');
    const response = await axios.get(URL);
    const data = response.data;

    console.log('Creando archivo Excel...');
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data.ListaEESSPrecio);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Precios Carburantes');

    const fileName = 'precios_carburantes.xlsx';
    xlsx.writeFile(workbook, fileName);

    console.log(`Archivo Excel "${fileName}" creado exitosamente.`);
  } catch (error) {
    console.error('Error al descargar o procesar los datos:', error.message);
  }
}

downloadFuelPrices();