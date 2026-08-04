
exports.getClassSchedule = async (req, res) => {

    res.json({
        "Monday": [
                { time: "07:15 - 08:00", subject: "Biologia", teacher: "" },
                { time: "08:00 - 08:45", subject: "Biologia", teacher: "" },
                { time: "09:00 - 09:45", subject: "Matemática", teacher: "" },
                { time: "09:45 - 10:30", subject: "Matemática", teacher: "" },
                { time: "10:50 - 11:35", subject: "Dia Lab", teacher: "" },
                { time: "11:35 - 12:20", subject: "L.I.V.", teacher: "" }
            ],
            "Tuesday": [
                { time: "07:15 - 08:00", subject: "Língua Portuguesa", teacher: "" },
                { time: "08:00 - 08:45", subject: "Artes", teacher: "" },
                { time: "09:00 - 09:45", subject: "Redação", teacher: "" },
                { time: "09:45 - 10:30", subject: "Redação", teacher: "" },
                { time: "10:50 - 11:35", subject: "Química", teacher: "" },
                { time: "11:35 - 12:20", subject: "Química", teacher: "" }
            ],
            "Wednesday": [
                { time: "07:15 - 08:00", subject: "Prova", teacher: "" },
                { time: "08:00 - 08:45", subject: "Prova", teacher: "" },
                { time: "09:00 - 09:45", subject: "Literatura", teacher: "" },
                { time: "09:45 - 10:30", subject: "Língua Inglesa", teacher: "" },
                { time: "10:50 - 11:35", subject: "Língua Inglesa", teacher: "" },
                { time: "11:35 - 12:20", subject: "Edudação Física", teacher: "" }
            ],
            "Thursday": [
                { time: "07:15 - 08:00", subject: "Física", teacher: "" },
                { time: "08:00 - 08:45", subject: "Fisica", teacher: "" },
                { time: "09:00 - 09:45", subject: "Matemática", teacher: "" },
                { time: "09:45 - 10:30", subject: "Edudação Física", teacher: "" },
                { time: "10:50 - 11:35", subject: "Matemática", teacher: "" },
                { time: "11:35 - 12:20", subject: "Matemática", teacher: "" }
            ],
            "Friday": [
                { time: "07:15 - 08:00", subject: "Língua Portuguesa", teacher: "" },
                { time: "08:00 - 08:45", subject: "Língua Portuguesa", teacher: "" },
                { time: "09:00 - 09:45", subject: "História", teacher: "" },
                { time: "09:45 - 10:30", subject: "Geografia", teacher: "" },
                { time: "10:50 - 11:35", subject: "Geografia", teacher: "" },
                { time: "11:35 - 12:20", subject: "História", teacher: "" }
            ]
    });

};