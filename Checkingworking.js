// ! le middlewar pour le controle de la disponibilité de l'appplication
// Middleware pour vérifier l'heure de la requête

const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const hourOfDay = date.getHours();
    const minuteOfDay = date.getMinutes();
    console.log(dayOfWeek);
    // Vérifier si c'est un jour ouvrable (du lundi au vendredi) et si c'est entre 9h et 17h
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 23) {
        // Si c'est pendant les heures de travail, passer au prochain middleware ou à la route suivante
        console.log(dayOfWeek);
        next();
    } else {
        // Si ce n'est pas pendant les heures de travail, renvoyer une réponse indiquant que l'accès est bloqué
        res.status(403).send('L\'application est uniquement disponible pendant les heures de travail (du lundi au vendredi, de 9h à 17h)');
    }
};

module.exports = checkWorkingHours;