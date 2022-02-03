

export interface Score {
    ovaId: number,
    userId: number,
    scoreNumber: number
}

export interface ScoreIDB {
    id?: number,
    ovaId: number,
    userId: number,
    scoreNumber: number
}



export interface Rating {
    scoreId: {
        user: {
            idUser: number
        },
        ova: {
            idOva: number
        }
    },
    scoreNumber: number
}
