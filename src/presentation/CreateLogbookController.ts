import { Request, Response } from "express"
import {
  CreateLogbookUseCase,
  ICreateLogbookResult,
} from "../application/CreateLogbookUseCase"

/**
 * controller is in the presentation layer because it knows about
 * the application layer
 */

export class CreatedLogbookDto implements ICreateLogbookResult {
  public readonly logbookId: string
  public constructor(id: string) {
    this.logbookId = id
  }
}

export class CreateLogbookController {
  public constructor(private readonly _useCase: CreateLogbookUseCase) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const userId = "fakeUserId"

    const result = await this._useCase.execute({
      name: req.body.name,
      userId,
    })

    const response = new CreatedLogbookDto(result.logbookId)

    res.status(201).json(response)
  }
}
