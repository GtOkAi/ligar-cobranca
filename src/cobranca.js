'use strict';

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const ZenviaProvider = require('./providers/ZenviaProvider');
const TwilioProvider = require('./providers/TwilioProvider');

const ZENVIA_TOKEN = process.env.ZENVIA_TOKEN;
const ZENVIA_PHONE_NUMBER = process.env.ZENVIA_PHONE_NUMBER;

// Twilio Config
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_FROM;

// Função para log condicional baseado no modo debug
const debugLog = (message, debug = false) => {
    if (debug) {
        console.log(message);
    }
};

// Função para salvar token no arquivo .env
const salvarToken = (token) => {
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';

    // Verifica se o arquivo .env existe
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Remove espaços em branco e quebras de linha extras
    envContent = envContent.trim();

    // Atualiza ou adiciona o token
    if (envContent.includes('ZENVIA_TOKEN=')) {
        envContent = envContent.replace(/ZENVIA_TOKEN=.*/, `ZENVIA_TOKEN=${token}`);
    } else {
        envContent += `\nZENVIA_TOKEN=${token}`;
    }

    // Garante que o arquivo termine com uma quebra de linha
    if (!envContent.endsWith('\n')) {
        envContent += '\n';
    }

    // Salva o arquivo
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Token salvo com sucesso no arquivo .env');
    console.log('🔍 Token atual:', token);
};

// Função para formatar número brasileiro
const formatarNumero = (numero) => {
    if (!numero) return numero;
    const original = numero.toString().trim();
    
    // Remove todos os caracteres não numéricos
    let limpo = original.replace(/\D/g, '');
    
    // Se o número começa com 0, remove o 0
    if (limpo.startsWith('0')) {
        limpo = limpo.substring(1);
    }
    
    // Se o input original não tinha + e tem 10 ou 11 dígitos, assumimos que é BR e adicionamos 55
    // Se já tinha +, respeitamos o código do país fornecido
    if (!original.startsWith('+') && (limpo.length === 10 || limpo.length === 11)) {
        limpo = '55' + limpo;
    }
    
    // Adiciona o + no início
    return '+' + limpo;
};

const getProvider = (args) => {
    // Se o usuário explicitou o provider
    if (args.provider === 'twilio') {
        if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
            throw new Error('Credenciais da Twilio não encontradas (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN).');
        }
        return new TwilioProvider(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    }
    
    if (args.provider === 'zenvia') {
        const token = args.token || ZENVIA_TOKEN;
        if (!token) throw new Error('Token Zenvia não encontrado.');
        return new ZenviaProvider(token);
    }

    // Detecção automática
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && !ZENVIA_TOKEN && !args.token) {
        return new TwilioProvider(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    }

    // Default para Zenvia (para manter compatibilidade e wizard)
    const token = args.token || ZENVIA_TOKEN;
    if (!token && !TWILIO_ACCOUNT_SID) {
         // Se não tem nada configurado, provavelmente está rodando pela primeira vez ou wizard.
         // Vamos assumir Zenvia pois o wizard pede token Zenvia.
         return null; // Retorna null para indicar que falta configuração
    }
    
    // Se tiver token Zenvia ou foi passado via args
    return new ZenviaProvider(token || ZENVIA_TOKEN);
};

async function makeMultipleCalls(args) {
    const results = [];
    let currentCall = 0;
    
    // Determina a lista de números alvo
    const alvos = args.numeros && args.numeros.length > 0 ? args.numeros : [args.para];
    
    // Remove duplicatas e valores vazios
    const alvosUnicos = [...new Set(alvos)].filter(n => n);

    if (alvosUnicos.length === 0) {
        throw new Error('Nenhum número de destino especificado.');
    }

    // Inicializa o provider
    let provider;
    try {
        provider = getProvider(args);
    } catch (e) {
        // Se o usuário especificou um provedor e falhou, não devemos fazer fallback
        if (args.provider) {
            throw e;
        }

        // Se falhar ao pegar provider na detecção automática, vamos assumir Zenvia
        if (args.token || ZENVIA_TOKEN) {
             provider = new ZenviaProvider(args.token || ZENVIA_TOKEN);
        } else {
             throw e;
        }
    }

    if (!provider) {
        // Fallback final
        if (args.token) {
            provider = new ZenviaProvider(args.token);
        } else {
             throw new Error('Nenhum provedor configurado. Configure ZENVIA_TOKEN ou TWILIO credentials.');
        }
    }

    // Para cada número alvo
    for (const numero of alvosUnicos) {
        const numeroDestino = formatarNumero(numero);
        
        // Faz as chamadas repetidas para o número atual
        for (let i = 0; i < args.quantidade; i++) {
            try {
                // Prepara argumentos para o provider
                // Prioriza número de origem do argumento, depois do env var específico do provider
                let fromNumber = args.de;
                if (!fromNumber) {
                    if (provider instanceof TwilioProvider) {
                        fromNumber = TWILIO_PHONE_NUMBER;
                    } else {
                        fromNumber = ZENVIA_PHONE_NUMBER;
                    }
                }
                
                const numeroOrigem = formatarNumero(fromNumber);

                const result = await provider.call({
                    to: numeroDestino,
                    from: numeroOrigem,
                    text: args.texto,
                    voice: args.voz,
                    speed: args.velocidade,
                    record: args.gravar,
                    debugLog: (msg, debug) => debugLog(msg, args.debug)
                });
                
                results.push(result);
                currentCall++;
                if (args.onProgress) {
                    args.onProgress(currentCall);
                }
            } catch (error) {
                results.push({
                    success: false,
                    number: numeroDestino,
                    error: error.message
                });
                currentCall++;
                if (args.onProgress) {
                    args.onProgress(currentCall);
                }
            }
            // Pequeno delay entre chamadas para evitar rate limit
            if (i < args.quantidade - 1 || alvosUnicos.indexOf(numero) < alvosUnicos.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    return results;
}

const cobranca = async (args) => {
    try {
        if (args.debug) {
            console.log('Debug: Argumentos recebidos:', args);
        }

        // Se um token Zenvia foi fornecido via CLI, salva no .env (mantendo comportamento original)
        // Nota: Isso é específico da Zenvia. Twilio não tem wizard de CLI ainda.
        if (args.token && !args.provider) { // Assume Zenvia se passar token sem especificar provider
            if (/^[a-zA-Z0-9]{32}$/.test(args.token)) {
                salvarToken(args.token);
            }
        }

        return await makeMultipleCalls(args);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = cobranca;
