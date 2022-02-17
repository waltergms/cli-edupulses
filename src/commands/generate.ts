import { GluegunToolbox } from 'gluegun'
import { emitWarning } from 'process'

import { dirname } from 'path'

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
    } = toolbox

    const appDir = dirname(require.main.filename)
    const outputDir = `${appDir}/../output/src`
    const version = 'v2'
    let actionLower = 'create'
    let actionFirstCapital = 'Create'

    if (parameters && parameters.first) {
      const name = parameters.first
      const firstLetterCapital = name
        .toUpperCase()
        .substring(0, 1)
        .concat(name.toLowerCase().substring(1, name.length))
      const allLower = name.toLowerCase()
      try {
        await generate({
          template: 'route.ts.ejs',
          target: `${outputDir}/routes/${version}/${allLower}/index.ts`,
          props: { firstLetterCapital, allLower, version },
        })

        // Model
        await generate({
          template: 'model.ts.ejs',
          target: `${outputDir}/entities/${allLower}.ts`,
          props: { firstLetterCapital, allLower },
        })

        // Controller Create
        await generate({
          template: 'controller.create.ts.ejs',
          target: `${outputDir}/modules/${allLower}/useCases/${actionLower}${firstLetterCapital}/${actionFirstCapital}${firstLetterCapital}Controller.ts`,
          props: {
            firstLetterCapital,
            allLower,
            actionLower,
            actionFirstCapital,
          },
        })
        // Controller Read
        actionLower = 'list'
        actionFirstCapital = 'List'
        await generate({
          template: 'controller.list.ts.ejs',
          target: `${outputDir}/modules/${allLower}/useCases/${actionLower}${firstLetterCapital}/${actionFirstCapital}${firstLetterCapital}Controller.ts`,
          props: {
            firstLetterCapital,
            allLower,
            actionLower,
            actionFirstCapital,
          },
        })
        // Controller Update
        actionLower = 'update'
        actionFirstCapital = 'Update'
        await generate({
          template: 'controller.update.ts.ejs',
          target: `${outputDir}/modules/${allLower}/useCases/${actionLower}${firstLetterCapital}/${actionFirstCapital}${firstLetterCapital}Controller.ts`,
          props: {
            firstLetterCapital,
            allLower,
            actionLower,
            actionFirstCapital,
          },
        })
        // Controller Delete
        actionLower = 'delete'
        actionFirstCapital = 'Delete'
        await generate({
          template: 'controller.delete.ts.ejs',
          target: `${outputDir}/modules/${allLower}/useCases/${actionLower}${firstLetterCapital}/${actionFirstCapital}${firstLetterCapital}Controller.ts`,
          props: {
            firstLetterCapital,
            allLower,
            actionLower,
            actionFirstCapital,
          },
        })

        info(`Generated file at models/${name}-model.ts`)
      } catch (error) {
        emitWarning(error)
      }
      // ROUTE
    } else {
      emitWarning(
        `É preciso informar o nome do modulo que deve ser criado, ex: "termus generate nomeDoModulo"`
      )
    }
  },
}
