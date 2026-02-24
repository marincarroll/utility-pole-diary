import { prisma } from './lib/prisma'

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

function parseCoordinate( coordinate: Number) {
    const rounded = coordinate.toFixed(6);
    return parseFloat(rounded);
}

function parseAddress(streetNum: number, streetName: string) {
    const titleCaseName = streetName.toLowerCase().replace(/(^\w|\s\w)/g, (firstLetter) => {
        return firstLetter.toUpperCase()
    });

    return `${streetNum} ${titleCaseName}`;
}

async function fetchPoles() {
    const newtonGISResponse = await fetch(NEWTON_GIS_ENDPOINT);
    const newtonGISJSON = await newtonGISResponse.json();

    return newtonGISJSON.features.map((pole: NewtonGisPole ) => {

         return {
             id: pole.attributes.OBJECTID,
             address: parseAddress(pole.attributes.NUM, pole.attributes.STREET ),
             latitude: parseCoordinate( pole.geometry.x ),
             longitude: parseCoordinate( pole.geometry.y ),
         }
    });
}

// TODO this only creates poles. What if one is removed? I don't want to delete the record from the DB because
//  part of this project is to archive poles before they are removed.
async function main() {
    const poles = await fetchPoles();

  //  const deletedPoles = await prisma.utilityPole.deleteMany({});
  //  console.log(`Deleted ${deletedPoles.count} poles` );
    try {
        const createdPoles = await prisma.utilityPole.createMany({data: poles});
        console.log(`Created ${createdPoles.count} poles.` );
    } catch (err) {
        if( err.code === 'P2002') {
            console.error('One or more poles already exist in the database.');
        } else {
            console.error(err);
        }
    }
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