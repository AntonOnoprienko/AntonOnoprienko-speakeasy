export interface IWord {
    id: number
    rus: string
    eng: string
}

export interface IResult{
    data: string
    playerName: string
    winRate: number
    wrongAnswers: string[]


}