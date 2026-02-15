'use strict';

const axios = require('axios');

class ZenviaProvider {
    constructor(token) {
        this.token = token;
        this.baseUrl = 'https://voice-api.zenvia.com/tts';
        
        this.voiceMap = {
            0: 'br-Ricardo',
            1: 'br-Vitoria',
            2: 'en-Joey',
            3: 'rus-Maxim'
        };

        this.speedMap = {
            1: 0.5,  // Muito lento
            2: 0.75, // Lento
            3: 1,    // Normal
            4: 1.5,  // Rápido
            5: 2     // Muito rápido
        };
    }

    async call({ to, from, text, voice, speed, record, debugLog }) {
        try {
            debugLog('\n🔍 [Zenvia] Iniciando chamada:', true);
            debugLog('   - Para: ' + to, true);
            debugLog('   - De: ' + from, true);
            debugLog('   - Voz: ' + this.voiceMap[voice], true);
            debugLog('   - Velocidade: ' + this.speedMap[speed], true);
            debugLog('   - Gravar: ' + (record ? 'Sim' : 'Não'), true);

            const response = await axios.post(this.baseUrl, {
                numero_destino: to,
                mensagem: text,
                resposta_usuario: false,
                tipo_voz: this.voiceMap[voice],
                bina: from,
                gravar_audio: record,
                detecta_caixa: false,
                bina_inteligente: true,
                velocidade: this.speedMap[speed] || 1
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Token': this.token
                }
            });

            debugLog('✅ [Zenvia] Chamada iniciada com sucesso!', true);
            debugLog('   - ID: ' + response.data.dados?.id, true);

            return {
                success: true,
                provider: 'zenvia',
                messageId: response.data.dados?.id,
                status: response.data.status,
                message: response.data.mensagem,
                number: to
            };
        } catch (error) {
            let errorMessage = error.response?.data?.mensagem || error.message;

            // Tratamento amigável para erro de BINA inválido
            if (errorMessage && errorMessage.toLowerCase().includes('bina')) {
                errorMessage = `O número de origem (BINA: ${from}) não é permitido pela Zenvia.
                \n👉 Solução:
                1. O número deve estar cadastrado na sua conta Zenvia.
                2. Acesse: https://voice-app.zenvia.com (Minha Conta > Números).
                3. Configure o número válido no arquivo .env (ZENVIA_PHONE_NUMBER) ou use a opção --de.`;
            }

            debugLog('❌ [Zenvia] Erro na chamada:', true);
            debugLog('   - Detalhes: ' + errorMessage, true);
            
            return {
                success: false,
                provider: 'zenvia',
                error: errorMessage,
                number: to,
                status: error.response?.status,
                details: error.response?.data
            };
        }
    }
}

module.exports = ZenviaProvider;
