import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IWord} from "../../models/IWords";

interface WordsState {
    words: IWord[];
    isLoading: boolean
    error: string
    count: number
    winRate: number
}

const initialState: WordsState = {
    words: [
        {
            id: 1,
            rus: 'радуга',
            eng: 'rainbow'
        },
        {
            id: 2,
            rus: 'собака',
            eng: 'dog'
        },
        {
            id: 3,
            rus: 'кошка',
            eng: 'cat'
        },
        {
            id: 4,
            rus: 'кролик',
            eng: 'rabbit'
        },
        {
            id: 5,
            rus: 'машина',
            eng: 'car'
        },
        {
            id: 6,
            rus: 'дерево',
            eng: 'tree'
        },
        {
            id: 7,
            rus: 'самолет',
            eng: 'plain'
        },
        {
            id: 8,
            rus: 'бутылка',
            eng: 'bottle'
        },
        {
            id: 9,
            rus: 'дом',
            eng: 'house'
        },
        {
            id: 10,
            rus: 'кофе',
            eng: 'coffee'
        },
        {
            id: 11,
            rus: 'чашка',
            eng: 'cup'
        },
        {
            id: 12,
            rus: 'ручка',
            eng: 'pen'
        },
        {
            id: 13,
            rus: 'карандаш',
            eng: 'pencil'
        },
        {
            id: 14,
            rus: 'чай',
            eng: 'tea'
        },
        {
            id: 15,
            rus: 'окно',
            eng: 'window'
        },
        {
            id: 16,
            rus: 'мальчик',
            eng: 'boy'
        },
        {
            id: 17,
            rus: 'дорога',
            eng: 'road'
        },
        {
            id: 18,
            rus: 'море',
            eng: 'sea'
        },
        {
            id: 19,
            rus: 'небо',
            eng: 'sky'
        },
        {
            id: 20,
            rus: 'облако',
            eng: 'cloud'
        },
        {
            id: 21,
            rus: 'яблоко',
            eng: 'apple'
        },
        {
            id: 22,
            rus: 'пол',
            eng: 'flor'
        },
        {
            id: 23,
            rus: 'радостный',
            eng: 'happy'
        },
        {
            id: 24,
            rus: 'свет',
            eng: 'light'
        }

    ],
    isLoading: false,
    error: '',
    count: 0,
    winRate: 0,
}

export const wordSlice = createSlice({
    name: 'word',
    initialState,
    reducers: {
        addWord(state, action: PayloadAction<IWord>) {
            state.words.push(action.payload)
        },
        increment(state,action:PayloadAction<number>){
            state.count += action.payload
        },
        winRateInc(state,action:PayloadAction<number>){
            state.winRate += action.payload
        }
    }
})

export default wordSlice.reducer;