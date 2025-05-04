const axios = require('axios');

module.exports = async (req, res) => {
    const { image, token } = req.body;

    if (!token || !image) {
        return res.status(400).json({ error: 'Token ou imagem não fornecidos!' });
    }

    try {
        const webhookUrl = `https://discord.com/api/webhooks/${token}`; // URL do webhook baseado no token fornecido
        await axios.post(webhookUrl, {
            content: 'Aqui está a foto do ponto turista!',
            embeds: [
                {
                    image: { url: image },
                },
            ],
        });

        res.status(200).json({ message: 'Imagem enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar para o Discord:', error);
        res.status(500).json({ error: 'Erro ao enviar para o Discord.' });
    }
};
