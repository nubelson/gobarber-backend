import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // Importar promissify para transformar uma função e callback em uma função de async await

import authConfig from '../../config/auth';

export default async (req, res, next) => {
    // Buscar o Token de autenticação
    const authHeader = req.headers.authorization;

    // Verificar existência do Token
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided.' });
    }

    // Dividir o token e pegar apenas o código JWT utilizando desestruturação
    const [, token] = authHeader.split(' ');

    try {
        // Decodificar o token para pegar o ID do usuário
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid.' });
    }
};
