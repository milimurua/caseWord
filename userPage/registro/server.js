import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const client = new MercadoPagoConfig({ accessToken: ''}); //agregar el token de mercado pago

app.get("/", (req, res) =>{
    res.send("soy el server: )");
});

app.post("/create_preference", async (req, res)=>{
    try{
        const body ={
            items:[{
                title: req.body.title,
                quantity:  Number(req.body.quantity),
                unit_price:  Number(req.body.price),
                currency_id: "ARS",
            }],
            back_urls: {
                success:"http://localhost:5501/",
                failure:"",
                pending:""
            },
            auto_return: "approved",
        };
        
        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,
        })
    }catch(error){
        console.log(error)
        res.status(500).json ({
            error: "error al crear una preferencia :(",
        })
    }
});

app.post('/submit', (req, res) => {
    const { email, dni, phone, password } = req.body;
    const newData = { email, dni, phone, password };

    const filePath = path.join(__dirname, 'thing.json');

    // Read the current content of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        let existingData = [];

        if (data) {
            try {
                existingData = JSON.parse(data);
            } catch (err) {
                console.error('Error parsing JSON', err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }
        }

        const emailExists = existingData.some(user => user.email === email);
        if (emailExists) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }

        // Add the new data to the existing data
        existingData.push(newData);

        // Write the file with the updated data
        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.status(200).json({ message: 'Data saved successfully' });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});