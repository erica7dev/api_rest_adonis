import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Moment from 'App/Models/Moment'

export default class CommentsController {
  public async store({ request, response, params }: HttpContextContract) {
    const body = request.body()
    const momentId = params.momentId

    await Moment.findOrFail(momentId) //importar o moment. valido?

    body.momentId = momentId

    const comment = await Comment.create(body) //criando comment

    response.status(201)

    return {
      message: 'Comentário adicionado com sucesso!',
      data: comment,
    }
  }
}
