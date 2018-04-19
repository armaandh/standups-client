const host = ""

export const getAllTeams = () => {
    return allTeams
}

// Static data untill we get api working

const allTeams = [
    {
        id: '1',
        name: 'Engineering',
        members: [
            {
                id: '11',
                name: 'Edgar Zapeka'
            },
            {
                id: '22',
                name: 'Cha Tumtaweetikul'
            },
            {
                id: '33',
                name: 'Armaan Dhanji'
            },
            {
                id: '44',
                name: 'Liam MacNeil'
            }
        ],
        subteams: []
    },
    {
        id: '2',
        name: 'Design',
        members: [
            {
                id: '55',
                name: 'Steve Jobs'
            },
            {
                id: '66',
                name: 'Jony Ive'
            },
        ],
        subteams: []
    },
    {
        id: '3',
        name: 'Management',
        members: [
            {
                id: '77',
                name: 'Jeff Bezos'
            },
        ],
        subteams: []
    },
]