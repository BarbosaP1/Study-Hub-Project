const cookie = "agendakids_session=" + process.env.USER_TOKEN;
exports.getAssignments = async (req, res) => {

    const { pageIndex } = req.params;
    const mode = req.query.mode;
    const isCompleteMode = mode === "complete";

    // Faz a requisição a AgendaEdu (https://web.agendaedu.com/students/summaryday_classrooms?page={pageIndex})

    const response = await fetch(`https://web.agendaedu.com/students/summaryday_classrooms?page=${pageIndex}`, {
        "headers": {
            "cookie": cookie
        },
        "body": null,
        "method": "GET"
    });
    const parsedAssignments = parseAssignments(await response.text());
    if (!isCompleteMode)
        return res.json(parsedAssignments);
    else if (isCompleteMode)
    {
        return res.status(200).json(await parseCompleteMode(parsedAssignments));
    }
    else return res.status(403).json({ error: "Invalid mode. Use 'normal' or 'complete'." });

};

exports.getAssignment = async (req, res) => {

    const { assignmentId } = req.params;
    return res.json(await fetchAssignment(assignmentId));

};
async function fetchAssignment(assignmentId)
{
    // Faz a requisição a AgendaEdu (https://web.agendaedu.com/students/summaryday_classrooms/show/${assignmentId})
    const response = await fetch(`https://web.agendaedu.com/students/summaryday_classrooms/show/${assignmentId}`, {
        "headers": {
            "cookie": cookie
        },
        "body": null,
        "method": "GET"
    });
    html = await response.text();
    if (html.includes(`<body class="body-404">`))
    {
        return { error: "Assignment not found. (AgendaEdu error)" };
    }

    return parseAssignment(html);
}
async function parseCompleteMode(assignments) {
    const parsedAssignments = [];
    assignments.splice(15);
    for (const assignment of assignments) {
        const {teacher, submitDate, homework, description, page, attachments } = await fetchAssignment(assignment.id);
        parsedAssignments.push({
            id: assignment.id,
            date: assignment.date,
            title: assignment.title,
            subject: assignment.subject,
            teacher,
            submitDate,
            homework,
            description,
            page,
            attachments
        });
    }
    return parsedAssignments;
}
function match(html, regex) {
    return html.match(regex)?.[1]?.trim() ?? null;
}
function parseAssignments(html) {
    const regex = /<td data-title="Data">([\s\S]*?)<\/td>\s*<td data-title="Titulo">([\s\S]*?)<\/td>\s*<td data-title="Lição de casa\?">([\s\S]*?)<\/td>\s*<td data-title="Disciplina">([\s\S]*?)<\/td>[\s\S]*?href="([^"]+)"/g;
    return [...html.matchAll(regex)].map(m => ({
        id: m[5].split("/").pop(),
        date: m[1].trim(),
        title: m[2].trim(),
        subject: m[4].replace(/\d+/g, '').trim(),
    }));
}

function parseAssignment(html) {
    const homework = match(html, /<strong>Lição de casa\?:<\/strong>\s*([^<]+)/) === "Sim";

    return {
        title: match(html, /<h2>([\s\S]*?)<\/h2>/),
        teacher: formatName(match(html, /<strong>Cadastrado por:<\/strong>\s*([^[]+)/)),
        activityDate: match(html, /<strong>Data da atividade:<\/strong>\s*([^<]+)/),
        submitDate: match(html, /<strong>Data do envio:<\/strong>\s*([^<]+)/),
        homework,
        description: cleanHtmlText(match(html, /<strong[^>]*>Atividades:<\/strong>\s*([\s\S]*?)<\/p>/i)),
        page: homework && cleanHtmlText(match(html, /<strong[^>]*>Página\/Livro:<\/strong>\s*([\s\S]*?)<\/p>/i)),
        attachments: parseAttachments(html)
    };
}
function parseAttachments(html) {
    return [...html.matchAll(
        /<li>\s*<i class="fa fa-paperclip"><\/i>([\s\S]*?)<\/li>/g
    )].map(m => {
        const item = m[1];

        return {
            url: "https://web.agendaedu.com".concat(item.match(/href="([^"]+)"/)?.[1]),
            name: item.match(/>([^<]+)<\/a>/)?.[1]?.trim(),
            size: item.match(/size-image[^>]*>([^<]+)/)?.[1]?.trim()
        };
    });
}
function formatName(name) {
    const lowerWords = new Set([
        "da", "de", "do", "das", "dos", "e"
    ]);

    return name
        .toLowerCase()
        .split(/\s+/)
        .map(word => {
            if (lowerWords.has(word)) {
                return word;
            }

            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}
function cleanHtmlText(text) {
    return text
        // Remove todas as tags HTML
        .replace(/<[^>]*>/g, "")
        // Converte entidades HTML comuns
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        // Remove espaços extras
        .replace(/\s+/g, " ")
        .trim();
}