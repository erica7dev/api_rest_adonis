//contém todos os params. da req.
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Application from '@ioc:Adonis/Core/Application' //coloca img
import { v4 as uuidv4 } from 'uuid'

export default class MomentsController {
  //validação de img
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const moment = await Moment.create(body) //insert no db
    response.status(201)

    const image = request.file('image', this.validationOptions) //input - opções de validação

    if (image) {
      const imageName = `${uuidv4()}.${image!.extname}` //${image!.extname} => nome novo + extensão

      await image.move(Application.tmpPath('uploads'), {
        name: imageName, //tmp => onde vai ficar guardada
      })

      body.image = imageName //salvando nome da img (e não o nome de origem)
    }

    return {
      message: 'Momento criado com sucesso!',
      data: moment,
    }
  }

  public async index() {
    //get
    const moments = await Moment.query().preload('comments')

    return {
      data: moments,
    }
  }
  //retorno de momento individual
  public async show({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id) // findOrFail => se ele não encontrar falhar

    await moment.load('comments')

    return {
      data: moment,
    }
  }
  //delete task
  public async destroy({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)

    await moment.delete()

    return {
      message: 'Momento excluído com sucesso!',
      data: moment,
    }
  }

  //update

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const moment = await Moment.findOrFail(params.id)

    //substituindo dados do body
    moment.title = body.title
    moment.description = body.description

    if (moment.image != body.image || !moment.image) {
      //checando se img é a mesma || se momento não possui img
      const image = request.file('image', this.validationOptions)

      if (image) {
        const imageName = `${uuidv4()}.${image!.extname}`

        await image.move(Application.tmpPath('uploads'), {
          name: imageName,
        })
        moment.image = imageName //salvando nome da img
      }
    }
    await moment.save()

    return {
      message: 'Momento atualizado com sucesso!',
      data: moment,
    }
  }
}
