import jwt from "jsonwebtoken";

/**
 * Sprawdza, czy klient jest zalogowany (nagłówek Authorization).
 * Dodaje do obiektu requesta informacje zawarte w tokenie (req.claims).
 *
 * @param {*} admin Czy klient uprawnienia administratorana są wymagane.
 */
export function authorize({ admin } = { admin: false }) {
    return (req, res, next) => {
        const header = req.headers.authorization || "";
        const [scheme, token] = header.split(/\s+/);
        if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
            res.status(401).json({ error: "not-authenticated"});
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, claims) => {
            if (err) {
                res.status(401).json({ error: "invalid-token" });
                return;
            }

            if (admin && !claims.admin) {
                res.status(403).json({ error: "access-denied" });
                return;
            }

            req.claims = claims;
            next();
        });
    }
}
