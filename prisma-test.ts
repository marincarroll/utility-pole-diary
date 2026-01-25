import { prisma } from './lib/prisma'

async function main() {
    const utilityPole = await prisma.utilityPole.update({
        where: {
            id: 1,
        },
        data: {
            streetNum: 39,
            streetName: "Crafts",
            latitude: -71.246595332512356,
            longitude: 42.350930230216122,
        },
    })
    console.log('updated pole:', utilityPole)

    const allUtilityPoles = await prisma.utilityPole.findMany({})
    console.log('All poles:', JSON.stringify(allUtilityPoles, null, 2))
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