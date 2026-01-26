import { prisma } from './lib/prisma'
import type {UtilityPoleUpdateInput, UtilityPoleWhereUniqueInput} from "./generated/prisma/models/UtilityPole";

const NEWTON_GIS_ENDPOINT = 'https://gisweb.newtonma.gov/server/rest/services/Data/MapServer/1/query?f=json&where=1%3D1&outFields=OBJECTID,NUM,STREET,MAP&outSR=4326&f=json&geometryType=esriGeometryEnvelope&geometry=%7B%22spatialReference%22%3A%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D%2C%22xmin%22%3A-7928164.97820771%2C%22ymin%22%3A5208264.452124099%2C%22xmax%22%3A-7925947.504086458%2C%22ymax%22%3A5209671.073047367%2C%22type%22%3A%22esriGeometryEnvelope%22%7D';

type NewtonGisPole = {
    attributes: {
        OBJECTID: number;
        STREET: string;
        NUM: number;
    };
    geometry: {
        x: number;
        y: number;
    };
};

async function fetchPoles() {
    const newtonGISResponse = await fetch(NEWTON_GIS_ENDPOINT);
    const newtonGISJSON = await newtonGISResponse.json();

    return newtonGISJSON.features.map((pole: NewtonGisPole ) => {
        let streetName = pole.attributes.STREET;
        streetName = streetName.substring(0, 1) + streetName.substring(1).toLowerCase();
         return {
             id: pole.attributes.OBJECTID,
             streetName,
             streetNum: pole.attributes.NUM,
             latitude: parseFloat( pole.geometry.x.toFixed(6) ),
             longitude: parseFloat( pole.geometry.y.toFixed(6) ),
         }
    });
}

// TODO this only creates poles. What if one is removed? I don't want to delete the record from the DB because
//  part of this project is to archive poles before they are removed.
async function main() {
    const poles = await fetchPoles();

    const deletedPoles = await prisma.utilityPole.deleteMany({});
    console.log(`Deleted ${deletedPoles.count} poles` );

    const createdPoles = await prisma.utilityPole.createMany({data: poles});
    console.log(`Created ${createdPoles.count} poles` );
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })