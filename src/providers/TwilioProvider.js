'use strict';

const axios = require('axios');
const qs = require('querystring');

class TwilioProvider {
    constructor(accountSid, authToken) {
        this.accountSid = accountSid;
        this.authToken = authToken;
        this.baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`;
        
        // Mapeamento para vozes Twilio (Usando 'alice' que é mais estável para testes)
        this.voiceMap = {
            0: { voice: 'alice', language: 'pt-BR' },      // Ricardo -> Alice (Substituído por compatibilidade)
            1: { voice: 'alice', language: 'pt-BR' },      // Vitoria -> Alice
            2: { voice: 'alice', language: 'en-US' },      // Joey -> Alice (EN)
            3: { voice: 'alice', language: 'ru-RU' }       // Maxim -> Alice (RU)
        };
    }

    async call({ to, from, text, voice, speed, record, debugLog }) {
        try {
            const voiceConfig = this.voiceMap[voice] || this.voiceMap[0];
            
            // Função para escapar caracteres XML especiais
            const escapeXml = (unsafe) => {
                return unsafe.replace(/[<>&'"]/g, (c) => {
                    switch (c) {
                        case '<': return '&lt;';
                        case '>': return '&gt;';
                        case '&': return '&amp;';
                        case '\'': return '&apos;';
                        case '"': return '&quot;';
                    }
                });
            };

            const safeText = escapeXml(text);
            
            // Construção do TwiML (XML) sem minificação agressiva para evitar erros
            const twiml = 
`<Response>
    <Pause length="1"/>
    <Say voice="${voiceConfig.voice}" language="${voiceConfig.language}">Olá.</Say>
    <Pause length="1"/>
    <Say voice="${voiceConfig.voice}" language="${voiceConfig.language}">${safeText}</Say>
    <Pause length="1"/>
</Response>`;

            debugLog('\n🔍 [Twilio] Iniciando chamada:', true);
            debugLog('   - Para: ' + to, true);
            debugLog('   - De: ' + from, true);
            debugLog('   - Voz: ' + voiceConfig.voice, true);
            debugLog('   - TwiML: ' + twiml, true);

            const data = {
                To: to,
                From: from,
                Twiml: twiml,
                Record: record ? 'true' : 'false'
            };

            const response = await axios.post(this.baseUrl, qs.stringify(data), {
                auth: {
                    username: this.accountSid,
                    password: this.authToken
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            debugLog('✅ [Twilio] Chamada iniciada com sucesso!', true);
            debugLog('   - SID: ' + response.data.sid, true);
            debugLog('   - Status: ' + response.data.status, true);

            return {
                success: true,
                provider: 'twilio',
                messageId: response.data.sid,
                status: response.data.status,
                message: 'Chamada enfileirada via Twilio',
                number: to
            };
        } catch (error) {
            let errorMessage = error.response?.data?.message || error.message;
            const errorCode = error.response?.data?.code;

            // Tratamento amigável para erro de número não verificado (21210)
            if (errorCode === 21210) {
                errorMessage = `O número de origem (${from}) não está verificado na sua conta Twilio.
                \n👉 Solução:
                1. Acesse o console da Twilio (Verified Caller IDs).
                2. Verifique este número ou compre um número na Twilio.
                3. Configure o número verificado no arquivo .env (TWILIO_FROM) ou use a opção --de.`;
            }

            debugLog('❌ [Twilio] Erro na chamada:', true);
            debugLog('   - Detalhes: ' + errorMessage, true);
            if (error.response?.data) {
                debugLog('   - Twilio Error: ' + JSON.stringify(error.response.data, null, 2), true);
            }
            
            return {
                success: false,
                provider: 'twilio',
                error: errorMessage,
                number: to,
                status: error.response?.status,
                details: error.response?.data
            };
        }
    }
}

module.exports = TwilioProvider;
