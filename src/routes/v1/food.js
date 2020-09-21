const cheerio = require('cheerio')
const nodeFetch = require('node-fetch')

module.exports = function (fastify, opts, next) {
  fastify.get('/search/:terms', async (req, res) => {
    const { terms } = req.params
    const response = await nodeFetch(`https://www.fatsecret.com/calories-nutrition/search?q=${terms}`)
    const rawHTML = await response.text()
    console.log(cheerio)
    const $ = cheerio.load(rawHTML, { decodeEntities: false })
    const rawString = $('.prominent').toArray()
    const result = []
    rawString.forEach((el) => {
      result.push({
        name: el.children[0].data,
        link: el.attribs.href
      })
    })
    res.send(result)
  })

  fastify.get('/details/', async (req, res) => {
    const { url } = req.query
    const response = await nodeFetch(`https://www.fatsecret.com${url}`)
    const rawHTML = await response.text()
    const $ = cheerio.load(rawHTML, { decodeEntities: false })

    const calories = $('.hero_value').text()

    const servingSize = $('.serving_size_value').text()

    const rawNutritionalFacts = $('.nutrient.value.left').toArray()

    const nutritionalFacts = {
      servingSize,
      nutrition: {
        calories,
        totalFat: rawNutritionalFacts[0].children[0].data,
        saturatedFat: rawNutritionalFacts[1].children[0].data,
        transFat: rawNutritionalFacts[2].children[0].data,
        polyunsaturatedFat: rawNutritionalFacts[3].children[0].data,
        monounsaturatedFat: rawNutritionalFacts[4].children[0].data,
        cholesterol: rawNutritionalFacts[5].children[0].data,
        sodium: rawNutritionalFacts[6].children[0].data,
        totalCarbohydrate: rawNutritionalFacts[7].children[0].data,
        dietaryFiber: rawNutritionalFacts[8].children[0].data,
        sugars: rawNutritionalFacts[9].children[0].data,
        protein: rawNutritionalFacts[10].children[0].data
      }
    }

    res.send(nutritionalFacts)
  })

  next()
}
