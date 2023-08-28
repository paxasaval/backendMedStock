const fs = require("fs");
const csvParser = require("csv-parser");
const axios = require("axios");

const CSV_FILE_PATH = "./src/docs/medicamentos-14-02-20131.csv";
const CSV_FILE_PATH2 = "./src/docs/insumos.csv";
const CSV_FILE_PATH3 = "./src/docs/dispositivos.csv";

const API_URL = "http://localhost:3000/api/historical/addHistoric";
const API_URL1 = "http://localhost:3000/api/inventory/addMedicine";
const API_URL2 = "http://localhost:3000/api/inventory/addSupplies";
const API_URL3 = "http://localhost:3000/api/inventory/addDevice";


const JSON_FILE_PATH = "./src/docs/medicamentos.json";
const JSON_FILE_PATH_2 = "./src/docs/H_medicamentos.json";
const JSON_FILE_PATH2 = "./src/docs/insumos.json";
const JSON_FILE_PATH2_2 = "./src/docs/H_insumos.json";

const JSON_FILE_PATH3 = "./src/docs/dispositivos.json";
const JSON_FILE_PATH3_2 = "./src/docs/H_dispositivos.json";


var ciudades = ["HQUITO1","HQUITO2", "HLOJA", "HCUENCA1", "HGUAYAQUILL", "HRIOBAMBA", "HAMBATO"];
var array_supplies = ["Pharmacys","Bayer","Pharmarys","Ecumedicina"]
const postData = async (data) => {
  try {
    const response = await axios.post(API_URL2, data);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const processCSV = async () => { //procesar csv de medicinas para stock
  const dataArr = [];
  const date = new Date()
  const dueDate =  new Date(date)
  dueDate.setFullYear(date.getFullYear()+4)
  await new Promise((resolve) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csvParser())
      .on("data", (row) => {
          //console.log(row.code)
          const data = {
            name:row.name.trim(),
            code:row.code,
            supplier:array_supplies[Math.floor(Math.random()*array_supplies.length)], 
            quantity: Math.floor(Math.random()*(1000-250+1))+100,
            registrationDate: new Date(),
            inventory:"64cbc59a574fae5067183cf8",
            officialName:row.officialName,
            lot: row.lot,
            dueDate: dueDate,
            activeIngredient: 'activeIngredient',
          };
          dataArr.push(data);
      })
      .on("end", () => {
        console.log("Proceso de lectura de archivo CSV completado.");
        resolve();
      });
  });
  
  const jsonData = JSON.stringify(dataArr, null, 2);

  fs.writeFileSync(JSON_FILE_PATH, jsonData);
  console.log("Archivo JSON generado:", JSON_FILE_PATH);
};
const parseDate = (dateStr) => {
dateStr = dateStr===''?'04/08/2023':dateStr
  const parts = dateStr.replaceAll('-','/').split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Meses en JavaScript son 0-indexados (0-11)
    const year = 2026;
    return new Date(year, month, day);
  } else {
    throw new Error("Formato de fecha no válido");
  }
};
const processCSV2 = async () => {
  const dataArr = [];
  const date = new Date()
  const dueDate =  new Date(date)
  dueDate.setFullYear(date.getFullYear()+4)
  await new Promise((resolve) => {
    fs.createReadStream(CSV_FILE_PATH2)
      .pipe(csvParser())
      .on("data", (row) => {
          console.log(row.code)
          const data = {
            name:row.name.trim(),
            code:row.code,
            supplier:array_supplies[Math.floor(Math.random()*array_supplies.length)], 
            quantity: Math.floor(Math.random()*(1000-250+1))+100,
            registrationDate: new Date(),
            inventory:"64cbc59a574fae5067183cf8",
            tag:row.tag,
            lot: row.code.replaceAll('-',''),
            dueDate: dueDate,
            material: 'undefined',
          };
          dataArr.push(data);
      })
      .on("end", () => {
        console.log("Proceso de lectura de archivo CSV completado.");
        resolve();
      });
  });

  const jsonData = JSON.stringify(dataArr, null, 2);

  fs.writeFileSync(JSON_FILE_PATH2, jsonData);
  console.log("Archivo JSON generado:", JSON_FILE_PATH2);
};
const processCSV3 = async () => {
  const dataArr = [];
  const date = new Date()
  const dueDate =  new Date(date)
  dueDate.setFullYear(date.getFullYear()+4)
  await new Promise((resolve) => {
    fs.createReadStream(CSV_FILE_PATH3)
      .pipe(csvParser())
      .on("data", (row) => {
          //console.log(row.code)
          const data = {
            name:row.name.trim().toLowerCase(),
            code:row.code,
            supplier:row.supplier, 
            quantity: Math.floor(Math.random()*(1000-250+1))+100,
            registrationDate: new Date(),
            inventory:"64cbc59a574fae5067183cf8",
            model:'undefined',
            weight:Math.floor(Math.random()*(25000-500+1))+100,
            brand: row.brand,
          };
          dataArr.push(data);
      })
      .on("end", () => {
        console.log("Proceso de lectura de archivo CSV completado.");
        resolve();
      });
  });

  const jsonData = JSON.stringify(dataArr, null, 2);

  fs.writeFileSync(JSON_FILE_PATH3, jsonData);
  console.log("Archivo JSON generado:", JSON_FILE_PATH3);
};
const processCSV_2 = async () => {
  const dataArr = [];
  const date = new Date()
  const dueDate =  new Date(date)
  dueDate.setFullYear(date.getFullYear()+4)
  await new Promise((resolve) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csvParser())
      .on("data", (row) => {
          for (let index = 0; index < ciudades.length; index++) {
            const data = {
              period:"2022",
              code:row.code,
              quantity: Math.floor(Math.random()*(1000-250+1))+100,
              name:row.name.trim(),
              site:ciudades[index], 
              type: 'Medicines',
            };
            dataArr.push(data);

          }
      })
      .on("end", () => {
        console.log("Proceso de lectura de archivo CSV completado.");
        resolve();
      });
  });

  const jsonData = JSON.stringify(dataArr, null, 2);

  fs.writeFileSync(JSON_FILE_PATH_2, jsonData);
  console.log("Archivo JSON generado:", JSON_FILE_PATH_2);
};
const processCSV2_2 = async () => {
  const dataArr = [];
  const date = new Date()
  const dueDate =  new Date(date)
  dueDate.setFullYear(date.getFullYear()+4)
  await new Promise((resolve) => {
    fs.createReadStream(CSV_FILE_PATH2)
      .pipe(csvParser())
      .on("data", (row) => {
          for (let index = 0; index < ciudades.length; index++) {
            const data = {
              period:"2022",
              code:row.code,
              quantity: Math.floor(Math.random()*(1000-250+1))+100,
              name:row.name.trim(),
              site:ciudades[index], 
              type: 'Supplies',
            };
            dataArr.push(data);

          }
      })
      .on("end", () => {
        console.log("Proceso de lectura de archivo CSV completado.");
        resolve();
      });
  });

  const jsonData = JSON.stringify(dataArr, null, 2);

  fs.writeFileSync(JSON_FILE_PATH2_2, jsonData);
  console.log("Archivo JSON generado:", JSON_FILE_PATH2_2);
};
const processCSV3_2 = async () => {
  const dataArr = [];
  const date = new Date()
  const dueDate =  new Date(date)
  dueDate.setFullYear(date.getFullYear()+4)
  await new Promise((resolve) => {
    fs.createReadStream(CSV_FILE_PATH3)
      .pipe(csvParser())
      .on("data", (row) => {
          for (let index = 0; index < ciudades.length; index++) {
            const data = {
              period:"2022",
              code:row.code,
              quantity: Math.floor(Math.random()*(1000-250+1))+100,
              name:row.name.trim(),
              site:ciudades[index], 
              type: 'Device',
            };
            dataArr.push(data);

          }
      })
      .on("end", () => {
        console.log("Proceso de lectura de archivo CSV completado.");
        resolve();
      });
  });

  const jsonData = JSON.stringify(dataArr, null, 2);

  fs.writeFileSync(JSON_FILE_PATH3_2, jsonData);
  console.log("Archivo JSON generado:", JSON_FILE_PATH3_2);
};
async function postData2(data) {
  try {
    const response = await axios.post(API_URL, data);
    console.log("Respuesta:", response.data);
  } catch (error) {
    console.error("Error en la petición:", error.message);
  }
}

async function processObjects(objects) {
  for (const obj of objects) {
    await postData2(obj);
  }
}

async function main() {
  try {
    const data = await fs.promises.readFile(JSON_FILE_PATH3_2, "utf8");
    const objects = JSON.parse(data);
    await processObjects(objects);
    console.log("Todas las peticiones completadas.");
  } catch (error) {
    console.error("Error al leer o procesar el archivo:", error.message);
  }
}

main();
//processCSV();
//processCSV_2();

//processCSV2();
//processCSV2_2();
//processCSV3_2();

//processCSV3();
//processCSV();
const data = {
  officialName: "Medicine B",
  lot: "22222",
  dueDate: "30-11-2013",
  activeIngredient: "Ingredient Y",
  name: "Medicine Stock B",
  code: "MSB",
  supplier: "Supplier 5",
  quantity: 120,
  registrationDate: "30-11-2013",
  inventory: "64cbc59a574fae5067183cf8",
};
const test = async (data) => {
  await postData(data);
};

//test(data)
